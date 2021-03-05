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

<style>
</style>