import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Image, FileText, Loader2 } from "lucide-react";

interface FileUploadProps {
  onUpload: (file: File) => Promise<string>; // Returns URL of uploaded file
  accept?: string;
  maxSizeMB?: number;
  placeholder?: string;
  currentUrl?: string;
  className?: string;
}

export default function FileUpload({
  onUpload,
  accept = "image/*",
  maxSizeMB = 5,
  placeholder = "Click to upload or drag and drop",
  currentUrl,
  className = "",
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large. Maximum size is ${maxSizeMB}MB`);
      return;
    }

    // Validate file type
    if (accept && !file.type.match(accept.replace("*", ".*"))) {
      setError(`Invalid file type. Accepted: ${accept}`);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      }

      // Upload file
      const url = await onUpload(file);
      setPreview(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="hidden"
      />

      {preview ? (
        <Card className="relative group">
          <CardContent className="p-4">
            <div className="relative">
              {preview.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                  <FileText className="w-12 h-12 text-muted-foreground" />
                </div>
              )}

              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={removeFile}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          className={`border-2 border-dashed cursor-pointer transition-colors hover:border-primary/50 ${
            isUploading ? "border-primary bg-primary/5" : "border-muted"
          }`}
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
        >
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              {isUploading ? (
                <>
                  <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin" />
                  <p className="text-sm text-muted-foreground">Uploading...</p>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-sm font-medium">{placeholder}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {accept.includes("image")
                        ? "PNG, JPG, GIF"
                        : "Various formats"}{" "}
                      up to {maxSizeMB}MB
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="mt-2 p-2 bg-red-100 text-red-800 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
