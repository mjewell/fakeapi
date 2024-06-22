import { Post } from "@/entities";
import { em } from "@/lib/api/mikro";
import { dbTest } from "@/lib/test/dbTest";
import * as PostService from "../post.fake";
import * as UserService from "../user.fake";

describe("create", () => {
  it(
    "creates a post",
    dbTest(async () => {
      const user = await UserService.$.create();
      await PostService.create({
        title: "Hello",
        body: "World",
        author: user,
      });

      const posts = await em().find(Post, {});
      expect(posts).toHaveLength(1);

      const post = posts[0];
      expect(post.title).toEqual("Hello");
      expect(post.body).toEqual("World");
    })
  );

  it(
    "allows duplicate titles",
    dbTest(async () => {
      await PostService.$.create({ title: "Hello" });

      const user = await UserService.$.create();
      await PostService.create({
        title: "Hello",
        body: "World",
        author: user,
      });
      await expect(em().flush()).resolves.not.toThrow();
    })
  );
});
