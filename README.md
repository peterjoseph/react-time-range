# React-Time-Range

A simple react component for selecting start and end time ranges.

When searching for a time range component, I could only find individual time pickers, and not components that handle selecting start and end times. This component is a basic implementation of a selector.

If you need to adjust days and months, and not specifically time, you can pass in your own calendar components as children so that they appear beside each of the time selector drop-downs.

![alt text](https://i.imgur.com/D4BHEXy.png "React Time Range")

Installation
-----

This component is currently in active development and not available on npm. Once the first stable release is ready, I will add the package to npm and update this readme.

Alternatively, you can download the files from GitHub and load them into your project using
```
npm link react-time-range
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