/* eslint-disable react/no-set-state,react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import {Form, FormGroup, InputGroup, FormControl, Button} from 'react-bootstrap';

import {createTodo} from '../actions';

const defaultState = {
    input: ''
};

class AddTodo extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = defaultState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (
            !this.state.input.trim()
        ) {
            return;
        }

        this.props.dispatch(createTodo(this.state.input));

        this.setState(defaultState);
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="input">
                        <InputGroup>
                            <FormControl
                                name="input"
                                onChange={this.handleChange}
                                type="text"
                                value={this.state.input}
                            />
                            <InputGroup.Button>
                                <Button type="submit">{'Add Todo'}</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default connect()(AddTodo);
/* eslint-enable react/no-set-state,react/prop-types */
