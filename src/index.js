import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class TimeRange extends Component {

  constructor(props) {
		super(props);
	}
 
  render() {
		const {
      startMoment,
      endMoment,
      use24Hours,
		} = this.props;

    return (
      <div />
    );
  }
}

TimeRange.defaultProps = {
  use24Hours: false
};

TimeRange.propTypes = {
  startMoment: PropTypes.object,
  endMoment: PropTypes.object,
  use24Hours: PropTypes.bool,
  hourIncrement: PropTypes.number,
  minuteIncrement: PropTypes.number,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};

export default TimeRange;