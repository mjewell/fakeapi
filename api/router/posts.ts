import { createNextRoute } from "@ts-rest/next";
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

    return {
      status: 200,
      body: post,
    };
  },
});
