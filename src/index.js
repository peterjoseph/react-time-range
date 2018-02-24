import React from "react";
import PropTypes from "prop-types";
import { generateTimeObjects, manipulateTimeObject } from "./timeModel";
import "./styles.css";

class TimeRange extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeModel: null
    };

    this.changeTime = this.changeTime.bind(this);
    this.componentClicked = this.componentClicked.bind(this);
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
      this.props.onStartTimeChange && this.props.onStartTimeChange({
        startTime: sValue
      });
    } else if (evt.target.id === "select-end") {
      eValue = manipulateTimeObject(eValue, evt.target.value);
      this.props.onEndTimeChange && this.props.onEndTimeChange({
        endTime: eValue
      });
    }
    // Return both time objects back
    this.props.onChange && this.props.onChange({
      startTime: sValue,
      endTime: eValue
    });
  }

  componentClicked(evt) {
    // On Click Function regardless of component
    this.props.onClick && this.props.onClick();

    // On Click specific to elements
    if (evt.target.id === "select-start") {
      this.props.onStartTimeClick && this.props.onStartTimeClick();
    } else if (evt.target.id === "select-end") {
      this.props.onEndTimeClick && this.props.onEndTimeClick();
    }
  }

  render() {
    const {
      startLabel,
      endLabel,
      showErrors,
      className,
      use24Hours,
      children
    } = this.props;
    const { timeModel } = this.state;
    const calendar = React.Children.toArray(children);

    return (
      <div id="react-time-range" className={className}>
        <div id="start-component" className="component">
          {startLabel && <span className="label">{startLabel}</span>}
          {calendar[0] && <span className="component">{calendar[0]}</span>}
          <select
            id="select-start"
            value={timeModel.startTimeValue && timeModel.startTimeValue}
            onChange={this.changeTime}
            onClick={this.componentClicked}
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
        </div>
        <div id="end-component" className="component">
          {endLabel && <span className="label">{endLabel}</span>}
          {calendar[1] && <span className="component">{calendar[1]}</span>}
          <select
            id="select-end"
            value={timeModel.endTimeValue && timeModel.endTimeValue}
            onChange={this.changeTime}
            onClick={this.componentClicked}
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
        </div>
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
  repositionTimes: false,
  equalTimeError:
    "Please enter a valid time. Start and End times cannot be equal.",
  endTimeError:
    "Please enter a valid time. End time cannot be before start time."
};

TimeRange.propTypes = {
  use24Hours: PropTypes.bool,
  startLabel: PropTypes.string,
  endLabel: PropTypes.string,
  startMoment: PropTypes.string.isRequired,
  endMoment: PropTypes.string.isRequired,
  minuteIncrement: PropTypes.oneOf([1, 2, 5, 10, 15, 20, 30, 60]),
  sameIsValid: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  showErrors: PropTypes.bool,
  equalTimeError: PropTypes.string,
  endTimeError: PropTypes.string,
  onStartTimeClick: PropTypes.func,
  onStartTimeChange: PropTypes.func,
  onEndTimeClick: PropTypes.func,
  onEndTimeChange: PropTypes.func
};

export default TimeRange;
