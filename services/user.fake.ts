export * from "./post";

import { testify } from "@/lib/test/testify";
import { faker } from "@faker-js/faker";
import * as Service from "./user";

export const $ = {
  ...Service,
  create: testify(Service.create, {
    name: () => faker.person.fullName(),
    email: () => faker.internet.email(),
  }),
};
