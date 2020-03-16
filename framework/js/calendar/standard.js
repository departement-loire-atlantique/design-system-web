class CalendarStandard {
    constructor (options) {
        this.options = {
            element: null,
            selector: null,
            datesFilter: false,
            pastDates: true,
            availableWeekDays: [],
            availableDates: [],
            date: new Date(),
            todayDates: new Date(),
            previousButtonElement: null,
            nextButtonElement: null,
            month: null,
            monthLabel: null,
            onSelect: (data, element) => {
            },
            months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            shortWeekday: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        };
        for (let key in options) {
            if (this.options.hasOwnProperty(key)) {
                this.options[key] = options[key];
            }
        }

        if (this.options.element) {
            this.calendarElement = this.options.element;
        } else if (this.options.selector) {
            this.calendarElement = document.querySelector(this.options.selector);
        }
        if (!this.calendarElement) {
            return;
        }

        this.goToPreviousMonthHandler = this.goToPreviousMonth.bind(this);
        this.goToNextMonthHandler = this.goToNextMonth.bind(this);

        this.createCalendarLayout();
        this.options.previousButtonElement = this.calendarElement.querySelector('[data-calendar-toggle=previous]');
        this.options.nextButtonElement = this.calendarElement.querySelector('[data-calendar-toggle=next]');
        this.options.monthElement = this.calendarElement.querySelector('[data-calendar-area=month]');
        this.options.monthLabelElement = this.calendarElement.querySelector('[data-calendar-label=month]');

        this.options.date.setDate(1);
        this.createMonth();
        this.setWeekDayHeader();
        MiscEvent.addListener('click', this.goToPreviousMonthHandler, this.options.previousButtonElement);
        MiscEvent.addListener('click', this.goToNextMonthHandler, this.options.nextButtonElement);

        this.calendarElement.classList.remove('hidden');
    }

    createCalendarLayout () {
        this.calendarElement.innerHTML = `
            <div class="vanilla-calendar-header">
                <button type="button" class="vanilla-calendar-btn" data-calendar-toggle="previous"><svg height="24" version="1.1" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path></svg></button>
                <div class="vanilla-calendar-header__label" data-calendar-label="month"></div>
                <button type="button" class="vanilla-calendar-btn" data-calendar-toggle="next"><svg height="24" version="1.1" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path></svg></button>
            </div>
            <div class="vanilla-calendar-week"></div>
            <div class="vanilla-calendar-body" data-calendar-area="month"></div>
        `;
    }

    getWeekDay (day) {
        return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][day];
    }

    createMonth () {
        this.clearCalendar();
        let currentMonth = this.options.date.getMonth();
        while (this.options.date.getMonth() === currentMonth) {
            this.createDay();
            this.options.date.setDate(this.options.date.getDate() + 1);
        }

        this.options.date.setDate(1);
        this.options.date.setMonth(this.options.date.getMonth() - 1);
        this.options.monthLabelElement.innerHTML = this.options.months[this.options.date.getMonth()] + ' ' + this.options.date.getFullYear();

        this.calendarElement
            .querySelectorAll('[data-calendar-status=active]')
            .forEach(dateElement => {
                MiscEvent.addListener('click', this.selectDate.bind(this), dateElement);
            });
    }

    createDay () {
        const newDayElement = document.createElement('div');
        newDayElement.className = 'vanilla-calendar-date';
        newDayElement.setAttribute('data-calendar-date', this.options.date);

        const dateElement = document.createElement('span');
        dateElement.innerHTML = this.options.date.getDate();

        const availableWeekDay = this.options.availableWeekDays.filter(f => f.day === this.options.date.getDay() || f.day === this.getWeekDay(this.options.date.getDay()));
        const availableDate = this.options.availableDates.filter(f => f.date === (this.options.date.getFullYear() + '-' + String(this.options.date.getMonth() + 1).padStart(2, '0') + '-' + String(this.options.date.getDate()).padStart(2, '0')));

        if (this.options.date.getDate() === 1) {
            newDayElement.style.marginLeft = ((this.options.date.getDay()) * 14.28) + '%';
        }
        if (this.options.date.getTime() <= this.options.todayDates.getTime() - 1 && !this.options.pastDates) {
            newDayElement.classList.add('vanilla-calendar-date--disabled');
        } else {
            if (this.options.datesFilter) {
                if (availableWeekDay.length) {
                    newDayElement.classList.add('vanilla-calendar-date--active');
                    newDayElement.setAttribute('data-calendar-data', JSON.stringify(availableWeekDay[0]));
                    newDayElement.setAttribute('data-calendar-status', 'active');
                } else if (availableDate.length) {
                    newDayElement.classList.add('vanilla-calendar-date--active');
                    newDayElement.setAttribute('data-calendar-data', JSON.stringify(availableDate[0]));
                    newDayElement.setAttribute('data-calendar-status', 'active');
                } else {
                    newDayElement.classList.add('vanilla-calendar-date--disabled');
                }
            } else {
                newDayElement.classList.add('vanilla-calendar-date--active');
                newDayElement.setAttribute('data-calendar-status', 'active');
            }
        }
        if (this.options.date.toString() === this.options.todayDates.toString()) {
            newDayElement.classList.add('vanilla-calendar-date--today');
        }

        newDayElement.appendChild(dateElement);
        this.options.monthElement.appendChild(newDayElement);
    }

    removeActiveClass () {
        document
            .querySelectorAll('.vanilla-calendar-date--selected')
            .forEach((dateElement) => {
                dateElement.classList.remove('vanilla-calendar-date--selected')
            });
    }

    selectDate (evt) {
        this.removeActiveClass();
        let datas = evt.currentTarget.dataset;
        let data = {};
        if (datas.calendarDate) {
            data.date = datas.calendarDate;
        }
        if (datas.calendarData) {
            data.data = JSON.parse(datas.calendarData);
        }
        this.options.onSelect(data, evt.currentTarget);
        evt.currentTarget.classList.add('vanilla-calendar-date--selected');
    }

    goToPreviousMonth () {
        this.options.date.setMonth(this.options.date.getMonth() - 1)
        this.createMonth()
    }

    goToNextMonth () {
        this.options.date.setMonth(this.options.date.getMonth() + 1)
        this.createMonth()
    }

    clearCalendar () {
        this.options.monthElement.innerHTML = ''
    }

    setWeekDayHeader () {
        this.calendarElement.querySelector('.vanilla-calendar-week').innerHTML = `
            <span>${this.options.shortWeekday[0]}</span>
            <span>${this.options.shortWeekday[1]}</span>
            <span>${this.options.shortWeekday[2]}</span>
            <span>${this.options.shortWeekday[3]}</span>
            <span>${this.options.shortWeekday[4]}</span>
            <span>${this.options.shortWeekday[5]}</span>
            <span>${this.options.shortWeekday[6]}</span>
        `;
    }

    destroy () {
        MiscEvent.removeListener('click', this.goToPreviousMonthHandler, this.options.previousButtonElement);
        MiscEvent.removeListener('click', this.goToNextMonthHandler, this.options.nextButtonElement);
        this.clearCalendar();
        this.calendarElement.classList.add('hidden');
        this.calendarElement.innerHTML = '';
        this.calendarElement = null;
    }
}
