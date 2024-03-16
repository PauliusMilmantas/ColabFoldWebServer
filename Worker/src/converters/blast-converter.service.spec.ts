import { BlastConverter } from "./blast-converter.service";
import { input1, input2, input3, output1, output2, output3 } from "./blast-converter.test-cases";

describe('BlastConverterService', () => {
    let converter: BlastConverter;
    
    beforeAll(() => {
        converter = new BlastConverter();
    })

    it('should convert (SWIPE case #1)', () => {
        expect(converter.convert(input1)).toEqual(output1);
    })

    it('should convert (SWIPE case #2)', () => {
        expect(converter.convert(input2)).toEqual(output2);
    })

    it('should convert (DIAMOND case #1)', () => {
        expect(converter.convert(input3)).toEqual(output3);
    })
});