/*jshint
	module: true,
	esversion: 9
*/

import SubDate from './SubDate.js';
import extend from './Util.js';

export default function MD(input,params) {
	const self = this;
	const time = input.value;
	return self.init(input, time, params);
};

MD.SubDate = SubDate;

Object.assign(MD.prototype, {

	init(input, time, params) {
		const self = this;
		self.params = extend({}, params);
		self.input = input;
		self.ts = new SubDate(time);
		self.list_dom = {};
		self.list_attr = {
			y: {get: 'getFullYear', set: 'addYear'},
			m: {get: 'getMyMount', set: 'addMonth'},
			d: {get: 'getDate',set: 'addDays'},
			h: {get: 'getHours',set: 'addHours'},
			i: {get: 'getMinutes',set: 'addMinutes'}
		};
		if (params.type && params.type == 'date') {
			delete self.list_attr.h;
			delete self.list_attr.i;
		} else if (params.type && params.type == 'time') {
			delete self.list_attr.y;
			delete self.list_attr.m;
			delete self.list_attr.d;
		}
		self.createDOM();
		self.eventsListner();
		return self;
	},

	eventsListner() {
		const self = this;
		self.element.addEventListener('click', function(event) {
			const target = event.target;
			const parent = event.target.parentNode.getAttribute('data-id');
			if (target.classList.contains('up')) {
				self.update(parent, 1);
			} else if (target.classList.contains('down')) {
				self.update(parent, -1);
			}
			return;
		}, false);

		function scrolled(e) {
			const p = e.target.parentNode;
			if (p.classList.contains('e')) {
				const d = e.wheelDelta > 0 ? 1 : -1;
				e.preventDefault();
				self.update(p.getAttribute('data-id'), d);
			}
		};

		self.element.addEventListener('mousewheel', scrolled);
		self.element.addEventListener('DOMMouseScroll', scrolled);
		return self;
	},

	highlight(element) {
		element.classList.remove('highlight');
		void element.offsetWidth;
		element.classList.add('highlight');
	},

	update(attr, index) {
		const self = this;
		self.ts[self.list_attr[attr].set](index);
		return self.view();
	},

	view() {
		const self = this;
		Object.keys(self.list_attr).forEach((v) => {
			self.list_dom[v].innerHTML = self.ts[self.list_attr[v].get]();
		});
		self.input.value = self.ts.to_str(self.params && self.params.pattern);
		return self;
	},

	createDOM() {
		const self = this;
		const yjsdate = document.createElement('div');
		yjsdate.classList.add('yjsdate');
		yjsdate.classList.add('clearfix');
		Object.keys(self.list_attr).forEach(function(v) {
			const e = document.createElement('div');
			e.className = 'e';
			e.setAttribute('data-id', v);

			const up = document.createElement('div');
			up.className = 'up';
			up.innerHTML = '+';
			e.appendChild(up);

			const val = document.createElement('div');
			val.className = 'val';
			e.appendChild(val);

			const down = document.createElement('div');
			down.className = 'down';
			down.innerHTML = '-';
			e.appendChild(down);

			yjsdate.appendChild(e);
			self.list_dom[v] = val;
		});
		self.input.parentNode.insertBefore(yjsdate, self.input.nextSibling);
		// self.input.style.display = "none";
		self.element = yjsdate;
		return self;
	}
});
