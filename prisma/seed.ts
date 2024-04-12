import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "demo@agatha.ai";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("demouser", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.chat.create({
    data: {
      question: "Philippines GDP by 2030",
      answer: "Officia aliqua sunt aliqua in deserunt est eiusmod deserunt nisi non. Fugiat ex mollit et. Sunt officia velit ad veniam dolor occaecat velit proident do exercitation occaecat exercitation duis minim. Cupidatat ipsum enim do enim do pariatur velit nostrud occaecat mollit.\nDo consequat incididunt cupidatat pariatur qui elit laborum qui. Nostrud eu reprehenderit nisi laboris. Aliquip irure dolore velit reprehenderit occaecat id sit esse non do nisi exercitation aliquip. Nisi minim dolore anim voluptate incididunt eu voluptate duis. Dolore velit minim pariatur minim mollit. Fugiat non culpa incididunt ipsum nulla occaecat sint fugiat nisi occaecat.",
      userId: user.id,
    },
  });

  await prisma.chat.create({
    data: {
      question: "Post AGI economics",
      answer: "Dolore in consequat dolor officia. Deserunt deserunt cupidatat cupidatat do dolor do dolore consequat. Adipisicing mollit aliqua esse irure commodo duis et Lorem. Consectetur adipisicing ea ut sunt laborum cillum incididunt et. Aliqua non ad eu nisi officia dolore enim duis.\nAnim irure culpa ad ea amet et. Voluptate tempor cupidatat irure cillum voluptate exercitation anim. Laborum duis laboris anim do in non Lorem consectetur eu pariatur. Irure proident nulla amet consequat fugiat. Anim id exercitation ut quis ad elit.\nVeniam id ea non ullamco fugiat ullamco cillum qui magna laborum veniam fugiat. Lorem commodo cupidatat nisi veniam consectetur adipisicing ut ut consequat. Ad sit eiusmod elit nostrud non. Aliquip anim pariatur veniam excepteur consequat id est duis deserunt pariatur sunt Lorem id ullamco. Culpa deserunt dolore mollit irure pariatur exercitation exercitation amet minim ea deserunt.",
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
