import type { User, Chat } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Chat } from "@prisma/client";

export function getChat({
  id,
  userId,
}: Pick<Chat, "id"> & {
  userId: User["id"];
}) {
  return prisma.chat.findFirst({
    select: { id: true, answer: true, question: true },
    where: { id, userId },
  });
}

export function getChatListItems({ userId }: { userId: User["id"] }) {
  return prisma.chat.findMany({
    where: { userId },
    select: { id: true, question: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function apiGetChatListItems() {
  return prisma.chat.findMany({
    select: { id: true, question: true },
    orderBy: { updatedAt: "desc" },
  });
}


export function createChat({
  answer,
  question,
  userId,
}: Pick<Chat, "answer" | "question"> & {
  userId: User["id"];
}) {
  return prisma.chat.create({
    data: {
      question,
      answer,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteChat({
  id,
  userId,
}: Pick<Chat, "id"> & { userId: User["id"] }) {
  return prisma.chat.deleteMany({
    where: { id, userId },
  });
}
