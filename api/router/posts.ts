import { Post } from "@/entities";
import { createHandler } from "@/lib/api/handler";
import { em } from "@/lib/api/mikro";
import * as PostService from "@/services/post";
import { createNextRoute } from "@ts-rest/next";
import { NotFound } from "http-errors";
import { contract } from "../contract";

export const posts = createNextRoute(contract.posts, {
  createPost: createHandler<typeof contract.posts.createPost>(async (args) => {
    const newPost = await PostService.create(args.body);

    return {
      status: 201,
      body: newPost,
    };
  }),
  getPost: createHandler<typeof contract.posts.getPost>(async (args) => {
    const post = await em().findOne(Post, { id: Number(args.params.id) });

    if (!post) {
      throw new NotFound();
    }

    return {
      status: 200,
      body: post,
    };
  }),
  getPosts: createHandler<typeof contract.posts.getPosts>(async () => {
    const posts = await em().findAll(Post);

    return {
      status: 200,
      body: posts,
    };
  }),
});
