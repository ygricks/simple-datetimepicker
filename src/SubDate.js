/*jshint
    module: true,
    esversion: 9
*/
const ESCAPE_SYMBOL = '\\';

export default function SubDate(...args) {
	var dateInst = new Date(...args);
	Object.setPrototypeOf(dateInst, SubDate.prototype);
	return dateInst;
};

const driver = {
	_x: ($) => ('0'+$).slice(-2),
	get a(){return this.hour >= 12 ? 'pm' : 'am'},
	get A(){return this.a.toUpperCase()},
	get g(){return (this.hour % 12) || 12},
	get G(){return this.hour},
	get h(){return this._x(this.g)},
	get H(){return this._x(this.hour)},
	get i(){return this._x(this.minute)},
	get s(){return this._x(this.second)},
	get j(){return this.day},
	get d(){return this._x(this.day)},
	get n(){return this.month},
	get m(){return this._x(this.month)},
	get Y(){return this.year},
	get y(){return (''+this.Y).substr(2, 2)},
};

Object.setPrototypeOf(SubDate.prototype, Date.prototype);

Object.assign(SubDate.prototype, {
	getMyMount(){return this.getMonth()+1;},
	addYear(y){this.setYear(this.getFullYear()+y); return this;},
	addMonth(m){this.setMonth(this.getMonth()+m); return this;},
	addDays(d){this.setTime(this.getTime()+(d*86400000));return this;},
	addHours(h){this.setTime(this.getTime()+(h*3600000));return this;},
	addMinutes(m){this.setTime(this.getTime()+(m*60000));return this;},
	addSeconds(s){this.setTime(this.getTime()+(s*1000));return this;},
	to_str(pattern) {
		pattern = !pattern ? 'Y-m-d H:i:s' : pattern;
		const timeParams = {
			day: this.getDate(),
			month: this.getMonth() + 1,
			year: this.getFullYear(),
			hour: this.getHours(),
			minute: this.getMinutes(),
			second: this.getSeconds(),
		};
		const pDriver = Object.assign(driver, timeParams);
		const len = pattern.length;

		let ret = '';
		let escaped = false;
		for (let i = 0; i < len; i++) {
			const symbol = pattern[i];
			if (symbol == ESCAPE_SYMBOL) {
				if (escaped) {
					ret += ESCAPE_SYMBOL;
					escaped = false;
				} else {
					escaped = true;
				}
			} else {
				if (symbol in pDriver) {
					ret += escaped ? symbol : pDriver[symbol];
				} else {
					ret += (escaped ? ESCAPE_SYMBOL : '') + symbol
				}
				escaped = false;
			}
		}
		if (escaped) {
			ret += ESCAPE_SYMBOL;
		}

		return ret;
	},
});
