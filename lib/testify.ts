import { isFunction, isPlainObject } from "lodash";
import { DeepPartial } from "utility-types";

export const required = Symbol("__required__");

const mergeable = Symbol("__mergeable__");

export function merge<T>(obj: T) {
  return {
    ...obj,
    [mergeable]: true,
  };
}

type Params<P, Op> = ParamsObject<P, Op> | ParamsFunc<P, Op> | typeof required;

type ParamsObject<P, Op> = {
  [K in keyof P]?: Params<P[K], Op>;
};

type ParamsFunc<P, Op> = (
  overrides: DeepPartial<P> | undefined,
  options: Op | undefined
) =>
  | ParamsObject<P, Op>
  | Promise<ParamsObject<P, Op>>
  // another layer, does nothing but fixes errors due to
  // https://github.com/microsoft/TypeScript/issues/27711
  | Promise<Promise<ParamsObject<P, Op>>>;

async function evaluate<T, A extends unknown[]>(
  valueOrFunction: T | ((...args: A) => T),
  ...args: A
) {
  return isFunction(valueOrFunction)
    ? await (valueOrFunction as (...args: A) => T)(...args)
    : valueOrFunction;
}

async function evaluateAttrs(
  defaultParamsOrFunc: any,
  overrides: any,
  options: any,
  path: string[]
) {
  const defaultParams = await evaluate(defaultParamsOrFunc, overrides, options);

  if (!isPlainObject(defaultParams)) {
    return defaultParams;
  }

  const attrs: any = {};

  const keys = Object.keys({ ...defaultParams, ...overrides });

  for (const key of keys) {
    const keyPath = [...path, key];
    const defaultParam = defaultParams[key];

    if (overrides && key in overrides) {
      const override = overrides[key];

      if (isPlainObject(override) && defaultParam[mergeable]) {
        attrs[key] = await evaluateAttrs(
          defaultParam,
          override,
          options,
          keyPath
        );
      } else {
        attrs[key] = override;
      }
    } else {
      if (defaultParam === required) {
        throw new Error(`parameter '${keyPath.join(".")}' is required`);
      }

      attrs[key] = await evaluateAttrs(
        defaultParam,
        undefined,
        options,
        keyPath
      );
    }
  }

  return attrs;
}

export function testify<P, O, M>(
  func: (params: P) => M,
  defaultParams: Params<P, O>
) {
  return async (overrides?: DeepPartial<P>, options?: O) => {
    const attrs = await evaluateAttrs(defaultParams, overrides, options, [
      `${func.name}`,
    ]);
    return func(attrs);
  };
}
