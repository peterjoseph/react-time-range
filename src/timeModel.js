import moment from "moment";

function validMoments(startMoment, endMoment) {
  return startMoment.isValid() && endMoment.isValid();
}

function validRange(startMoment, endMoment, sameIsValid) {
  if (startMoment.isSame(endMoment)) {
    if (!sameIsValid) {
      return "equal";
    } else {
      return null;
    }
  }
  return startMoment.isBefore(endMoment) ? "lesser" : "greater";
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

  let startMomentObject = moment(props.startMoment);
  let endMomentObject = moment(props.endMoment);

  // Check if two moment objects are valid
  if (validMoments(startMomentObject, endMomentObject)) {
    startTimeMoment = startMomentObject.set("seconds", 0);
    endTimeMoment = endMomentObject.set("seconds", 0);
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

  // Set our moment objects hours and minutes to the rounded time value
  startMomentObject.set("hour", parseInt(startTimeValue.substring(0, 2)));
  startMomentObject.set("minutes", parseInt(startTimeValue.substring(2, 4)));
  startMomentObject.set("seconds", 0);
  endMomentObject.set("hour", parseInt(endTimeValue.substring(0, 2)));
  endMomentObject.set("minutes", parseInt(endTimeValue.substring(2, 4)));
  endMomentObject.set("seconds", 0);

  // Confirm if start and end times are valid ranges
  const validity = validRange(
    startTimeMoment,
    endTimeMoment,
    props.sameIsValid
  );
  if (!props.sameIsValid) {
    if (validity === "equal") {
      error = props.equalTimeError;
    } else if (validity === "greater") {
      error = props.endTimeError;
    } else {
      error = null;
    }
  } else if (validity === "greater") {
    error = props.endTimeError;
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
  let time = moment(momentObject);
  time.set("hour", parseInt(newTimeValue.substring(0, 2)));
  time.set("minutes", parseInt(newTimeValue.substring(2, 4)));
  time.set("seconds", 0);
  return time.toISOString();
}
