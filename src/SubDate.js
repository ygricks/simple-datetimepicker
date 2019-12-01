
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
	to_str(){
		function d(s){return ('0'+s).slice(-2);};
		return `${this.getFullYear()}-${d(this.getMyMount())}-${d(this.getDate())} ${d(this.getHours())}:${d(this.getMinutes())}`;
	},
});
