import crypto from "crypto";
import path from "path";
import { promises as fs } from "fs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_BYTES = 8 * 1024 * 1024;

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
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

  if (!file.type || !file.type.startsWith("image/")) {
    throw new Error("Only image uploads are allowed.");
  }

  if (file.size > MAX_BYTES) {
    throw new Error("Image is too large.");
  }

  const originalName = typeof file.name === "string" ? file.name : "";
  const extFromName = path.extname(originalName).toLowerCase();
  const extFromMime = MIME_TO_EXT[file.type.toLowerCase()] ?? "";
  const ext = isAllowedExtension(extFromName) ? extFromName : extFromMime;

  if (!ext || !isAllowedExtension(ext)) {
    throw new Error("Unsupported image type.");
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const filename = `${crypto.randomUUID()}${ext.toLowerCase()}`;
  const abs = path.join(UPLOAD_DIR, filename);

  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(abs, buf);

  return `/uploads/${filename}`;
}
