import { initCalendar } from "../../src/utils/calendar"

describe('Test calendar generator', () => {
    test('Generator function', () => {
        const testDate = new Date(2021, 1, 1);
        const input = initCalendar(testDate);
        const output = initCalendar(testDate);
        expect(input).toEqual(output);
    })
})