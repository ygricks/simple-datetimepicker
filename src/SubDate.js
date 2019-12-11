/*jshint
    module: true,
    esversion: 9
*/

export default function SubDate(...args) {
	var dateInst = new Date(...args);
	Object.setPrototypeOf(dateInst, SubDate.prototype);
	return dateInst;
};

Object.setPrototypeOf(SubDate.prototype, Date.prototype);

Object.assign(SubDate.prototype, {
	getMyMount(){return this.getMonth()+1;},
	addYear(y){this.setYear(this.getFullYear()+y); return this;},
	addMonth(m){this.setMonth(this.getMonth()+m); return this;},
	addDays(d){this.setTime(this.getTime()+(d*86400000));return this;},
	addHours(h){this.setTime(this.getTime()+(h*3600000));return this;},
	addMinutes(m){this.setTime(this.getTime()+(m*60000));return this;},
	to_str(pattern){
		pattern = (!pattern) ? 'yyyy-MM-dd HH:mm' : pattern;
		const d = (s) => ('0'+s).slice(-2);
		var day = this.getDate(),
			month = this.getMonth(),
			year = this.getFullYear(),
			hour = this.getHours(),
			minute = this.getMinutes(),
			second = this.getSeconds(),
			h = hour % 12,
			hh = d(h),
			HH = d(hour),
			mm = d(minute),
			ss = d(second),
			dd = d(day),
			M = month + 1,
			MM = d(M),
			yyyy = year,
			yy = parseInt((''+yyyy).substr(2, 2));
		pattern = pattern
			.replace('h',h)
			.replace('hh',hh)
			.replace('HH',HH)
			.replace('mm',mm)
			.replace('ss',ss)
			.replace('dd',dd)
			.replace('MM',MM)
			.replace('M',M)
			.replace('yyyy',yyyy)
			.replace('yy',yy);
		return pattern;
	},
});
