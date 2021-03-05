<template>
  <div
    id="myDatepicker"
    class="datepicker"
    style="border: 1px solid red; padding: 15px"
  >
    <div class="date">
      <label for="id-textbox-1"> Date </label>
      <input
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
      </button>
    </div>

    <div class="datepicker__header">
      <button
        class="datepicker__changeMonth"
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
        label
      </h2>
      <button
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

        <tr class="calendar__row">
          <td class="calendar__cell">
            <button tabindex="-1">
              AAAA
            </button>
          </td>
          <td class="calendar__cell">
            <button tabindex="-1">
              BBBB
            </button>
          </td>
          <td class="calendar__cell">
            <button tabindex="-1">
              CCCC
            </button>
          </td>
        </tr>

      </tbody>
    </table>
    <div class="dialogButtonGroup">
      <button
        class="dialogButton"
        value="cancel"
      >Cancel</button>
      <button
        class="dialogButton"
        value="ok"
      >OK</button>
    </div>
    <div
      class="message"
      aria-live="polite"
    >Test</div>
  </div>
</template>

<script>
export default {};
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
  background: #00dbb1;
  border-radius: 50%;
  color: white;
}

.calendar__cell--rangePick button {
  background: #02ffcc44;
  border: 2px solid transparent;
  border-radius: 0;
  color: var(--primary);
}

.calendar__cell:hover button {
  border: 2px solid var(--primary);
  color: var(--primary);
}
</style>