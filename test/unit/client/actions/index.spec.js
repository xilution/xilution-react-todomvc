import chai from 'chai'

import * as actions from '../../../../src/client/actions/index'

const expect = chai.expect

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    expect(actions.addTodo('Use Redux')).to.eql({
      type: 'ADD_TODO',
      id: 0,
      text: 'Use Redux'
    })
  });

  it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
    expect(actions.setVisibilityFilter('active')).to.eql({
      type: 'SET_VISIBILITY_FILTER',
      filter: 'active'
    })
  });

  it('toggleTodo should create TOGGLE_TODO action', () => {
    expect(actions.toggleTodo(1)).to.eql({
      type: 'TOGGLE_TODO',
      id: 1
    })
  })
});
