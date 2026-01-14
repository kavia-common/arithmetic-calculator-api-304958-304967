'use strict';

/**
 * Utility checks
 */
function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function parseTwoNumbers(body) {
  const { a, b } = body ?? {};
  if (!isFiniteNumber(a) || !isFiniteNumber(b)) {
    const err = new Error('Invalid input: provide finite numbers "a" and "b".');
    err.status = 400;
    throw err;
  }
  return { a, b };
}

function parseNumberArray(body) {
  const { numbers } = body ?? {};
  if (!Array.isArray(numbers) || numbers.length === 0) {
    const err = new Error('Invalid input: provide a non-empty "numbers" array of finite numbers.');
    err.status = 400;
    throw err;
  }
  const invalidIndex = numbers.findIndex((n) => !isFiniteNumber(n));
  if (invalidIndex !== -1) {
    const err = new Error(`Invalid input: numbers[${invalidIndex}] must be a finite number.`);
    err.status = 400;
    throw err;
  }
  return numbers;
}

class ArithmeticService {
  // PUBLIC_INTERFACE
  add(body) {
    /** Adds either two numbers (a,b) or a list of numbers (numbers[]). */
    if (body && Array.isArray(body.numbers)) {
      const numbers = parseNumberArray(body);
      return numbers.reduce((acc, n) => acc + n, 0);
    }
    const { a, b } = parseTwoNumbers(body);
    return a + b;
  }

  // PUBLIC_INTERFACE
  subtract(body) {
    /** Subtracts b from a using {a,b}. */
    const { a, b } = parseTwoNumbers(body);
    return a - b;
  }

  // PUBLIC_INTERFACE
  multiply(body) {
    /** Multiplies either two numbers (a,b) or a list of numbers (numbers[]). */
    if (body && Array.isArray(body.numbers)) {
      const numbers = parseNumberArray(body);
      return numbers.reduce((acc, n) => acc * n, 1);
    }
    const { a, b } = parseTwoNumbers(body);
    return a * b;
  }

  // PUBLIC_INTERFACE
  divide(body) {
    /** Divides a by b using {a,b}. Division by zero returns a 400 error. */
    const { a, b } = parseTwoNumbers(body);
    if (b === 0) {
      const err = new Error('Division by zero is not allowed.');
      err.status = 400;
      throw err;
    }
    return a / b;
  }
}

module.exports = new ArithmeticService();
