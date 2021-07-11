import SubDate from '../src/SubDate';

describe('SubDate', () => {
	let date = '2019-12-01 00:00:00';
	let sd = SubDate(date);
	let nsd = new SubDate(date);

	it('should be defined', () => {
		expect(SubDate).toBeTruthy();
		expect(sd).toEqual(nsd);
	});

	it('should be instance of SubDate', () => {
		expect(sd instanceof SubDate).toBeTruthy();
		expect(sd.constructor).toBe(SubDate);

		expect(nsd instanceof SubDate).toBeTruthy();
		expect(nsd.constructor).toBe(SubDate);
	});

	it('should be instance of Date', () => {
		expect(sd instanceof Date).toBeTruthy();
		expect(sd.constructor).toBe(SubDate);

		expect(sd instanceof Date).toBeTruthy();
		expect(sd.constructor).toBe(SubDate);
	});

	it('shuld be same value after to_str', () => {
		expect(sd.to_str()).toBe(date);
	});

	describe('.addYear(year)', function () {
		it('should add years', () => {
			let year = sd.getYear();

			sd.addYear(1);
			expect(sd.getYear()).toBe(year + 1);

			sd.addYear(100);
			expect(sd.getYear()).toBe(year + 101);

			sd.addYear(-99);
			expect(sd.getYear()).toBe(year + 2);

		});
	});

	describe('.addMonth(month)', function () {
		it('should add months', () => {
			let month_number = 2; // Feb
			sd.setMonth(month_number-1); // start count from 0

			expect(sd.getMyMount()).toBe(month_number);

			sd.addMonth(2);
			expect(sd.getMyMount()).toBe(month_number+2);

			sd.addMonth(-1);
			expect(sd.getMyMount()).toBe(month_number+1);

			let year = sd.getFullYear();
			sd.addMonth(12);
			expect(sd.getMyMount()).toBe(month_number+1);
			expect(sd.getFullYear()).toBe(year+1);

			sd.addMonth(-24);
			expect(sd.getFullYear()).toBe(year-1);

			// save date & year
			let date_number = 28;
			sd.setDate(date_number);
			sd.setMonth(month_number);
			sd.setYear(year);
			sd.addMonth(1);
			expect(sd.getDate()).toBe(date_number);
			expect(sd.getFullYear()).toBe(year);
		})
	});

	describe('.addDays(days)', function () {
		it('should add days', () => {
			let days = 15;
			sd.setDate(days);

			sd.addDays(-1)
			expect(sd.getDate()).toBe(days-1);

			sd.addDays(2);
			expect(sd.getDate()).toBe(days+1);

			sd.addDays(-7);
			expect(sd.getDate()).toBe(days-6);
			//
		});
	});

	describe('.addHours(hours)', function () {
		it('should add days', () => {
			let hours = 20;
			sd.setHours(hours);

			sd.addHours(2)
			expect(sd.getHours()).toBe(hours+2);

			sd.addHours(-11);
			expect(sd.getHours()).toBe(hours-9);

			sd.addHours(15);
			expect(sd.getHours()).toBe(hours-18);
		});
	});

	describe('.addMinutes(minutes)', function () {
		it('should add minutes', () => {
			let minutes = 21;
			sd.setMinutes(minutes);

			sd.addMinutes(2);
			expect(sd.getMinutes()).toBe(minutes+2);

			sd.addMinutes(-1);
			expect(sd.getMinutes()).toBe(minutes+1);

			sd.addMinutes(-1);
			expect(sd.getMinutes()).toBe(minutes);

			sd.addMinutes(-61);
			expect(sd.getMinutes()).toBe(minutes-1);
		});
	});

	describe('.to_str(pattern)', function () {
		it('should return date by pattern', () => {
			date = '2019-12-11 14:28:15';
			sd = SubDate(date);

			expect(sd.to_str('a/A')).toBe('pm/PM');
			expect(sd.to_str('H-h--G-g')).toBe('14-02--14-2');
			expect(sd.to_str('y-m-d')).toBe('19-12-11');
			expect(sd.to_str('Y-n-j')).toBe('2019-12-11');

			date = '2011-04-01 09:02:03';
			sd = SubDate(date);

			expect(sd.to_str('a/A')).toBe('am/AM');
			expect(sd.to_str('H-h--G-g')).toBe('09-09--9-9');
			expect(sd.to_str('y-m-d')).toBe('11-04-01');
			expect(sd.to_str('Y-n-j')).toBe('2011-4-1');

			date = '2001-03-10 17:16:18';
			sd = SubDate(date);
			expect(sd.to_str('j, Y, g:i a')).toBe('10, 2001, 5:16 pm');
			expect(sd.to_str('m.d.y')).toBe('03.10.01');
			expect(sd.to_str('j, n, Y')).toBe('10, 3, 2001');
			expect(sd.to_str('Ymd')).toBe('20010310');
			expect(sd.to_str('h-i-s, j-m-y')).toBe('05-16-18, 10-03-01');
			expect(sd.to_str('j G:i:s Y')).toBe('10 17:16:18 2001');
			expect(sd.to_str('Y-m-d H:i:s')).toBe('2001-03-10 17:16:18');

		});

		it('should escape some characters', () => {
			const date = '2021-07-11 13:01:44';
			const sd = SubDate(date);

			expect(sd.to_str('H\\h:i\\m:s\\s')).toBe('13h:01m:44s');
			expect(sd.to_str('\\A: ga, \\i: i [s]')).toBe('A: 1pm, i: 01 [44]');
			expect(sd.to_str('\\Y: Y, \\m: m, \\d: d')).toBe('Y: 2021, m: 07, d: 11');
			expect(sd.to_str('Curre\\nt t\\i\\me: \\\\ha:i\\m:s\\s\\\\')).toBe('Current time: \\01pm:01m:44s\\');
			expect(sd.to_str('To\\d\\a\\y \\i\\s: [m-d-y]')).toBe('Today is: [07-11-21]');
		});
	});

});
