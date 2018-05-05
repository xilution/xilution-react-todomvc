import todos from '../../../../src/frontend/reducers/todos';

describe('todos reducer', () => {
    test('should handle initial state', () => {
        expect(
            todos(undefined, {})
        ).toEqual([]);
    });

    test('should handle ADD_TODO', () => {
        expect(
            todos([], {
                todo: {
                    text: 'Run the tests'
                },
                type: 'ADD_TODO'
            })
        ).toEqual([
            {
                text: 'Run the tests'
            }
        ]);

        expect(
            todos([
                {
                    text: 'Run the tests'
                }
            ], {
                todo: {
                    text: 'Use Redux'
                },
                type: 'ADD_TODO'
            })
        ).toEqual([
            {
                text: 'Run the tests'
            }, {
                text: 'Use Redux'
            }
        ]);

        expect(
            todos([
                {
                    text: 'Run the tests'
                }, {
                    text: 'Use Redux'
                }
            ], {
                todo: {
                    text: 'Fix the tests'
                },
                type: 'ADD_TODO'
            })
        ).toEqual([
            {
                text: 'Run the tests'
            }, {
                text: 'Use Redux'
            }, {
                text: 'Fix the tests'
            }
        ]);
    });

    test('should handle TOGGLE_TODO', () => {
        expect(
            todos([
                {
                    completed: false,
                    id: 1,
                    text: 'Run the tests'
                }, {
                    completed: false,
                    id: 0,
                    text: 'Use Redux'
                }
            ], {
                id: 1,
                type: 'TOGGLE_TODO'
            })
        ).toEqual([
            {
                completed: true,
                id: 1,
                text: 'Run the tests'
            }, {
                completed: false,
                id: 0,
                text: 'Use Redux'
            }
        ]);
    });
});
