import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface CarouselRowProps {
  titleHighlighted: string;
  titleNormal: string;
  subtitle: string;
  images: string[];
  onImageClick: (src: string) => void;
}

export default function CarouselRow({
  titleHighlighted,
  titleNormal,
  subtitle,
  images,
  onImageClick,
}: CarouselRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isHoveredRef = useRef<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  // SSR fix karne ke liye mount state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // 100ms ka chota sa delay taake DOM elements (width/height) completely load ho jayein
    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth || window.innerWidth;
      const height = 350;

      // 1. Scene setup
      const scene = new THREE.Scene();
      
      // 2. Camera setup
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 3.2;

      // 3. Renderer setup
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const geometry = new THREE.PlaneGeometry(1, 1.3);
      const gap = 1.3;
      const planes: any[] = [];
      const totalWidth = images.length * gap;

      // Texture loader manager ke sath
      const manager = new THREE.LoadingManager();
      const loader = new THREE.TextureLoader(manager);

      images.forEach((image, i) => {
        const texture = loader.load(image);

        const material = new THREE.ShaderMaterial({
          uniforms: { tex: { value: texture }, curve: { value: 0.4 } },
          vertexShader: `
            uniform float curve;
            varying vec2 vUv;
            void main() {
              vUv = uv;
              vec4 pos = modelViewMatrix * vec4(position, 1.0);
              pos.z += pow(pos.x, 2.0) * curve * 0.15; 
              gl_Position = projectionMatrix * pos;
            }
          `,
          fragmentShader: `
            uniform sampler2D tex;
            varying vec2 vUv;
            void main() { gl_FragColor = texture2D(tex, vUv); }
          `,
          transparent: true,
        });

        const plane = new THREE.Mesh(geometry, material);
        plane.position.set((i - images.length / 2) * gap, 0, 0);
        plane.userData = { imageSrc: image };
        scene.add(plane);
        planes.push(plane);
      });

      // Resize event listener with rAF throttling to avoid forced reflows
      let resizeRafId: number | null = null;
      const handleResize = () => {
        if (resizeRafId !== null) return;
        resizeRafId = requestAnimationFrame(() => {
          resizeRafId = null;
          if (!container || !renderer || !camera) return;
          const w = container.clientWidth;
          camera.aspect = w / height;
          camera.updateProjectionMatrix();
          renderer.setSize(w, height);
        });
      };
      window.addEventListener("resize", handleResize);

      // Animation loop
      const animate = () => {
        if (!isHoveredRef.current) {
          planes.forEach((p) => {
            p.position.x += 0.005; // Marquee Speed
            if (p.position.x > totalWidth / 2) {
              p.position.x -= totalWidth;
            }
          });
        }
        renderer.render(scene, camera);
        animationRef.current = requestAnimationFrame(animate);
      };

      // Sirf tabhi animation shuru hogi jab saari images pack ho kar load ho jayengi
      manager.onLoad = () => {
        animate();
      };

      // Click Handler
      const handleCanvasClick = (event: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(planes);

        if (intersects.length > 0) {
          const clickedPlane = intersects[0].object as any;
          onImageClick(clickedPlane.userData.imageSrc);
        }
      };
      renderer.domElement.addEventListener("click", handleCanvasClick);

      // Strict Cleanups to prevent black memory crashes
      (container as any)._cleanup = () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
        window.removeEventListener("resize", handleResize);
        renderer.domElement.removeEventListener("click", handleCanvasClick);
        
        planes.forEach((p) => {
          p.geometry.dispose();
          const mat: any = p.material;
          if (mat?.uniforms?.tex?.value) mat.uniforms.tex.value.dispose();
          if (mat?.dispose) mat.dispose();
          scene.remove(p);
        });

        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }, 100);

    return () => {
      clearTimeout(timer);
      const container = containerRef.current;
      if (container && (container as any)._cleanup) {
        (container as any)._cleanup();
      }
    };
  }, [images, isMounted]);

  if (!isMounted) return null;

  return (
    <div className="w-full py-6 block relative min-h-[480px]">
      {/* Headings */}
      <div className="text-center mb-4 px-4 relative z-20">
        <h3 className="text-3xl sm:text-5xl font-black font-cabinet text-white tracking-tight mb-2">
          <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-[#c1eb40] to-[#c1eb40] px-1">
            {titleHighlighted}
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neutral-500">
            {" "}{titleNormal}
          </span>
        </h3>
        <p className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto">
          {subtitle}
        </p>
      </div>

      {/* 3D Viewport — Strict single horizontal layout */}
      <div
        ref={containerRef}
        className="w-full h-[350px] cursor-pointer relative z-10 overflow-hidden block mx-auto bg-transparent"
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      />
    </div>
  );
}