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
    <DatePicker />
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
  width: 300px;
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