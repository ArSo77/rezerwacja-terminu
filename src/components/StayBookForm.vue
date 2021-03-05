<template>
  <form :onsubmit="handleSubmit">

    <StarRating
      :star-value="starValue"
      :votes-number="votesNumber"
    />
    <DatePicker v-if="false" />

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
      starValue: 3.3,
      votesNumber: 123,
    };
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
}
</style>