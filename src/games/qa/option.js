import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Option = (props) => {
  const { handleOptionChange, option } = props;
  return (
    <div>
      <Form.Check
        name="react-tips"
        type="radio"
        id={`default-${'radio'}`}
        label={option}
        onChange={handleOptionChange}
      />
    </div>
  );
};

export default Option;

Option.propTypes = {
  handleOptionChange: PropTypes.func,
  option: PropTypes.string.isRequired,
};

Option.defaultProps = {
  handleOptionChange: _.noop,
};