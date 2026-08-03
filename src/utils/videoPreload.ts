// Video preloading utility for optimal performance
export const preloadVideos = (videoSources: string[]) => {
  if (typeof window === 'undefined') return;

  videoSources.forEach((src) => {
    // Create a video element for preloading
    const video = document.createElement('video');
    video.src = src;
    video.preload = 'metadata';
    video.style.display = 'none';
    document.body.appendChild(video);

    // Clean up after metadata is loaded
    video.addEventListener('loadedmetadata', () => {
      setTimeout(() => video.remove(), 100);
    });

    // Error handling
    video.addEventListener('error', () => {
      console.warn(`Failed to preload video: ${src}`);
      video.remove();
    });
  });
};

// Preload critical videos on page load
export const preloadCriticalVideos = () => {
  const criticalVideos: string[] = [
    // Add any necessary preloads here later. Currently using YouTube iframes.
  ];
  preloadVideos(criticalVideos);
};
