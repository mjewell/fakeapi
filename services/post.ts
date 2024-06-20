import { Post } from "@/entities";
import { em } from "@/lib/api/mikro";

type CreateParams = {
  title: string;
  body: string | null;
};

export async function create({ title, body }: CreateParams) {
  return em().create(Post, {
    title: title,
    body: body,
  });
}
