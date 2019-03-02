// eslint-disable-next-line complexity
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.todo,
      ];
    case 'TOGGLE_TODO':
      return state.map(todo => (todo.id === action.id
        ? {
          ...todo,
          completed: !todo.completed,
        }
        : todo));
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    case 'FETCH_TODOS_SUCCESS':
      return action.todos;
    case 'SIGN_OUT':
      return [];
    default:
      return state;
  }
};

export default todos;
