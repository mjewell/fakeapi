import { User } from "@/entities";
import { em } from "@/lib/api/mikro";

type CreateParams = {
  name: string;
  email: string;
};

export async function create({ name, email }: CreateParams) {
  const user = em().create(User, {
    name,
    email,
  });
  await em().flush();
  return user;
}
