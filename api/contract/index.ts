import { initContract } from "@ts-rest/core";
import { posts } from "./posts";

const c = initContract();

export const contract = c.router({
  posts,
});
