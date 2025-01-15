// import { fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { AuthenticationForm } from '../AuthenticationForm';
import '@testing-library/jest-dom';
import { render } from '../../test-utils';
import { 
  mockLoginResponse,
  mockRegisterResponse,
} from '../../mockResponse';

const mocks = [
  mockLoginResponse,
  mockRegisterResponse,
];

describe('AuthenticationForm', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthenticationForm />
      </MockedProvider>
    );
  });
});

// describe('User input tests', () => {
//   test.each([
//     ['validInput1', 'validInput2', 'validInput3', 'success'],
//     ['invalidInput1', 'validInput2', 'validInput3', 'client'],
//     ['validInput1', 'invalidInput2', 'validInput3', 'client'],
//     ['validInput1', 'validInput2', 'invalidInput3', 'client'],
//     ['serverInvalidInput1', 'validInput2', 'validInput3', 'server'],
//     // ...rest of the combinations
//   ])('tests input combination %p', async (input1, input2, input3, expectedResult) => {
//     // Your test code here
//     // Use input1, input2, input3 variables in your test
//     // Check the result against expectedResult
//   });
// });





type Matrix = {[key: string]: [string, string][]};
type TestCase = string[];

const matrix: Matrix = {
  name: [['valid', 'success'], ['invalid', 'client']],
  passwordA: [['valid', 'success']],
  passwordB: [['valid', 'success'], ['invalid', 'client']],
  terms: [['checked', 'success'], ['unchecked', 'client']],
};

const additionalTestCases: TestCase[] = [
  ['serverInvalidInput1', 'valid', 'valid', 'checked', 'server'],
  // ...rest of the additional test cases
];

function generateTestCases(matrix: Matrix, additionalTestCases: TestCase[]): TestCase[] {
  const keys = Object.keys(matrix);
  const combinations: TestCase[] = [...additionalTestCases];

  function generateCombination(index: number, current: TestCase) {
    if (index === keys.length) {
      let expected = 'success';
      for (let i = 1; i < current.length; i += 2) {
        if (current[i] === 'client') {
          expected = 'client';
          break;
        } else if (current[i] === 'server') {
          expected = 'server';
        }
      }
      combinations.push([...current.filter((_, i) => i % 2 === 0), expected]);
      return;
    }

    const key = keys[index];
    const values = matrix[key];

    for (const [value, failureType] of values) {
      generateCombination(index + 1, [...current, value, failureType]);
    }
  }

  generateCombination(0, []);
  return combinations;
}

const testCases = generateTestCases(matrix, additionalTestCases);
console.log(testCases);