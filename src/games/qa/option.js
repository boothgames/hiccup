import React, {Component} from 'react';
import {Form} from "react-bootstrap";

class Option extends Component {
    render() {
        return (
            <div>
                <Form.Check
                    name="react-tips"
                    type="radio"
                    id={`default-${'radio'}`}
                    label={this.props.option}
                    onChange={this.props.handleOptionChange}
                />
            </div>
        );
    }
}

export default Option;