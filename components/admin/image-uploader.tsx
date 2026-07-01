"use client";

import { useState, type ChangeEvent } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import type { PostImage } from "@/types/blog";

const MIN_IMAGES = 2;
const DEFAULT_WIDTH = 1600;
const DEFAULT_HEIGHT = 1200;

export function ImageUploader({
  images,
  onChange,
}: {
  images: PostImage[];
  onChange: (images: PostImage[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    setError(null);
    const supabase = createClient();
    const uploaded: PostImage[] = [];

    for (const file of files) {
      const path = `${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(path, file);

      if (uploadError) {
        setError(uploadError.message);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-images").getPublicUrl(path);

      uploaded.push({
        url: publicUrl,
        alt: file.name.replace(/\.[^.]+$/, ""),
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
      });
    }

    onChange([...images, ...uploaded]);
    setUploading(false);
    event.target.value = "";
  }

  function updateAlt(index: number, alt: string) {
    onChange(images.map((image, i) => (i === index ? { ...image, alt } : image)));
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="block text-sm text-charcoal-700">
        Images <span className="text-charcoal-500">(minimum {MIN_IMAGES})</span>
      </label>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        disabled={uploading}
        className="mt-2 block w-full text-sm text-charcoal-700 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-900 file:px-3 file:py-1.5 file:text-sm file:text-cream-50 hover:file:bg-emerald-900/90"
      />

      {uploading && <p className="mt-2 text-sm text-charcoal-500">Uploading…</p>}
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

      <p
        className={
          images.length < MIN_IMAGES ? "mt-2 text-sm text-destructive" : "mt-2 text-sm text-charcoal-500"
        }
      >
        {images.length} of {MIN_IMAGES}+ images added
      </p>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((image, index) => (
            <div key={image.url} className="relative rounded-sm border border-charcoal-900/10 p-2">
              <div className="relative aspect-square overflow-hidden rounded-sm bg-cream-100">
                <Image src={image.url} alt={image.alt} fill sizes="200px" className="object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  aria-label={`Remove image ${index + 1}`}
                  className="absolute top-1 right-1 rounded-full bg-cream-50/90 p-1 text-charcoal-900 hover:bg-cream-50"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <Input
                value={image.alt}
                onChange={(event) => updateAlt(index, event.target.value)}
                placeholder="Alt text"
                className="mt-2"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
