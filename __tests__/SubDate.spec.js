
const esm = require('esm')(module);

const SubDate = esm('../src/SubDate.js').default;

describe('SubDate', () => {
	let date = '2019-12-01 00:00';
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

});
