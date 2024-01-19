import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
const prisma = new PrismaClient();

// using sync methods for simplicity
interface SeedTermData {
  id: string;
  data: {
    x: number;
    y: number;
  }[];
}

async function main() {
  const data: SeedTermData[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data.json'), { encoding: 'utf-8' }),
  );
  await prisma.dataPoint.deleteMany();
  await prisma.term.deleteMany();
  for (const termData of data) {
    await prisma.$transaction(async (tx) => {
      const term = await tx.term.create({
        data: {
          name: termData.id,
        },
      });
      await tx.dataPoint.createMany({
        data: termData.data.map((item) => ({ ...item, termId: term.id })),
      });
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
