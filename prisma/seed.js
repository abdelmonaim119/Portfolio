import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error("Missing ADMIN_USERNAME or ADMIN_PASSWORD in environment.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admins = await prisma.admin.findMany({ orderBy: { id: "asc" } });
  if (admins.length === 0) {
    await prisma.admin.create({
      data: { username, passwordHash }
    });
    return;
  }

  const primary = admins[0];

  await prisma.admin.update({
    where: { id: primary.id },
    data: { username, passwordHash }
  });

  if (admins.length > 1) {
    await prisma.admin.deleteMany({ where: { id: { not: primary.id } } });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });

