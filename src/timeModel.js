import moment from "moment";

function validMoments(startMoment, endMoment) {
  return startMoment.isValid() && endMoment.isValid();
}

function validRange(startMoment, endMoment, sameIsValid) {
  if (sameIsValid) {
    return startMoment.isSameOrBefore(endMoment);
  } else {
    return startMoment.isBefore(endMoment);
  }
}

function generateTimeIncrement(minIncrementProp) {
  // Create an array of all possible times that can be selected
  const minuteIncrement = 60 / minIncrementProp;
  let timeArray = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < minuteIncrement; j++) {
      const time = {
        value: `${i}${j * minIncrementProp}`,
        HH: ("0" + i).slice(-2),
        MM: ("0" + j * minIncrementProp).slice(-2),
        hh:
          i === 0
            ? "12"
            : (i === 12 ? "12" : i > 12 ? "0" + (i - 12) : "0" + i).slice(-2),
        mm: ("0" + j * minIncrementProp).slice(-2),
        active: true,
        period: i >= 12 ? "PM" : "AM"
      };
      timeArray.push(time);
    }
  }
  return timeArray;
}

function calculateRoundedTimeValue(moment, minIncrementProp) {
  // If we receive a moment value, find nearest time increment
  const roundedTime =
    Math.round((moment.hour() * 60 + moment.minutes()) / minIncrementProp) *
    minIncrementProp;
  const rHour = Math.floor(roundedTime / 60);
  const rMin = roundedTime % 60;
  const time = {
    value: `${rHour}${rMin}`,
    HH: ("0" + rHour).slice(-2),
    MM: ("0" + rMin).slice(-2),
    hh:
      rHour === 0
        ? "12"
        : (rHour === 12
            ? "12"
            : rHour > 12 ? "0" + (rHour - 12) : "0" + rHour
          ).slice(-2),
    mm: ("0" + rMin).slice(-2),
    active: true,
    period: rHour >= 12 ? "PM" : "AM"
  };
  return time;
}

export function generateTimeObjects(props) {
  let startTimeMoment,
    endTimeMoment,
    startTimeIncrement,
    endTimeIncrement,
    startTimeValue,
    endTimeValue,
    error;

  // Check if two moment objects are valid
  if (validMoments(props.startMoment, props.endMoment) === true) {
    startTimeMoment = props.startMoment;
    endTimeMoment = props.endMoment;
  } else {
    startTimeMoment = moment().set("hour", 8);
    endTimeMoment = moment().set("hour", 10);
  }
  startTimeValue = calculateRoundedTimeValue(
    startTimeMoment,
    props.minuteIncrement
  );
  endTimeValue = calculateRoundedTimeValue(
    endTimeMoment,
    props.minuteIncrement
  );

  // Confirm if start and end times are valid ranges
  if (validRange(startTimeMoment, endTimeMoment, props.sameIsValid) === false) {
    // Throw error message
    if (props.sameIsValid === false) {
      error = "Please enter a valid time. Start and End times cannot be equal.";
    } else {
      error = "Error: The time entered was not valid";
    }
  }

  // Calculate time increments (with disabled items) **TODO**
  startTimeIncrement = generateTimeIncrement(props.minuteIncrement);
  endTimeIncrement = generateTimeIncrement(props.minuteIncrement);

  // Return times back to the select object
  return {
    startTimeIncrement,
    endTimeIncrement,
    startTimeValue,
    endTimeValue,
    error
  };
}

export function manipulateTimeObjects() {
  // Return new moment() object when time changes
  console.log("change time");
}
