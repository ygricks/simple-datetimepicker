var SubDate = function () {
	var dateInst = new Date(...arguments);
	Object.setPrototypeOf(dateInst, SubDate.prototype);
	return dateInst;
};
Object.setPrototypeOf(SubDate.prototype, Date.prototype);
SubDate.prototype.getMyMount = function(){return this.getMonth()+1;};
SubDate.prototype.addYear = function(y){this.setYear(this.getFullYear()+y); return this;};
SubDate.prototype.addMonth = function(m){this.setMonth(this.getMonth()+m); return this;};
SubDate.prototype.addDays = function(d){this.setTime(this.getTime()+(d*86400000));return this;};
SubDate.prototype.addHours = function(h){this.setTime(this.getTime()+(h*3600000));return this;};
SubDate.prototype.addMinutes = function(m){this.setTime(this.getTime()+(m*60000));return this;};


var MD = function(element, time){
	const self = this;
	return self.init(element, time);
};
MD.prototype.init = function(element, time){
	console.log('init')
	const self = this;
	self.element = element;
	self.ts = new SubDate(time);
	self.list_attr = {
		y: {get:'getFullYear',set:'addYear'},
		m: {get:'getMyMount',set:'addMonth'},
		d: {get:'getDate',set:'addDays'},
		h: {get:'getHours',set:'addHours'},
		i: {get:'getMinutes',set:'addMinutes'}
	};
	self.list_dom = {};
	Object.keys(self.list_attr).forEach(function(v){
		self.list_dom[v] = self.element.querySelectorAll('.e[data-id="'+v+'"] .val')[0];
	});
	self.eventsListner();
	self.createDOM();
	return self;
};
MD.prototype.eventsListner = function(){
	const self = this;
	self.element.addEventListener('click', function(event){
		var t = event.target;
		var p = function(e){return event.target.parentNode.getAttribute('data-id');};
		if (t.classList.contains('up')) {
			self.update(p(event),1);
		}else if(t.classList.contains('down')){
			self.update(p(event),-1);
		} return;
	}, false);
	function scrolled(e) {
		var p = e.target.parentNode;
		if(p.classList.contains('e')) {
			e.preventDefault();
			var d = e.wheelDelta>0?1:-1;
			self.update(p.getAttribute('data-id'),d);
		}
	};
	self.element.addEventListener('mousewheel', scrolled, { passive: false });
	self.element.addEventListener('DOMMouseScroll', scrolled, { passive: false });
	return self;
};
MD.prototype.highlight = function(element){
	element.classList.remove("highlight");
	void element.offsetWidth;
	element.classList.add("highlight");
}
MD.prototype.update = function(attr, indice){
	const self = this;
	self.ts[self.list_attr[attr].set](indice);
	return self.view();
};
MD.prototype.view = function(){
	const self = this;
	Object.keys(self.list_attr).forEach(function(v){
		self.list_dom[v].innerHTML = self.ts[self.list_attr[v]['get']]();
	})
	return this;
};
MD.prototype.createDOM = function(){
	var self = this;
	var yjsdate = document.createElement("div");
	yjsdate.className = "yjsdate";
	Object.keys(self.list_attr).forEach(function(v){
		var e = document.createElement("div");
		e.className = "e";
		var u = document.createElement("div");
		u.className = "up";
		u.innerHTML = "+";
		e.appendChild(u);
		var v = document.createElement("div");
		v.className = "val";
		e.appendChild(v);
		var d = document.createElement("div");
		d.className = "down";
		d.innerHTML = "-";
		e.appendChild(d);
		yjsdate.appendChild(e);
	});
	console.log('ms',yjsdate);
	document.body.appendChild(yjsdate);
};

(function() {
	var element = document.getElementById('dtp');
	var ob = new MD(element,'2017-03-28 17:13:50');
	ob.view();
})();