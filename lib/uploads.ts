import crypto from "crypto";
import path from "path";
import { promises as fs } from "fs";
import { put } from "@vercel/blob";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_BYTES = 8 * 1024 * 1024;

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
  "image/heic": ".heic",
  "image/heif": ".heif"
};

function isAllowedExtension(ext: string) {
  const e = ext.toLowerCase();
  return (
    e === ".jpg" ||
    e === ".jpeg" ||
    e === ".jfif" ||
    e === ".png" ||
    e === ".webp" ||
    e === ".gif" ||
    e === ".avif" ||
    e === ".heic" ||
    e === ".heif"
  );
}

export async function saveImageUpload(file: File): Promise<string> {
  if (!file || typeof file.arrayBuffer !== "function") {
    throw new Error("Invalid file.");
  }

  if (file.size > MAX_BYTES) {
    throw new Error("Image is too large.");
  }

  const mime = (file.type ?? "").toLowerCase();
  const originalName = typeof file.name === "string" ? file.name : "";
  const extFromName = path.extname(originalName).toLowerCase();
  const extFromMime = MIME_TO_EXT[mime] ?? "";
  const ext = isAllowedExtension(extFromName) ? extFromName : extFromMime;

  const isImageMime = mime.startsWith("image/") || mime === "application/octet-stream" || !mime;
  if (!isImageMime || !ext || !isAllowedExtension(ext)) {
    throw new Error("Unsupported image type.");
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const filename = `${crypto.randomUUID()}${ext.toLowerCase()}`;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const isVercel = process.env.VERCEL === "1";
  if (token) {
    const blob = await put(`portfolio/${filename}`, buf, {
      access: "public",
      contentType: mime && mime !== "application/octet-stream" ? mime : "image/jpeg",
      token
    });
    return blob.url;
  }

  if (isVercel) {
    throw new Error("BLOB_READ_WRITE_TOKEN is missing in runtime environment.");
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const abs = path.join(UPLOAD_DIR, filename);
  await fs.writeFile(abs, buf);

  return `/uploads/${filename}`;
}
