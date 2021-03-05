<template>
  <div
    class="Stars"
    :style="{'--rating': starValue}"
    :aria-label="`Rating of this product is ${starValue} out of 5.`"
  >
    <span
      class="votes-label"
      :aria-label="`${votesNumber} votes`"
    >{{votesNumber}}</span>
  </div>
</template>

<script>
export default {
  props: {
    starValue: {
      type: Number,
      require: true,
    },
    votesNumber: {
      type: Number,
      require: true,
    },
  },
};
</script>

<style lang="scss">
.Stars {
  --percent: calc(var(--rating) / 5 * 100%);

  display: inline;
  font-size: var(--star-size);

  &::before {
    content: "★★★★★";
    letter-spacing: -1px;
    background: linear-gradient(
      90deg,
      var(--star-color) var(--percent),
      var(--star-background) var(--percent)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.votes-label {
  padding-left: 5px;
  font-size: 0.825rem;
  font-weight: bold;
}
</style>