<template>
  <div
    id="datepicker"
    class="datepicker"
    style="border: 1px solid red; padding: 15px"
  >
    Current: {{ currentDate }}
    <div class="date">
      <label for="id-textbox-1"> Date </label>
      <!-- <input
        type="text"
        placeholder="mm/dd/yyyy"
        id="id-textbox-1"
        aria-autocomplete="none"
      />
      <button
        class="icon"
        aria-label="Choose Date"
      >
        Show
      </button> -->

      <div
        style="border: 2px solid blue"
        @click="isOpened = true"
      >
        <div>
          {{CheckInDate}}
        </div>

        <div>
          {{CheckOutDate}}
        </div>
      </div>

    </div>

    <div v-show="isOpened">
      <div class="datepicker__header">
        <button
          class="datepicker__changeMonth"
          id="datepicker__previous-button"
          aria-label="previous month"
          type="button"
        >
          prev
        </button>
        <h2
          id="id-dialog-label"
          class="monthYear"
          aria-live="polite"
          type="button"
        >
          {{ calendarLabel }}
        </h2>
        <button
          id="datepicker__next-button"
          class="datepicker__changeMonth"
          aria-label="next month"
          type="button"
        >
          next
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
            >Su</th>
            <th
              scope="col"
              abbr="Monday"
            >Mo</th>
            <th
              scope="col"
              abbr="Tuesday"
            >Tu</th>
            <th
              scope="col"
              abbr="Wednesday"
            >We</th>
            <th
              scope="col"
              abbr="Thursday"
            >Th</th>
            <th
              scope="col"
              abbr="Friday"
            >Fr</th>
            <th
              scope="col"
              abbr="Saturday"
            >Sa</th>
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
import { initCalendar } from "../../utils/calendar";

export default defineComponent({
  name: "DatePicker",
  setup() {
    let isOpened = ref(false);

    let closeModal = function () {
      console.log("CLOSE FUNCTION");
      isOpened.value = false;
    };

    let pickedDays = ref([]);
    let transformDate = function (date) {
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    };
    let setFocus = function () {
      nextTick(() => {
        let button = document.getElementById(
          `calendar__button-${transformDate(currentDate.value)}`
        );
        button.focus();
      });
    };
    let pickDate = function (date) {
      if (
        pickedDays.value.find(
          (calendarDate) => calendarDate.getTime() == date.getTime()
        )
      ) {
        let index = pickedDays.value.findIndex(
          (calendarDate) => calendarDate.getTime() == date.getTime()
        );
        pickedDays.value.splice(index, 1);
      } else if (pickedDays.value.length == 2) {
        pickedDays.value = [date];
      } else {
        pickedDays.value.push(date);
      }
      pickedDays.value = pickedDays.value.sort((a, b) => a - b);
    };

    let isCalendarOpen = ref(true);
    let currentDate = ref(new Date(2021, 1, 1));
    let { label, days } = initCalendar(currentDate.value);
    let calendarLabel = ref(label);
    let calendarDays = ref(days);

    let getCellClass = function (day) {
      if (
        pickedDays.value.find(
          (calendarDate) => calendarDate.getTime() == day.date.getTime()
        )
      ) {
        return "calendar__cell--edgePick";
      }
      if (
        pickedDays.value.length == 2 &&
        day.date > pickedDays.value[0] &&
        day.date < pickedDays.value[1]
      ) {
        return "calendar__cell--rangePick";
      }
      return "";
    };

    function prevMonth() {
      currentDate.value = new Date(
        currentDate.value.setMonth(currentDate.value.getMonth() - 1)
      );
      calendarLabel.value = initCalendar(currentDate.value).label;
      calendarDays.value = initCalendar(currentDate.value).days;
    }

    function nextMonth() {
      currentDate.value = new Date(
        currentDate.value.setMonth(currentDate.value.getMonth() + 1)
      );
      calendarLabel.value = initCalendar(currentDate.value).label;
      calendarDays.value = initCalendar(currentDate.value).days;
    }

    function showModal() {
      isCalendarOpen.value = !isCalendarOpen.value;
    }

    function changeDateAndFocus(noOfDays) {
      currentDate.value = new Date(
        currentDate.value.setDate(currentDate.value.getDate() + noOfDays)
      );
      calendarLabel.value = initCalendar(currentDate.value).label;
      calendarDays.value = initCalendar(currentDate.value).days;
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

    let CheckInDate = ref("CheckInDate");
    let CheckOutDate = ref("CheckOutDate");

    return {
      CheckInDate,
      CheckOutDate,
      prevMonth,
      nextMonth,
      showModal,
      isCalendarOpen,
      currentDate,
      calendarLabel,
      calendarDays,
      getCellClass,
      pickedDays,
      pickDate,
      transformDate,
      closeModal,
      isOpened,
    };
  },
});
</script>

<style lang="scss">
.datepicker__header {
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  align-items: center;
  background: var(--primary);
}

.datepicker__changeMonth {
  background: none;
  height: 40px;
  border: none;
}

.calendar__cell button {
  background: transparent;
  border: none;
  padding: 6px 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.calendar__cell:hover button {
  border: 2px solid var(--primary);
}

.calendar__cell--edgePick button {
  background: var(--primary);
  color: white;
  border-radius: 50%;
}

.calendar__cell--rangePick button {
  background: #02ffcc44;
  border: 2px solid transparent;
  border-radius: 0;
  color: var(--primary);
}

.calendar__cell:hover button {
  border: 2px solid var(--primary);
  // color: var(--primary);
}
</style>