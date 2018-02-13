import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class TimeRange extends Component {

  constructor(props) {
		super(props);
  }
  
  generateTimeIncrement() { // Create an array of all possible times that can be selected
    const minuteIncrement = 60 / this.props.minuteIncrement;
    let timeArray = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < minuteIncrement; j++) {
        const time = {
          HH: ("0" + (i)).slice(-2),
          MM: ("0" + (j * this.props.minuteIncrement)).slice(-2),
          hh: (i == 0) ? "12" : (i == 12 ? "12" : (i > 12 ? ("0" + ((i) - 12)) : ("0" + (i)))).slice(-2),
          mm: ("0" + (j * this.props.minuteIncrement)).slice(-2),
          active: true,
          period: i >= 12 ? "PM" : "AM"
        }
        timeArray.push(time);
      }
    }
    return timeArray;
  }

  calculateRoundedTimeValue(mnt) { // If we receive a moment value, find nearest time increment

  }

  changeTime() { // Return new moment() object when time changes

  }

  validTimeCheck() { // Confirm if start and end times are valid ranges
    
  }

  hideTimeValues() { // Generate list of disabled values for a time range

  }
 
  render() {
		const {
      startLabel,
      endLabel,
      startMoment,
      endMoment,
      className,
      use24Hours,
    } = this.props;
    
    const sT = this.generateTimeIncrement();
    const eT = this.generateTimeIncrement();

    return (
      <div className={className}>
        {startLabel}
        <select>
          {sT.map((resp, index) => 
            <option key={index}>{use24Hours ? `${resp.HH}:${resp.MM}` : `${resp.hh}:${resp.mm} ${resp.period}`}</option>
          )}
        </select>
        {endLabel}
        <select>
          {eT.map((resp, index) => 
            <option key={index}>{use24Hours ? `${resp.HH}:${resp.MM}` : `${resp.hh}:${resp.mm} ${resp.period}`}</option>
          )}
        </select>
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
  minuteIncrement: 30,
  startLabel: "Start:",
  endLabel: "End:"
};

TimeRange.propTypes = {
  use24Hours: PropTypes.bool,
  useSingleMoment: PropTypes.bool,
  useNearestTime: PropTypes.bool, // Find the closest time if the moment() value is not at a standard increment
  useCalendarChildren: PropTypes.bool,
  calendarChildren: PropTypes.oneOf([0,1,2]),
  startLabel: PropTypes.string,
  endLabel: PropTypes.string,
  startMoment: PropTypes.object,
  endMoment: PropTypes.object,
  minuteIncrement: PropTypes.oneOf([1,5,10,15,20,30,60]),
  className: PropTypes.string,
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