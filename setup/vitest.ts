import { getORM } from "@/lib/api/mikro";

afterAll(async () => {
  const orm = await getORM();
  await orm.close();
});
