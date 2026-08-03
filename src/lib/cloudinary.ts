const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? "";
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? "";

export const isCloudinaryConfigured = Boolean(cloudName && uploadPreset);

export async function uploadToCloudinary(
  file: File,
  resourceType: "image" | "video" = "image"
): Promise<{ url: string; publicId: string }> {
  if (!isCloudinaryConfigured) {
    throw new Error("Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
  const response = await fetch(endpoint, { method: "POST", body: formData });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Cloudinary upload failed: ${err}`);
  }

  const data = await response.json();
  return { url: data.secure_url as string, publicId: data.public_id as string };
}
