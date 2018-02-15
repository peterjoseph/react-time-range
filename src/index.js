import React from "react";
import PropTypes from "prop-types";
import { generateTimeObjects, manipulateTimeObject } from "./timeModel";

class TimeRange extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeModel: {}
    };

    this.changeTime = this.changeTime.bind(this);
  }

  componentWillMount() {
    this.buildModel(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.buildModel(nextProps);
  }

  buildModel(props) {
    // Generate timeModel and store in our component state
    const timeModel = generateTimeObjects({ ...props });
    this.setState({ timeModel });
  }

  changeTime(evt) {
    // Fetch our current start and end time values
    let sValue = this.props.startMoment;
    let eValue = this.props.endMoment;
    // Manipulate time based on value selected
    if (evt.target.id === "select-start") {
      sValue = manipulateTimeObject(sValue, evt.target.value);
    } else if (evt.target.id === "select-end") {
      eValue = manipulateTimeObject(eValue, evt.target.value);
    }
    // Return both time objects back
    this.props.onChange({
      startTime: sValue,
      endTime: eValue
    });
  }

  render() {
    const {
      startLabel,
      endLabel,
      showErrors,
      className,
      use24Hours
    } = this.props;
    const { timeModel } = this.state;

    return (
      <div className={className}>
        {startLabel}
        <select
          id="select-start"
          value={timeModel.startTimeValue && timeModel.startTimeValue}
          onChange={this.changeTime}
        >
          {timeModel.startTimeIncrement &&
            timeModel.startTimeIncrement.map((resp, index) => (
              <option key={index} value={resp.value} disabled={!resp.active}>
                {use24Hours
                  ? `${resp.HH}:${resp.MM}`
                  : `${resp.hh}:${resp.mm} ${resp.period}`}
              </option>
            ))}
        </select>
        {endLabel}
        <select
          id="select-end"
          value={timeModel.endTimeValue && timeModel.endTimeValue}
          onChange={this.changeTime}
        >
          {timeModel.endTimeIncrement &&
            timeModel.endTimeIncrement.map((resp, index) => (
              <option key={index} value={resp.value} disabled={!resp.active}>
                {use24Hours
                  ? `${resp.HH}:${resp.MM}`
                  : `${resp.hh}:${resp.mm} ${resp.period}`}
              </option>
            ))}
        </select>
        {this.props.children}
        {showErrors &&
          timeModel.error && <div className="error">{timeModel.error}</div>}
      </div>
    );
  }
}

TimeRange.defaultProps = {
  use24Hours: false,
  useCalendarChildren: false,
  sameIsValid: true,
  calendarChildren: 0,
  minuteIncrement: 30,
  startLabel: "Start:",
  endLabel: "End:",
  showErrors: true,
  equalTimeError:
    "Please enter a valid time. Start and End times cannot be equal.",
  endTimeError:
    "Please enter a valid time. End time cannot be before start time."
};

TimeRange.propTypes = {
  use24Hours: PropTypes.bool,
  useCalendarChildren: PropTypes.bool,
  calendarChildren: PropTypes.oneOf([0, 1, 2]),
  startLabel: PropTypes.string,
  endLabel: PropTypes.string,
  startMoment: PropTypes.object.isRequired,
  endMoment: PropTypes.object.isRequired,
  minuteIncrement: PropTypes.oneOf([1, 2, 5, 10, 15, 20, 30, 60]),
  sameIsValid: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func, // This should also return the duration
  disabledTimeRanges: PropTypes.array,
  showErrors: PropTypes.bool,
  equalTimeError: PropTypes.string,
  endTimeError: PropTypes.string,
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
