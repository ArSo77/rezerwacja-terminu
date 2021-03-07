export const MONTH_LABELS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function initCalendar(pickedDate) {
    const fd = pickedDate;
    const label = MONTH_LABELS[fd.getMonth()] + ' ' + fd.getFullYear();
    const firstDayOfMonth = new Date(fd.getFullYear(), fd.getMonth(), 1);
    const daysInMonth = new Date(fd.getFullYear(), fd.getMonth() + 1, 0).getDate();
    const dayOfWeek = firstDayOfMonth.getDay();
    const firstDayOfCalendar = new Date(firstDayOfMonth)
    firstDayOfCalendar.setDate(firstDayOfMonth.getDate() - dayOfWeek);

    const shortMonth = ((dayOfWeek + daysInMonth) < 36)
    const weeks = 6 - shortMonth
    const d = new Date(firstDayOfCalendar);
    const dayTable = []

    for (let day = 0; day < weeks * 7; day++) {
        let flag = d.getMonth() == fd.getMonth();
        dayTable.push({ date: new Date(d), currentMonth: flag })
        d.setDate(d.getDate() + 1);
    }

    const weeksTable = new Array(weeks)
        .fill()
        .map(() => dayTable.splice(0, 7))

    return { label: label, days: weeksTable }
}