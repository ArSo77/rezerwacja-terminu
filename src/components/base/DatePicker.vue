<template>
  <div
    id="datepicker"
    class="datepicker"
  >
    <label class="datepicker__input-label"> Dates: </label>

    <div
      @click="showModal"
      style="border: 1px solid blue"
    >
      <div>
        {{CheckInDate}}
      </div>

      <div>
        {{CheckOutDate}}
      </div>
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
        <p
          class="datepicker__label"
          aria-live="polite"
        >
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
            <th
              scope="col"
              abbr="Sunday"
            >Sun</th>
            <th
              scope="col"
              abbr="Monday"
            >Mon</th>
            <th
              scope="col"
              abbr="Tuesday"
            >Tue</th>
            <th
              scope="col"
              abbr="Wednesday"
            >Wed</th>
            <th
              scope="col"
              abbr="Thursday"
            >Thu</th>
            <th
              scope="col"
              abbr="Friday"
            >Fri</th>
            <th
              scope="col"
              abbr="Saturday"
            >Sat</th>
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
                @click="pickDate(day.date)"
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
import { defineComponent, ref, onMounted, nextTick } from "vue";
import Calendar from "../../model/Calendar.model";

export default defineComponent({
  name: "DatePicker",
  setup() {
    let CalendarInstance = new Calendar();
    let label = CalendarInstance.getLabel();
    let days = CalendarInstance.getDays();
    let currentDate = CalendarInstance.getFocusedDay();
    let calendarLabel = ref(label);
    let calendarDays = ref(days);
    let isOpened = ref(true);
    let pickedDays = ref([]);
    let CheckInDate = ref("CheckInDate");
    let CheckOutDate = ref("CheckOutDate");
    console.log("'''''''''", pickedDays.value);

    let showModal = function () {
      isOpened.value = true;
      setFocus();
    };

    let closeModal = function (e) {
      const path = e.path || (e.composedPath ? e.composedPath() : undefined);
      if (path && !path.includes(document.getElementById("datepicker"))) {
        isOpened.value = false;
      }
    };

    let transformDate = function (date) {
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    };
    let setFocus = function () {
      nextTick(() => {
        let button = document.getElementById(
          `calendar__button-${transformDate(CalendarInstance.getFocusedDay())}`
        );
        button.focus();
      });
    };
    let pickDate = function (date) {
      CalendarInstance.changeFd(date);
      if (pickedDays.value.length != 1) {
        pickedDays.value.length = 0;
        pickedDays.value.push(date);
        CheckInDate.value = pickedDays.value[0];
        CheckOutDate.value = "";
      } else if (pickedDays.value.length == 1) {
        pickedDays.value.push(date);
        pickedDays.value = pickedDays.value.sort((a, b) => a - b);
        CheckInDate.value = pickedDays.value[0];
        CheckOutDate.value = pickedDays.value[1];
      }

      // if (
      //   pickedDays.value.find(
      //     (calendarDate) => calendarDate.getTime() == date.getTime()
      //   )
      // ) {
      //   let index = pickedDays.value.findIndex(
      //     (calendarDate) => calendarDate.getTime() == date.getTime()
      //   );
      //   pickedDays.value.splice(index, 1);
      // } else if (pickedDays.value.length == 2) {
      //   pickedDays.value = [date];
      // } else {
      //   pickedDays.value.push(date);
      // }
      pickedDays.value = pickedDays.value.sort((a, b) => a - b);
    };

    let getCellClass = function (day) {
      if (
        pickedDays.value.find(
          (calendarDate) => calendarDate.getTime() == day.date.getTime()
        )
      ) {
        return "calendar__cell--edgePick";
      } else if (
        pickedDays.value.length == 2 &&
        day.date > pickedDays.value[0] &&
        day.date < pickedDays.value[1]
      ) {
        return "calendar__cell--rangePick";
      } else if (!day.available && !day.currentMonth) {
        return "calendar__cell--not-available";
      }
      return "";
    };

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

    onMounted(() => {
      document
        .getElementById("datepicker")
        .addEventListener("keydown", function (event) {
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
          }
        });
      setFocus();
    });

    return {
      CheckInDate,
      CheckOutDate,
      changeMonth,
      currentDate,
      calendarLabel,
      calendarDays,
      getCellClass,
      pickedDays,
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
.calendar__cell {
  position: relative;
}

.datepicker__header {
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  align-items: center;
  background: var(--primary);
}

.calendar__cell button {
  background: transparent;
  border: none;
  padding: 6px 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-weight: bold;
}

.calendar__cell:hover button {
  border: 1px solid var(--primary);
}

.calendar__cell--edgePick {
  z-index: 1;
  position: relative;
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

.datepicker {
  position: relative;
  user-select: none;
}

.datepicker__content {
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

.datepicker__header {
  height: 50px;
}

.datepicker__label {
  background: transparent;
  color: white;
  user-select: none;
  font-size: 1.25rem;
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

.datepicker__changeMonth {
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

.datepicker__input-label {
  font-weight: bold;
  font-size: 1rem;
}

table {
  border-collapse: separate;
  border-spacing: 0px 10px;
}

td {
  height: 42px;
  padding: 0;
}

.calendar__cell--edgePick {
  position: relative;
  z-index: 2;
}

.calendar__cell--rangePick {
  position: relative;
  z-index: 1;
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