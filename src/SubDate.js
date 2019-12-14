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
	addSeconds(s){this.setTime(this.getTime()+(m*1000));return this;},
	to_str(pattern){
		pattern = (!pattern) ? 'Y-m-d H:i:s' : pattern;
		const x = (s) => ('0'+s).slice(-2);
		var day = this.getDate(),
			month = this.getMyMount(),
			year = this.getFullYear(),
			hour = this.getHours(),
			minute = this.getMinutes(),
			second = this.getSeconds(),
			a = hour >= 12 ? 'pm' : 'am',
			A = a.toUpperCase(),
			g = (hour % 12) || 12,
			G = hour,
			h = x(g),
			H = x(hour),
			i = x(minute),
			s = x(second),
			j = day,
			d = x(day),
			n = month,
			m = x(month),
			Y = year,
			y = (''+Y).substr(2, 2);
		pattern = pattern
			.replace('g',g)
			.replace('G',G)
			.replace('h',h)
			.replace('H',H)
			.replace('i',i)
			.replace('s',s)
			.replace('j',j)
			.replace('d',d)
			.replace('n',n)
			.replace('m',m)
			.replace('y',y)
			.replace('Y',Y)
			.replace('a',a)
			.replace('A',A);
		return pattern;
	},
});
