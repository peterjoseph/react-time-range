export function generateTimeIncrement(minIncrementProp) {
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

export function calculateRoundedTimeValue(moment, minIncrementProp) {
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

export function changeTime() {
  // Return new moment() object when time changes
  console.log("change time");
}

export function validTimeCheck() {
  // Confirm if start and end times are valid ranges
}

export function hideTimeValues() {
  // Generate list of disabled values for a time range
}
