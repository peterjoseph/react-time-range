# React-Time-Range

A simple react component for selecting start and end time ranges, with validation.

If you need to adjust days and months, and not specifically time, you can pass in your own calendar components as children so that they appear beside each of the time selector drop-downs.

![alt text](https://i.imgur.com/D4BHEXy.png "React Time Range")

Installation
-----

```
npm install react-time-range
```

Dependencies
-----
- React.JS
- Moment.JS

Usage
-----

```
import TimeRange from 'react-time-range';
import moment from 'moment';

<TimeRange
	startMoment={this.state.startTime}
	endMoment={this.state.endTime}
	onChange={this.returnFunction}
/>
```

Component Props
-----

| Property | Type | Default | Description |
|:---|:---|:---|:---|
| `use24Hours` | bool | false | Select drop-downs display 12 hour or 24 hour time. |
| `startLabel` | string | "Start:" | Text label that appears before the start time select drop-down. |
| `endLabel` | string | "End:" | Text label that appears before the end time select drop-down. |
| `startMoment` | string | undefined | A moment ISO 8601 time string representing the start time. |
| `endMoment` | string | undefined | A moment ISO 8601 time string representing the end time. |
| `minuteIncrement` | Number | 30 | Defines the increments in time that should appear in the drop-down menus. Increments must be one of the following `1, 2, 5, 10, 15, 20, 30, 60` minutes. |
| `sameIsValid` | boolean | true | If both the start and end times are the same, this may or may not be considered a valid time range. |
| `className` | string | undefined | Prop for handling custom styling of the component. |
| `onClick` | function | undefined | Return function that is called when one of the time drop-down menus is clicked. |
| `onChange` | function | undefined | Return function that is called when one of the values in the time drop-down menu changes. |
| `showErrors` | boolean | true | Display an error message when the input times are considered invalid. |
| `equalTimeError` | string | "Please enter a valid time. Start and End times cannot be equal." | Error string that is rendered when both start and time values are the same, and this is considered invalid when `sameIsValid={true}`|
| `endTimeError` | string | "Please enter a valid time. End time cannot be before start time." | Error string that is rendered when the selected end time occurs before the start time.|
| `onStartTimeClick` | function | undefined | Return function that is called when the start time drop-down menu is clicked. |
| `onStartTimeChange` | function | undefined | Return function that is called when the start time drop-down value is changed. |
| `onEndTimeClick` | function | undefined | Return function that is called when the end time drop-down menu is clicked. |
| `onEndTimeChange` | function | undefined | Return function that is called when the end time drop-down value is changed. |