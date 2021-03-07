export default class Calendar {
    constructor() {
        this.fd = new Date();
        this.availableDates = [new Date(2020, 2, 10), new Date(2020, 2, 11), new Date(2020, 2, 12), new Date(2020, 2, 15)]
        this.testobj = this.getDays();
        this.label = this.getLabel();
    }


    changeFd(newDate) {
        this.fd = new Date(newDate)
    }

    changeMonth(value) {
        this.fd = new Date(this.fd.setMonth(this.fd.getMonth() + value));
    }

    changeDay(value) {
        this.fd = new Date(this.fd.setDate(this.fd.getDate() + value));
    }

    getFocusedDay() {
        return this.fd
    }

    getLabel() {
        return MONTH_LABELS[this.fd.getMonth()] + ' ' + this.fd.getFullYear();
    }

    getDays() {
        const firstDayOfMonth = new Date(this.fd.getFullYear(), this.fd.getMonth(), 1);
        const daysInMonth = new Date(this.fd.getFullYear(), this.fd.getMonth() + 1, 0).getDate();
        const dayOfWeek = firstDayOfMonth.getDay();
        const firstDayOfCalendar = new Date(firstDayOfMonth)
        firstDayOfCalendar.setDate(firstDayOfMonth.getDate() - dayOfWeek);
        const shortMonth = ((dayOfWeek + daysInMonth) < 36)
        const weeks = 6 - shortMonth
        const d = new Date(firstDayOfCalendar);
        const dayTable = []
        for (let day = 0; day < weeks * 7; day++) {
            let flag = d.getMonth() != this.fd.getMonth();
            let available = this.availableDates.some(date => d.getDate() == date.getDate());
            dayTable.push({ date: new Date(d), currentMonth: flag, available: available })
            d.setDate(d.getDate() + 1);
        }
        const weeksTable = new Array(weeks)
            .fill()
            .map(() => dayTable.splice(0, 7))
        return weeksTable
    }

}


const MONTH_LABELS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
