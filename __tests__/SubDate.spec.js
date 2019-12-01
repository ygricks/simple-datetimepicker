
let { SubDate } = require('..');

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

});
