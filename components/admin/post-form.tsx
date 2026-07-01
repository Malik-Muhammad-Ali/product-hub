"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/image-uploader";
import type { BlogPost, PostImage } from "@/types/blog";

interface PostFormValues {
  title: string;
  description: string;
  externalLink: string;
  price: string;
  featured: boolean;
  images: PostImage[];
}

function toFormValues(post?: BlogPost): PostFormValues {
  return {
    title: post?.title ?? "",
    description: post?.body.join("\n\n") ?? "",
    externalLink: post?.externalLink ?? "",
    price: post?.price != null ? String(post.price) : "",
    featured: post?.featured ?? false,
    images: post?.images ?? [],
  };
}

export function PostForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [values, setValues] = useState<PostFormValues>(() => toFormValues(post));
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setErrors([]);

    const payload = {
      title: values.title,
      description: values.description,
      externalLink: values.externalLink,
      price: values.price.trim() === "" ? null : Number(values.price),
      featured: values.featured,
      images: values.images,
    };

    const response = await fetch(post ? `/api/blogs/${post.id}` : "/api/blogs", {
      method: post ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      setErrors(result.errors ?? ["Something went wrong."]);
      setSubmitting(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm text-charcoal-700">
          Title
        </label>
        <Input
          id="title"
          required
          value={values.title}
          onChange={(event) => setValues((v) => ({ ...v, title: event.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm text-charcoal-700">
          Description
        </label>
        <Textarea
          id="description"
          required
          rows={10}
          value={values.description}
          onChange={(event) => setValues((v) => ({ ...v, description: event.target.value }))}
          placeholder="Separate paragraphs with a blank line."
        />
      </div>

      <div>
        <label htmlFor="externalLink" className="mb-1.5 block text-sm text-charcoal-700">
          Link
        </label>
        <Input
          id="externalLink"
          type="url"
          required
          value={values.externalLink}
          onChange={(event) => setValues((v) => ({ ...v, externalLink: event.target.value }))}
          placeholder="https://example.com/product"
        />
      </div>

      <div>
        <label htmlFor="price" className="mb-1.5 block text-sm text-charcoal-700">
          Price <span className="text-charcoal-500">(optional)</span>
        </label>
        <Input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={values.price}
          onChange={(event) => setValues((v) => ({ ...v, price: event.target.value }))}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-charcoal-700">
        <Checkbox
          checked={values.featured}
          onCheckedChange={(checked) =>
            setValues((v) => ({ ...v, featured: checked === true }))
          }
        />
        Feature on the home page
      </label>

      <ImageUploader
        images={values.images}
        onChange={(images) => setValues((v) => ({ ...v, images }))}
      />

      {errors.length > 0 && (
        <ul className="list-inside list-disc text-sm text-destructive">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full justify-center bg-emerald-900 text-cream-50 hover:bg-emerald-900/90"
      >
        {submitting ? "Saving…" : post ? "Save changes" : "Create post"}
      </Button>
    </form>
  );
}
