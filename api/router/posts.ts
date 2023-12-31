import { createNextRoute } from "@ts-rest/next";
import { ImATeapot } from "http-errors";
import { contract } from "../contract";

export const posts = createNextRoute(contract.posts, {
  createPost: async (args) => {
    const newPost = { id: "1", title: args.body.title, body: args.body.body };

    return {
      status: 201,
      body: newPost,
    };
  },
  getPost: async (args) => {
    const post = {
      id: args.params.id,
      title: "Hello World",
      body: "Lorem ipsum",
    };

    if (Math.random() < 0.5) {
      throw new ImATeapot();
    }

    return {
      status: 200,
      body: post,
    };
  },
});
