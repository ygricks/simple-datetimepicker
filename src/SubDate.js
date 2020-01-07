/*jshint
    module: true,
    esversion: 9
*/

export default function SubDate(...args) {
	var dateInst = new Date(...args);
	Object.setPrototypeOf(dateInst, SubDate.prototype);
	return dateInst;
};

const SD_driver_proto = {
	get: function(target,name){
		return (name in this) 
			? this[name](target,this)
			: ((name in target)
				? target[name]
				: name
			)
		;
	},
	_x:($)=>('0'+$).slice(-2),
	a:($)=>$.hour >= 12 ? 'pm' : 'am',
	A:($,_)=>_.a($).toUpperCase(),
	g:($)=>($.hour % 12) || 12,
	G:($)=>$.hour,
	h:($,_)=>_._x(_.g($)),
	H:($,_)=>_._x($.hour),
	i:($,_)=>_._x($.minute),
	s:($,_)=>_._x($.second),
	j:($)=>$.day,
	d:($,_)=>_._x($.day),
	n:($)=>$.month,
	m:($,_)=>_._x($.month),
	Y:($)=>$.year,
	y:($,_)=>(''+_.Y($)).substr(2, 2),
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
	to_str(pattern){
		pattern = (!pattern) ? 'Y-m-d H:i:s' : pattern;
		const driver = Object.create(SD_driver_proto);
		const myTime = {
			day: this.getDate(),
			month: this.getMonth()+1,
			year: this.getFullYear(),
			hour: this.getHours(),
			minute: this.getMinutes(),
			second: this.getSeconds(),
		};
		let p = new Proxy(myTime,driver);

		let res = '';
		let l = pattern.length;
		for(let i=0;i<l;i++){
			res+=p[pattern[i]];
		}
		return res;
	},
});
