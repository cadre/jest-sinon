import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

const printPass = () => () =>
  `${matcherHint(".not.toBeAlwaysCalledWith", "sinon.spy", "")}\n\n` +
  `Expected spy to have ${printExpected(
    "not been called with correct arguments"
  )}, ` +
  `instead received a spy that has ${printReceived(
    "been called with correct arguments"
  )}`;

const printFail = () => () =>
  `${matcherHint(".toBeAlwaysCalledWith", "sinon.spy", "")}\n\n` +
  `Expected spy to have ${printExpected(
    "been called with correct arguments"
  )}, ` +
  `instead received a spy that has ${printReceived(
    "not been called with correct arguments"
  )}`;

export default (expected, ...rest) => {
  return expected.alwaysCalledWith(...rest)
    ? { pass: true, message: printPass() }
    : { pass: false, message: printFail() };
};
