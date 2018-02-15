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
        value: ("0" + i).slice(-2) + ("0" + j * minIncrementProp).slice(-2),
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
  return (
    ("0" + Math.floor(roundedTime / 60)).slice(-2) +
    ("0" + roundedTime % 60).slice(-2)
  );
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
      error = props.equalTimeError;
    } else {
      error = props.endTimeError;
    }
  }

  // Calculate time increments
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

export function manipulateTimeObject(momentObject, newTimeValue) {
  let time = momentObject;
  time.set("hour", parseInt(newTimeValue.substring(0, 2)));
  time.set("minutes", parseInt(newTimeValue.substring(2, 4)));
  time.set("seconds", 0);
  return momentObject;
}
