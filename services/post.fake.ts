export * from "./post";

import { testify } from "@/lib/test/testify";
import { faker } from "@faker-js/faker";
import * as Service from "./post";
import * as UserService from "./user.fake";

export const $ = {
  ...Service,
  create: testify(Service.create, {
    title: (_, options?: { longTitle: boolean }) =>
      faker.lorem.words(options?.longTitle ? 10 : 3),
    body: () => faker.lorem.paragraph(),
    author: () => UserService.$.create(),
  }),
};
