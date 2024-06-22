import { Post } from "@/entities";
import { em } from "@/lib/api/mikro";

type CreateParams = {
  title: string;
  body: string | null;
  author: {
    id: number;
  };
};

export async function create({ title, body, author }: CreateParams) {
  const post = em().create(Post, {
    title: title,
    body: body,
    author: author.id,
  });
  await em().flush();
  return post;
}
