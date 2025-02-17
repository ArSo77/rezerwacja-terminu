<template>
  <div id="datepicker" class="datepicker">
    <label class="datepicker__input-label"> Dates: </label>

    <div @click="showModal" class="datepicker-input">
      <input
        type="button"
        name="checkInDate"
        class="datepicker-input__input"
        :class="{
          'datepicker-input__input--active':
            isOpened && pickedDates.length != 1,
        }"
        :value="CheckInDate"
      />

      <img
        src="../../assets/icons/right-arrow.svg"
        class="datepicker-input__arrow"
      />

      <input
        type="button"
        name="checkOutDate"
        class="datepicker-input__input"
        :class="{
          'datepicker-input__input--active':
            isOpened && pickedDates.length == 1,
        }"
        :value="CheckOutDate"
      />
    </div>

    <div
      v-show="isOpened"
      class="datepicker__content"
      v-click-outside="closeModal"
    >
      <div class="datepicker__header">
        <button
          class="datepicker__changeMonth"
          aria-label="previous month"
          id="datepicker__previous-button"
          type="button"
          @click="changeMonth(-1)"
        >
          &lt;
        </button>
        <p class="datepicker__label" aria-live="polite">
          {{ calendarLabel }}
        </p>
        <button
          class="datepicker__changeMonth"
          aria-label="next month"
          id="datepicker__next-button"
          type="button"
          @click="changeMonth(1)"
        >
          &gt;
        </button>
      </div>

      <table
        id="myDatepickerGrid"
        class="calendar"
        role="grid"
        aria-labelledby="id-dialog-label"
      >
        <thead class="calendar__header">
          <tr>
            <th scope="col" abbr="Sunday">Sun</th>
            <th scope="col" abbr="Monday">Mon</th>
            <th scope="col" abbr="Tuesday">Tue</th>
            <th scope="col" abbr="Wednesday">Wed</th>
            <th scope="col" abbr="Thursday">Thu</th>
            <th scope="col" abbr="Friday">Fri</th>
            <th scope="col" abbr="Saturday">Sat</th>
          </tr>
        </thead>
        <tbody class="calendar__content">
          <tr
            v-for="(week, index) in calendarDays"
            class="calendar__row"
            :key="index"
          >
            <td
              v-for="(day, index) in week"
              class="calendar__cell"
              :class="getCellClass(day)"
              :key="index"
              :id="`calendar__cell-${transformDate(day.date)}`"
            >
              <button
                type="button"
                tabindex="-1"
                :disabled="day.currentMonth"
                @click="pickDate(day)"
                :id="`calendar__button-${transformDate(day.date)}`"
              >
                {{ day.date.getDate() }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  nextTick,
  onUnmounted,
  toRefs,
} from "vue";
import Calendar from "../../model/Calendar.model";

export default defineComponent({
  name: "DatePicker",
  props: {
    availableDates: {
      type: Array,
      require: false,
      default: () => [],
    },
    pickedDates: {
      type: Array,
      require: true,
    },
  },
  setup(props, { emit }) {
    const { availableDates, pickedDates } = toRefs(props);
    const CalendarInstance = new Calendar({
      availableDates: availableDates.value,
    });
    const label = CalendarInstance.getLabel();
    const days = CalendarInstance.getDays();
    const currentDate = CalendarInstance.getFocusedDay();
    const calendarLabel = ref(label);
    const calendarDays = ref(days);
    const isOpened = ref(false);
    const CheckInDate = ref("Check In");
    const CheckOutDate = ref("Check Out");

    function showModal() {
      isOpened.value = true;
      setFocus();
    }

    function closeModal(e) {
      if (e == undefined) {
        isOpened.value = false;
      }
      const path = e && e.path;
      if (path && !path.includes(document.getElementById("datepicker"))) {
        isOpened.value = false;
      }
    }

    function transformDate(date) {
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }
    function setFocus() {
      nextTick(() => {
        let button = document.getElementById(
          `calendar__button-${transformDate(CalendarInstance.getFocusedDay())}`
        );
        button.focus();
      });
    }
    function pickDate(day) {
      let { date, available } = day;
      if (!available) return;
      CalendarInstance.changeFd(date);
      if (pickedDates.value.length != 1) {
        emit("update:pickedDates", [date]);
        CheckInDate.value = formatDate(pickedDates.value[0]);
        CheckOutDate.value = "";
      } else if (pickedDates.value.length == 1) {
        let tempDate = pickedDates.value;
        tempDate = tempDate.sort((a, b) => a - b);
        tempDate.push(date);
        emit("update:pickedDates", tempDate);
        CheckInDate.value = formatDate(tempDate[0]);
        CheckOutDate.value = formatDate(tempDate[1]);
        closeModal();
      }
    }

    let formatDate = function (date) {
      return date.toLocaleDateString("en-US");
    };

    function getCellClass(day) {
      if (
        pickedDates.value.find(
          (calendarDate) => calendarDate.getTime() == day.date.getTime()
        )
      ) {
        return "calendar__cell--edgePick";
      } else if (
        pickedDates.value.length == 2 &&
        day.date > pickedDates.value[0] &&
        day.date < pickedDates.value[1]
      ) {
        return "calendar__cell--rangePick";
      } else if (!day.available && !day.currentMonth) {
        return "calendar__cell--not-available";
      }
      return "";
    }

    function updateComponent() {
      calendarLabel.value = CalendarInstance.getLabel();
      calendarDays.value = CalendarInstance.getDays();
      currentDate.value = CalendarInstance.getFocusedDay();
    }

    function changeMonth(value) {
      CalendarInstance.changeMonth(value);
      updateComponent();
    }

    function changeDateAndFocus(noOfDays) {
      CalendarInstance.changeDay(noOfDays);
      updateComponent();
      setFocus();
    }

    function tabFocusElement() {
      let focusedElement = document.activeElement.id;
      if (focusedElement.startsWith("calendar__button")) {
        document.getElementById("datepicker__previous-button").focus();
      } else if (focusedElement.startsWith("datepicker__previous-button")) {
        document.getElementById("datepicker__next-button").focus();
      } else {
        setFocus();
      }
    }

    let clickEvent = function () {
      if (!isOpened.value) return;
      event.preventDefault();
      let { key } = event;
      if (
        key != "Tab" &&
        key != "Enter" &&
        key != " " &&
        !document.activeElement.id.startsWith("calendar__button")
      ) {
        return;
      } else if (key == "ArrowRight") {
        changeDateAndFocus(1);
      } else if (key == "ArrowLeft") {
        changeDateAndFocus(-1);
      } else if (key == "ArrowUp") {
        changeDateAndFocus(-7);
      } else if (key == "ArrowDown") {
        changeDateAndFocus(7);
      } else if (key == "Enter" || key == " ") {
        event.target.click();
      } else if (key == "Tab") {
        tabFocusElement();
      } else if (key == "Escape") {
        closeModal();
      }
    };

    onMounted(() => {
      document
        .getElementById("datepicker")
        .addEventListener("keydown", clickEvent);
      setFocus();
    });

    onUnmounted(() => {
      document
        .getElementById("datepicker")
        .removeEventListener("keydown", clickEvent);
    });

    return {
      CheckInDate,
      CheckOutDate,
      changeMonth,
      currentDate,
      calendarLabel,
      calendarDays,
      getCellClass,
      pickDate,
      transformDate,
      closeModal,
      isOpened,
      showModal,
    };
  },
});
</script>

<style lang="scss">
table {
  border-collapse: separate;
  border-spacing: 0px 10px;
}

td {
  height: 42px;
  padding: 0;
}

.datepicker {
  position: relative;
  user-select: none;
  &__header {
    display: flex;
    justify-content: space-between;
    padding: 0px 10px;
    align-items: center;
    background: var(--primary);
    height: 50px;
  }
  &__label {
    background: transparent;
    color: white;
    user-select: none;
    font-size: 1.25rem;
  }
  &__changeMonth {
    position: relative;
    background: none;
    height: 40px;
    border: 0px;
    font-size: 30px;
    font-weight: bold;
    &::after {
      position: absolute;
      content: "";
      height: 1px;
      margin: 0 auto;
      left: 0;
      right: 0;
      width: 50%;
      top: 28px;
      background: black;
    }
  }
  &__input-label {
    font-weight: bold;
    font-size: 1rem;
  }
  & .datepicker__content {
    position: absolute;
    transform: translateY(calc(100% + 15px));
    bottom: 0px;
    left: 0px;
    &::after {
      content: "";
      width: 20px;
      transform: rotate(-45deg);
      border-bottom: solid 3px var(--border);
      position: absolute;
      left: 15px;
      top: -9px;
    }
    &::before {
      content: "";
      width: 20px;
      transform: rotate(45deg);
      border-bottom: solid 3px var(--border);
      position: absolute;
      left: 27px;
      top: -9px;
    }
  }
  & .datepicker-input {
    border: 2px solid var(--border);
    padding: 10px;
    display: flex;
    justify-content: space-between;
    min-width: 300px;
    &__arrow {
      height: 20px;
      width: 80px;
    }
    &__input {
      border: none;
      background: transparent;
      padding: 2px 4px;
      border-radius: 2px;
      width: 100%;
      color: var(--text-header);
      font-size: 14px;
      &--active {
        background: var(--primary-dark);
      }
    }
  }
}

.calendar {
  padding: 10px 10px 0px 10px;
  background: white;
  & th {
    color: lightgray;
    font-size: 0.825rem;
    font-weight: bold;
    background: transparent;
  }
}

.calendar__cell {
  position: relative;
  & button {
    background: transparent;
    border: none;
    padding: 6px 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-weight: bold;
  }
  &:hover button {
    border: 1px solid var(--primary);
  }
  &--edgePick {
    z-index: 1;
    position: relative;
  }
}
.calendar__cell--edgePick {
  position: relative;
  z-index: 2;
}

.calendar__cell--rangePick {
  position: relative;
  z-index: 1;
}
.calendar__cell--edgePick button {
  background: var(--primary);
  color: white;
  border-radius: 50%;
}

.calendar__cell--rangePick button {
  background: var(--primary-light);
  border: 1px solid transparent;
  border-radius: 0;
  color: var(--primary);
}

.calendar__cell--not-available button {
  color: var(--not-available);
}

.calendar__cell:hover button {
  border: 1px solid var(--primary);
}

.calendar__cell--rangePick + .calendar__cell--edgePick::after {
  background: var(--primary-light);
  position: absolute;
  z-index: -1;
  height: 40px;
  left: 0px;
  width: 20px;
  content: "";
}

.calendar__cell--edgePick + .calendar__cell--edgePick::after {
  background: var(--primary-light);
  position: absolute;
  z-index: -1;
  height: 40px;
  left: 0px;
  width: 20px;
  content: "";
}

.calendar__cell--edgePick + .calendar__cell--rangePick::before {
  background: var(--primary-light);
  position: absolute;
  z-index: -2;
  height: 40px;
  left: -20px;
  width: 20px;
  content: "";
}

.calendar__cell--edgePick + .calendar__cell--edgePick {
  z-index: 1;
}

.calendar__cell--edgePick + .calendar__cell--edgePick::before {
  background: var(--primary-light);
  position: absolute;
  z-index: 2;
  height: 40px;
  left: -20px;
  width: 20px;
  content: "";
}
</style>