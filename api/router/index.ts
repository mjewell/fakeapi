import { createNextRoute } from "@ts-rest/next";
import { contract } from "../contract";
import { posts } from "./posts";

export const router = createNextRoute(contract, {
  posts,
});
