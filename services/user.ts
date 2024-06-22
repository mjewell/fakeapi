import { User } from "@/entities";
import { em } from "@/lib/api/mikro";

type CreateParams = {
  name: string;
};

export async function create({ name }: CreateParams) {
  const user = em().create(User, {
    name,
  });
  await em().flush();
  return user;
}
