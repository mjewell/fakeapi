import { db, resetDb } from "~/lib/prisma";
import * as PostService from "../post.fake";

beforeEach(() => resetDb());

describe("create", () => {
  it("creates a post", async () => {
    await PostService.create({ title: "Hello", body: "World" });

    const posts = await db().post.findMany();
    expect(posts).toHaveLength(1);

    const post = posts[0];
    expect(post.title).toEqual("Hello");
    expect(post.body).toEqual("World");
  });

  it("allows duplicate titles", async () => {
    await PostService.$.create({ title: "Hello" });

    await expect(
      PostService.create({ title: "Hello", body: "World" })
    ).resolves.not.toThrow();
  });
});
