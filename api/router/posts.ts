import { Post } from "@/entities";
import { createHandler } from "@/lib/api/handler";
import { em } from "@/lib/api/mikro";
import * as PostService from "@/services/post";
import { createNextRoute } from "@ts-rest/next";
import { NotFound } from "http-errors";
import { contract } from "../contract";

// TODO: createHandler loses type info on the latest ts-rest
export const posts = createNextRoute(contract.posts, {
  createPost: createHandler(async (args) => {
    const newPost = await PostService.create(args.body);

    return {
      status: 201 as const,
      body: newPost,
    };
  }),
  getPost: createHandler(async (args) => {
    const post = await em().findOne(Post, { id: Number(args.params.id) });

    if (!post) {
      throw new NotFound();
    }

    return {
      status: 200 as const,
      body: post,
    };
  }),
  getPosts: createHandler(async () => {
    const posts = await em().findAll(Post);

    return {
      status: 200 as const,
      body: posts,
    };
  }),
});
