import { Post } from "@/entities";
import { em, mikro } from "@/lib/api/mikro";
import * as PostService from "../post.fake";

describe("create", () => {
  it(
    "creates a post",
    mikro(async () => {
      await PostService.create({ title: "Hello", body: "World" });
      await em().flush();

      const posts = await em().find(Post, {});
      expect(posts).toHaveLength(1);

      const post = posts[0];
      expect(post.title).toEqual("Hello");
      expect(post.body).toEqual("World");
    })
  );

  it(
    "allows duplicate titles",
    mikro(async () => {
      await PostService.$.create({ title: "Hello" });
      await em().flush();

      await PostService.create({ title: "Hello", body: "World" });
      await expect(em().flush()).resolves.not.toThrow();
    })
  );
});
