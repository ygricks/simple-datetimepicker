(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.MD = factory());
}(this, (function () { 'use strict';

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  /*jshint
      module: true,
      esversion: 9
  */
  function SubDate() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var dateInst = _construct(Date, args);

    Object.setPrototypeOf(dateInst, SubDate.prototype);
    return dateInst;
  }
  Object.setPrototypeOf(SubDate.prototype, Date.prototype);
  Object.assign(SubDate.prototype, {
    getMyMount: function getMyMount() {
      return this.getMonth() + 1;
    },
    addYear: function addYear(y) {
      this.setYear(this.getFullYear() + y);
      return this;
    },
    addMonth: function addMonth(m) {
      this.setMonth(this.getMonth() + m);
      return this;
    },
    addDays: function addDays(d) {
      this.setTime(this.getTime() + d * 86400000);
      return this;
    },
    addHours: function addHours(h) {
      this.setTime(this.getTime() + h * 3600000);
      return this;
    },
    addMinutes: function addMinutes(m) {
      this.setTime(this.getTime() + m * 60000);
      return this;
    },
    addSeconds: function addSeconds(s) {
      this.setTime(this.getTime() + m * 1000);
      return this;
    },
    to_str: function to_str(pattern) {
      pattern = !pattern ? 'Y-m-d H:i:s' : pattern;

      var x = function x(s) {
        return ('0' + s).slice(-2);
      };

      var day = this.getDate(),
          month = this.getMyMount(),
          year = this.getFullYear(),
          hour = this.getHours(),
          minute = this.getMinutes(),
          second = this.getSeconds(),
          a = hour >= 12 ? 'pm' : 'am',
          A = a.toUpperCase(),
          g = hour % 12 || 12,
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
          y = ('' + Y).substr(2, 2);
      pattern = pattern.replace('g', g).replace('G', G).replace('h', h).replace('H', H).replace('i', i).replace('s', s).replace('j', j).replace('d', d).replace('n', n).replace('m', m).replace('y', y).replace('Y', Y).replace('a', a).replace('A', A);
      return pattern;
    }
  });

  /*jshint
      module: true,
      esversion: 9
  */
  function extend() {
    var c = {};

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _loop = function _loop() {
      var o = _args[_i];
      Object.keys(o).forEach(function (k) {
        c[k] = o[k];
      });
    };

    for (var _i = 0, _args = args; _i < _args.length; _i++) {
      _loop();
    }

    return c;
  }

  /*jshint
  	module: true,
  	esversion: 9
  */
  function MD(input, params) {
    var self = this;
    var time = input.value;
    return self.init(input, time, params);
  }
  MD.SubDate = SubDate;
  Object.assign(MD.prototype, {
    init: function init(input, time, params) {
      var self = this;
      self.params = extend({}, params);
      self.input = input;
      self.ts = new SubDate(time);
      self.list_dom = {};
      self.list_attr = {
        y: {
          get: 'getFullYear',
          set: 'addYear'
        },
        m: {
          get: 'getMyMount',
          set: 'addMonth'
        },
        d: {
          get: 'getDate',
          set: 'addDays'
        },
        h: {
          get: 'getHours',
          set: 'addHours'
        },
        i: {
          get: 'getMinutes',
          set: 'addMinutes'
        }
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
    eventsListner: function eventsListner() {
      var self = this;
      self.element.addEventListener('click', function (event) {
        var target = event.target;
        var index = event.target.parentNode.getAttribute('data-id');

        if (target.classList.contains('up')) {
          self.update(index, 1);
        } else if (target.classList.contains('down')) {
          self.update(index, -1);
        }

        return;
      }, false);

      function scrolled(e) {
        var p = e.target.parentNode;

        if (p.classList.contains('e')) {
          var d = e.wheelDelta > 0 ? 1 : -1;
          e.preventDefault();
          self.update(p.getAttribute('data-id'), d);
        }
      }
      self.element.addEventListener('mousewheel', scrolled, {
        passive: false
      });
      self.element.addEventListener('DOMMouseScroll', scrolled, {
        passive: false
      });
      return self;
    },
    highlight: function highlight(element) {
      element.classList.remove('highlight');
      void element.offsetWidth;
      element.classList.add('highlight');
    },
    update: function update(attr, index) {
      var self = this;
      self.ts[self.list_attr[attr].set](index);
      return self.view();
    },
    view: function view() {
      var self = this;
      Object.keys(self.list_attr).forEach(function (v) {
        self.list_dom[v].innerHTML = self.ts[self.list_attr[v].get]();
      });
      self.input.value = self.ts.to_str(self.params && self.params.pattern);
      return self;
    },
    createDOM: function createDOM() {
      var self = this;
      var yjsdate = document.createElement('div');
      yjsdate.classList.add('yjsdate');
      yjsdate.classList.add('clearfix');
      Object.keys(self.list_attr).forEach(function (v) {
        var e = document.createElement('div');
        e.className = 'e';
        e.setAttribute('data-id', v);
        var up = document.createElement('div');
        up.className = 'up';
        up.innerHTML = '+';
        e.appendChild(up);
        var val = document.createElement('div');
        val.className = 'val';
        e.appendChild(val);
        var down = document.createElement('div');
        down.className = 'down';
        down.innerHTML = '-';
        e.appendChild(down);
        yjsdate.appendChild(e);
        self.list_dom[v] = val;
      });
      self.input.parentNode.insertBefore(yjsdate, self.input.nextSibling); // self.input.style.display = "none";

      self.element = yjsdate;
      return self;
    }
  });

  return MD;

})));
