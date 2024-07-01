"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

interface fileUploadProps {
  value: string;
  endpoint: "serverImage" | "messageFile";
  onChange: (url?: string) => void;
}

export const FileUpload = ({ value, endpoint, onChange }: fileUploadProps) => {
  const fileType = value.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative w-20 h-20">
        <Image fill src={value} alt="Uploaded image" className="rounded-full" />
        <button
          onClick={() => onChange()}
          type="button"
          className="absolute top-0 right-0 p-1 bg-rose-500 text-white rounded-full shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].url)}
      onUploadError={(error: Error) => console.error(error)}
    />
  );
};
