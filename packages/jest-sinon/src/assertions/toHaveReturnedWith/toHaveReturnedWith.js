import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";
import spyMatchers from "expect/build/spyMatchers";

const printPass = () => () =>
  `${matcherHint(".not.toHaveReturnedWith", "sinon.spy", "obj")}\n\n` +
  `Expected spy to have ${printExpected("not returned obj")}, ` +
  `instead received a spy that has ${printReceived("returned obj")}`;

const printFail = () => () =>
  `${matcherHint(".toHaveReturnedWith", "sinon.spy", "obj")}\n\n` +
  `Expected spy to have ${printExpected("been returned obj")}, ` +
  `instead received a spy that has ${printReceived("not returned obj")}`;

export default (expected, obj) => {
  if (jest.isMockFunction(expected)) {
    return spyMatchers.toReturnWith(expected, obj);
  }

  return expected.returned(obj)
    ? { pass: true, message: printPass() }
    : { pass: false, message: printFail() };
};
