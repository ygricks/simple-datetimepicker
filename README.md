# simple-datetimepicker [![Build Status](https://api.travis-ci.com/ygricks/simple-datetimepicker.svg?branch=master)](https://travis-ci.com/ygricks/simple-datetimepicker)

#### vanilla js datetimepicker [Demo](https://ygricks.github.io/simple-datetimepicker/)

---

cover input datetime with UI html for simple change date and time with click "+" / "-" or mouse wheel.

__init:__
```js
import MD from "./src/MD.js";
(function() {
    var element = document.getElementById('dtp');
    var params = {
        // params
    };
    var ob = new MD(element,params);
    ob.view();
})();
```
#### Params:

**type** - type *string*
- *datetime* - `default` show year/month/day/hour/minute blocks
- *date* - show only year/month/day blocks
- *time* - show only hour/minutes blocks


**pattern** - type *string* export value pattern `dafault 'Y-m-d H:i:s'`

| Option | Description | Example |
| --- | --- | --- |
| *Y* | A full numeric representation of a year, 4 digits | 1999 / 2003 |
| *y* | A two digit representation of a year | 99 / 03 |
| *d* | Day of the month, 2 digits with leading zeros | 01 -> 31 |
| *j* | Day of the month without leading zeros | 1 -> 31 |
| *m* | Numeric representation of a month, with leading zeros | 01 -> 12 |
| *n* | Numeric representation of a month, without leading zeros | 1 -> 12 |
| *a* | Lowercase Ante meridiem and Post meridiem | am / pm |
| *A* | Uppercase Ante meridiem and Post meridiem | AM / PM |
| *g* | 12-hour format of an hour without leading zeros | 1 -> 12 |
| *G* | 24-hour format of an hour without leading zeros | 0 -> 23 |
| *h* | 12-hour format of an hour with leading zeros | 01 -> 12 |
| *H* | 24-hour format of an hour with leading zeros | 00 -> 23 |
| *i* | Minutes with leading zeros | 00 -> 59 |
| *s* | Seconds with leading zeros | 00 -> 59 |


