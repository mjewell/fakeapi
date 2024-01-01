import { createNextRoute } from "@ts-rest/next";
import { NotFound } from "http-errors";
import { createHandler } from "~/lib/api/handlers";
import { db } from "~/lib/prisma";
import * as PostService from "~/services/post";
import { contract } from "../contract";

export const posts = createNextRoute(contract.posts, {
  createPost: createHandler(async (args) => {
    const newPost = await PostService.create(args.body);

    return {
      status: 201,
      body: newPost,
    };
  }),
  getPost: createHandler(async (args) => {
    const post = await db().post.findUnique({
      where: {
        id: Number(args.params.id),
      },
    });

    if (!post) {
      throw new NotFound();
    }

    return {
      status: 200,
      body: post,
    };
  }),
});
