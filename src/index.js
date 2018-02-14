import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  generateTimeIncrement,
  calculateRoundedTimeValue,
  changeTime,
  validTimeCheck,
  hideTimeValues
} from "./helpers";

class TimeRange extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      startLabel,
      endLabel,
      startMoment,
      endMoment,
      className,
      use24Hours
    } = this.props;

    // Generate time increments
    const startTimeIncrement = generateTimeIncrement(
      this.props.minuteIncrement
    );
    const endTimeIncrement = generateTimeIncrement(this.props.minuteIncrement);

    // Convert our moment objects into a compatible object
    const startTimeValue = calculateRoundedTimeValue(
      startMoment,
      this.props.minuteIncrement
    );
    const endTimeValue = calculateRoundedTimeValue(
      endMoment,
      this.props.minuteIncrement
    );

    // Build time object from external moment props
    // Validate start and end moments
    // Create time increments with disabled options

    return (
      <div className={className}>
        {startLabel}
        <select value={startTimeValue.value} onChange={this.changeTime}>
          {startTimeIncrement.map((resp, index) => (
            <option key={index} value={resp.value} disabled={!resp.active}>
              {use24Hours
                ? `${resp.HH}:${resp.MM}`
                : `${resp.hh}:${resp.mm} ${resp.period}`}
            </option>
          ))}
        </select>
        {endLabel}
        <select value={endTimeValue.value} onChange={this.changeTime}>
          {endTimeIncrement.map((resp, index) => (
            <option key={index} value={resp.value} disabled={!resp.active}>
              {use24Hours
                ? `${resp.HH}:${resp.MM}`
                : `${resp.hh}:${resp.mm} ${resp.period}`}
            </option>
          ))}
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
  calendarChildren: PropTypes.oneOf([0, 1, 2]),
  startLabel: PropTypes.string,
  endLabel: PropTypes.string,
  startMoment: PropTypes.object,
  endMoment: PropTypes.object,
  minuteIncrement: PropTypes.oneOf([1, 5, 10, 15, 20, 30, 60]),
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
  afterEndTimeHide: PropTypes.func
};

export default TimeRange;
