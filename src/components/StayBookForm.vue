<template>
  <form
    :onsubmit="handleSubmit"
    style="1px solid red"
  >
    <p class="price-label">{{price}}</p>
    <StarRating
      :star-value="starValue"
      :votes-number="votesNumber"
    />
    <hr />
    <DatePicker
      v-model:picked-dates="pickedDates"
      :available-dates="availableDates"
    />
    <button
      id="submit-button"
      type="submit"
    >Submit</button>
  </form>
</template>

<script>
import DatePicker from "./base/DatePicker.vue";
import StarRating from "./base/StarRating.vue";
export default {
  components: { StarRating, DatePicker },
  data() {
    return {
      availableDates: [
        new Date(2021, 2, 10),
        new Date(2021, 2, 11),
        new Date(2021, 2, 12),
        new Date(2021, 2, 17),
      ],
      pickedDates: [new Date(2021, 2, 15), new Date(2021, 2, 18)],
      priceValue: 298,
      priceUnit: "zł",
      starValue: 4.4,
      votesNumber: 123,
    };
  },
  computed: {
    price() {
      return `${this.priceValue} ${this.priceUnit}`;
    },
  },
  methods: {
    handleSubmit() {
      //todo
    },
  },
};
</script>

<style lang="scss">
form {
  min-width: 340px;
  border: 2px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
}

.price-label {
  padding: 0px;
  margin: 0px;
  font-size: 1.5rem;
  font-weight: bold;
}

#submit-button {
  margin-top: 20px;
}
</style>