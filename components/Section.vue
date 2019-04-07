<template>
  <div>
    <div
      v-if="section.type === 'fullscreenImage'"
      class="bg"
      :style="{ backgroundImage: 'url(' + section.source + ')' }"
    >
      <slot></slot>
    </div>
    <div
      v-if="section.type === 'fullscreenImageShaded'"
      style="position:relative"
    >
      <div
        class="bg-shaded"
        :style="{ backgroundImage: 'url(' + section.source + ')' }"
      ></div>
      <div class="site-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Section',
  components: {},
  // eslint-disable-next-line vue/require-prop-types
  props: ['section'],
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
.bg {
  /* Full height */
  height: 100vh;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.bg-shaded {
  /* Full height */
  height: 100vh;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  opacity: 0.2;
}

.site-inner {
  position: absolute;
  top: 15%;
  width: 100%;
  z-index: 1;
}

@media (min-width: 1024px) {
  .site-inner {
    position: absolute;
    top: 10%;
    width: 100%;
    z-index: 1;
  }

  .bg {
    /* Full height */
    height: 100vh;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
