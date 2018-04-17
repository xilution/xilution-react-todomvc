import * as actions from '../../../../src/client/actions/index';

describe('todo actions', () => {
    test('addTodo should create ADD_TODO action', () => {
        expect(actions.addTodo('Use Redux')).toEqual({
            id: 0,
            text: 'Use Redux',
            type: 'ADD_TODO'
        });
    });

    test('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
        expect(actions.setVisibilityFilter('active')).toEqual({
            filter: 'active',
            type: 'SET_VISIBILITY_FILTER'
        });
    });

    test('toggleTodo should create TOGGLE_TODO action', () => {
        expect(actions.toggleTodo(1)).toEqual({
            id: 1,
            type: 'TOGGLE_TODO'
        });
    });
});
