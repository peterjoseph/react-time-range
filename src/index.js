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
      style,
		} = this.props;

    return (
      <div style={style}>
        React Time Range
        {this.props.children}
      </div>
    );
  }
}

TimeRange.defaultProps = {
  use24Hours: false,
  useSingleMoment: false,
  useCalendarChildren: false,
  calendarChildren: 0,
  hourIncrement: 1,
  minuteIncrement: 30,
};

TimeRange.propTypes = {
  use24Hours: PropTypes.bool,
  useSingleMoment: PropTypes.bool,
  useCalendarChildren: PropTypes.bool,
  calendarChildren: PropTypes.oneOf([0,1,2]),
  startMoment: PropTypes.object,
  endMoment: PropTypes.object,
  hourIncrement: PropTypes.oneOf([1,2,3]),
  minuteIncrement: PropTypes.oneOf([10,15,20,30,60]),
  style: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func, // This should also return the duration
  disabledTimeRanges: PropTypes.array,
  startTimeDisabledTimeRanges: PropTypes.array,
  endTimeDisabledTimeRanges: PropTypes.array,
  onStartTimeClick: PropTypes.func,
  onStartTimeChange: PropTypes.func,
  beforeStartTimeShow: PropTypes.func,
  afterStartTimeShow: PropTypes.func,
  beforeStartTimeHide: PropTypes.func,
  afterStartTimeHide: PropTypes.func,
  onEndTimeClick: PropTypes.func,
  onEndTimeChange: PropTypes.func,
  beforeEndTimeShow: PropTypes.func,
  afterEndTimeShow: PropTypes.func,
  beforeEndTimeHide: PropTypes.func,
  afterEndTimeHide: PropTypes.func,
};

export default TimeRange;