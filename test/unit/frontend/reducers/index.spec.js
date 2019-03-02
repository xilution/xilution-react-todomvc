import index from '../../../../src/frontend/reducers/index';
import auth from '../../../../src/frontend/reducers/auth';
import todos from '../../../../src/frontend/reducers/todos';
import visibilityFilter from '../../../../src/frontend/reducers/visibilityFilter';

describe('index tests', () => {
  test('it should reference reducers', () => {
    expect(index).toEqual({
      auth,
      todos,
      visibilityFilter,
    });
  });
});
