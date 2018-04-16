import chai from 'chai';

import * as actions from '../../../../src/client/actions/index';

const expect = chai.expect;

describe('todo actions', () => {
    it('addTodo should create ADD_TODO action', () => {
        expect(actions.addTodo('Use Redux')).to.eql({
            id: 0,
            text: 'Use Redux',
            type: 'ADD_TODO'
        });
    });

    it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
        expect(actions.setVisibilityFilter('active')).to.eql({
            filter: 'active',
            type: 'SET_VISIBILITY_FILTER'
        });
    });

    it('toggleTodo should create TOGGLE_TODO action', () => {
        expect(actions.toggleTodo(1)).to.eql({
            id: 1,
            type: 'TOGGLE_TODO'
        });
    });
});
