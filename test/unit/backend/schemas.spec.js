import Joi from 'joi';
import Chance from 'chance';

import {
  authenticateRequestSchema,
  postTodoRequestSchema,
  putTodoRequestSchema,
  getTodoRequestSchema,
  deleteTodoRequestSchema,
  fetchTodosRequestSchema,
} from '../../../src/backend/schemas';

const chance = new Chance();

const notObjects = [null, undefined, {}, [], '', chance.string(), chance.natural(), chance.bool()];

const buildInvalidBoolean = () => chance.pickone([null, undefined, {}, [], '', chance.string(), chance.natural()]);

const buildInvalidString = () => chance.pickone([null, undefined, {}, [], '', chance.natural(), chance.bool()]);

describe('schemas tests', () => {
  describe('when validating authenticate requests', () => {
    test('when the request is invalid, the result should include a validation error', () => {
      const actualValidationResult = Joi.validate({
        body: chance.pickone([...notObjects, {
          password: buildInvalidString(),
          username: buildInvalidString(),
        }]),
      }, authenticateRequestSchema);

      expect(actualValidationResult.error).toBeTruthy();
    });

    test('when the request is valid, the result should not include a validation error', () => {
      const actualValidationResult = Joi.validate({
        body: {
          password: chance.string(),
          username: chance.string(),
        },
      }, authenticateRequestSchema);

      expect(actualValidationResult.error).toBeFalsy();
    });
  });

  describe('when validating post todo requests', () => {
    test('when the request is invalid, the result should include a validation error', () => {
      const actualValidationResult = Joi.validate({
        body: chance.pickone([...notObjects, {
          completed: buildInvalidBoolean(),
          text: buildInvalidString(),
          userId: buildInvalidString(),
        }]),
        parameters: chance.pickone([...notObjects, {
          authorization: buildInvalidString(),
        }]),
      }, postTodoRequestSchema);

      expect(actualValidationResult.error).toBeTruthy();
    });

    test('when the request is valid, the result should not include a validation error', () => {
      const actualValidationResult = Joi.validate({
        body: {
          completed: chance.bool(),
          text: chance.string(),
          userId: chance.string(),
        },
        parameters: {
          authorization: chance.string(),
        },
      }, postTodoRequestSchema);

      expect(actualValidationResult.error).toBeFalsy();
    });
  });

  describe('when validating put todo requests', () => {
    test('when the request is invalid, the result should include a validation error', () => {
      const actualValidationResult = Joi.validate({
        body: chance.pickone([...notObjects, {
          completed: buildInvalidBoolean(),
          id: buildInvalidString(),
          text: buildInvalidString(),
          userId: buildInvalidString(),
        }]),
        parameters: chance.pickone([...notObjects, {
          authorization: buildInvalidString(),
          id: buildInvalidString(),
        }]),
      }, putTodoRequestSchema);

      expect(actualValidationResult.error).toBeTruthy();
    });

    test('when the request is valid, the result should not include a validation error', () => {
      const actualValidationResult = Joi.validate({
        body: {
          completed: chance.bool(),
          id: chance.string(),
          text: chance.string(),
          userId: chance.string(),
        },
        parameters: {
          authorization: chance.string(),
          id: chance.string(),
        },
      }, putTodoRequestSchema);

      expect(actualValidationResult.error).toBeFalsy();
    });
  });

  describe('when validating get todo requests', () => {
    test('when the request is invalid, the result should include a validation error', () => {
      const actualValidationResult = Joi.validate({
        parameters: chance.pickone([...notObjects, {
          authorization: buildInvalidString(),
          id: buildInvalidString(),
        }]),
      }, getTodoRequestSchema);

      expect(actualValidationResult.error).toBeTruthy();
    });

    test('when the request is valid, the result should not include a validation error', () => {
      const actualValidationResult = Joi.validate({
        parameters: {
          authorization: chance.string(),
          id: chance.string(),
        },
      }, getTodoRequestSchema);

      expect(actualValidationResult.error).toBeFalsy();
    });
  });

  describe('when validating delete todo requests', () => {
    test('when the request is invalid, the result should include a validation error', () => {
      const actualValidationResult = Joi.validate({
        parameters: chance.pickone([...notObjects, {
          authorization: buildInvalidString(),
          id: buildInvalidString(),
        }]),
      }, deleteTodoRequestSchema);

      expect(actualValidationResult.error).toBeTruthy();
    });

    test('when the request is valid, the result should not include a validation error', () => {
      const actualValidationResult = Joi.validate({
        parameters: {
          authorization: chance.string(),
          id: chance.string(),
        },
      }, deleteTodoRequestSchema);

      expect(actualValidationResult.error).toBeFalsy();
    });
  });

  describe('when validating fetch todos requests', () => {
    test('when the request is invalid, the result should include a validation error', () => {
      const actualValidationResult = Joi.validate({
        parameters: chance.pickone([...notObjects, {
          authorization: buildInvalidString(),
        }]),
      }, fetchTodosRequestSchema);

      expect(actualValidationResult.error).toBeTruthy();
    });

    test('when the request is valid, the result should not include a validation error', () => {
      const actualValidationResult = Joi.validate({
        parameters: {
          authorization: chance.string(),
        },
      }, fetchTodosRequestSchema);

      expect(actualValidationResult.error).toBeFalsy();
    });
  });
});
