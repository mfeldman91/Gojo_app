import { supabase } from "./supabase";

export const STORAGE_BUCKETS = {
  AVATARS: "avatars",
  COURSE_THUMBNAILS: "course-thumbnails",
  COURSE_VIDEOS: "course-videos",
  DOCUMENTS: "documents",
} as const;

export type StorageBucket =
  (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];

// Upload file to Supabase Storage
export const uploadFile = async (
  bucket: StorageBucket,
  file: File,
  path?: string,
): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName =
      path ||
      `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return { success: false, error: error.message };
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
};

// Delete file from Supabase Storage
export const deleteFile = async (
  bucket: StorageBucket,
  path: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
};

// Get public URL for a file
export const getPublicUrl = (bucket: StorageBucket, path: string): string => {
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
};

// Upload avatar image
export const uploadAvatar = async (file: File, userId: string) => {
  return uploadFile(
    STORAGE_BUCKETS.AVATARS,
    file,
    `${userId}/avatar.${file.name.split(".").pop()}`,
  );
};

// Upload course thumbnail
export const uploadCourseThumbnail = async (file: File, courseId: string) => {
  return uploadFile(
    STORAGE_BUCKETS.COURSE_THUMBNAILS,
    file,
    `${courseId}/thumbnail.${file.name.split(".").pop()}`,
  );
};

// Upload course video
export const uploadCourseVideo = async (
  file: File,
  courseId: string,
  lessonId: string,
) => {
  return uploadFile(
    STORAGE_BUCKETS.COURSE_VIDEOS,
    file,
    `${courseId}/${lessonId}/video.${file.name.split(".").pop()}`,
  );
};

// Upload document/certificate
export const uploadDocument = async (
  file: File,
  userId: string,
  type: "certificate" | "qualification",
) => {
  return uploadFile(
    STORAGE_BUCKETS.DOCUMENTS,
    file,
    `${userId}/${type}/${Date.now()}.${file.name.split(".").pop()}`,
  );
};

// Create storage buckets (run this once in setup)
export const initializeStorageBuckets = async () => {
  const buckets = Object.values(STORAGE_BUCKETS);

  for (const bucket of buckets) {
    try {
      const { error } = await supabase.storage.createBucket(bucket, {
        public: true,
        allowedMimeTypes:
          bucket === STORAGE_BUCKETS.COURSE_VIDEOS
            ? ["video/*"]
            : bucket === STORAGE_BUCKETS.DOCUMENTS
              ? ["application/pdf", "image/*"]
              : ["image/*"],
        fileSizeLimit:
          bucket === STORAGE_BUCKETS.COURSE_VIDEOS
            ? 500 * 1024 * 1024 // 500MB for videos
            : 10 * 1024 * 1024, // 10MB for images/docs
      });

      if (error && !error.message.includes("already exists")) {
        console.error(`Failed to create bucket ${bucket}:`, error);
      }
    } catch (error) {
      console.error(`Error creating bucket ${bucket}:`, error);
    }
  }
};
