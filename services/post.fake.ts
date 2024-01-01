export * from "./post";

import { faker } from "@faker-js/faker";
import { testify } from "~/lib/testify";
import * as Service from "./post";

export const $ = {
  ...Service,
  create: testify(Service.create, {
    title: (_, options?: { longTitle: boolean }) =>
      faker.lorem.words(options?.longTitle ? 10 : 3),
    body: () => faker.lorem.paragraph(),
  }),
};
