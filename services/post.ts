import { db } from "~/lib/prisma";

type CreateParams = {
  title: string;
  body: string | null;
};

export async function create({ title, body }: CreateParams) {
  return db().post.create({
    data: {
      title: title,
      body: body,
    },
  });
}
