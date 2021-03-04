<template>
  <div>Stay book form
    <StarRating />
    <DatePicker />
  </div>
</template>

<script>
import DatePicker from "./base/DatePicker.vue";
import StarRating from "./base/StarRating.vue";
export default {
  components: { StarRating, DatePicker },
};
</script>

<style lang="scss">
</style>