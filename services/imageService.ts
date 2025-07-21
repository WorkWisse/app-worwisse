import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { storage } from "@/config/firebase";

export class ImageService {
  /**
   * Upload an image to Firebase Storage
   * @param file - The image file to upload
   * @param path - The storage path (e.g., 'companies/logos')
   * @param fileName - Optional custom filename
   * @returns Promise<string> - The download URL of the uploaded image
   */
  static async uploadImage(
    file: File,
    path: string,
    fileName?: string,
  ): Promise<string> {
    try {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        throw new Error("El archivo debe ser una imagen");
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        throw new Error("La imagen no puede superar los 5MB");
      }

      // Generate filename if not provided
      const timestamp = Date.now();
      const extension = file.name.split(".").pop();
      const finalFileName = fileName || `${timestamp}.${extension}`;

      // Create storage reference
      const storageRef = ref(storage, `${path}/${finalFileName}`);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file);

      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error uploading image:", error);

      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes("cors")) {
          throw new Error(
            "Error de configuración CORS. Contacta al administrador del sistema.",
          );
        }
        if (error.message.includes("permission")) {
          throw new Error(
            "No tienes permisos para subir archivos. Verifica la configuración de Firebase Storage.",
          );
        }
        if (error.message.includes("quota")) {
          throw new Error("Se ha excedido la cuota de almacenamiento.");
        }
      }

      throw new Error("Error al subir la imagen. Inténtalo de nuevo.");
    }
  }

  /**
   * Delete an image from Firebase Storage
   * @param url - The full URL of the image to delete
   */
  static async deleteImage(url: string): Promise<void> {
    try {
      // Extract the path from the URL for Firebase Storage
      const urlObj = new URL(url);
      const pathMatch = urlObj.pathname.match(/\/o\/(.+)\?/);

      if (!pathMatch) {
        throw new Error("Invalid Firebase Storage URL");
      }

      const decodedPath = decodeURIComponent(pathMatch[1]);
      const storageRef = ref(storage, decodedPath);

      await deleteObject(storageRef);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error deleting image:", error);
      throw error;
    }
  }

  /**
   * Validate image dimensions
   * @param file - The image file to validate
   * @param minWidth - Minimum width in pixels
   * @param minHeight - Minimum height in pixels
   * @returns Promise<boolean>
   */
  static validateImageDimensions(
    file: File,
    minWidth: number = 250,
    minHeight: number = 250
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        const isValid = img.width >= minWidth && img.height >= minHeight;

        if (!isValid) {
          reject(
            new Error(
              `La imagen debe tener un tamaño mínimo de ${minWidth}x${minHeight} píxeles. Tamaño actual: ${img.width}x${img.height}`
            )
          );
        } else {
          resolve(true);
        }
      };

      img.onerror = () => {
        reject(new Error("Error al cargar la imagen"));
      };

      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Resize image to fit maximum dimensions while maintaining aspect ratio
   * @param file - The image file to resize
   * @param maxWidth - Maximum width in pixels
   * @param maxHeight - Maximum height in pixels
   * @param quality - JPEG quality (0-1)
   * @returns Promise<File>
   */
  static resizeImage(
    file: File,
    maxWidth: number = 800,
    maxHeight: number = 600,
    quality: number = 0.8
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx!.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });

              resolve(resizedFile);
            } else {
              reject(new Error("Error al redimensionar la imagen"));
            }
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error("Error al cargar la imagen"));
      img.src = URL.createObjectURL(file);
    });
  }
}
