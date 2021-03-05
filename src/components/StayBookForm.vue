<template>
  <form :onsubmit="handleSubmit">

    <p class="price-label">{{price}}</p>
    <StarRating
      :star-value="starValue"
      :votes-number="votesNumber"
    />
    <hr />
    <DatePicker />

    <button type="submit">Submit</button>
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
      starValue: 3.3,
      votesNumber: 123,
    };
  },
  computed: {
    price() {
      return `${this.priceValue} ${this.priceUnit}`;
    },
  },
  methods: {
    testFun() {
      console.log("TESTSETEST");
    },
    handleSubmit() {
      console.log("HANDLE SUBMIT");
    },
  },
};
</script>

<style lang="scss">
form {
  min-height: 200px;
  width: 50%;
  margin: auto 50px;
  border: 2px solid var(--border);
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.price-label {
  padding: 0px;
  margin: 0px;
}
</style>