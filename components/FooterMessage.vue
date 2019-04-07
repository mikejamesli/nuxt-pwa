<template>
  <div class="section-bg pa-5">
    <div class="text-xs-center mt-5 mb-5">
      <div class="section-headline">{{ headline }}</div>
      <v-btn class="mt-3 mb-5 button-font" :to="routeTo">{{
        buttonText
      }}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterMessage',
  // eslint-disable-next-line vue/require-prop-types
  props: ['headline', 'buttonText', 'routeTo']
}
</script>

<style scoped lang="scss">
@media (min-width: 1024px) {
  .section-headline {
    font-family: $secondary-font;
    font-size: 25px;
  }
}

@media (max-width: 764px) {
  .section-headline {
    font-family: $secondary-font;
    font-size: 20px;
  }
}

@media (max-width: 764px) and (orientation: landscape) {
  .section-headline {
    font-family: $secondary-font;
    font-size: 20px;
  }
}

@media (min-device-width: 768px) and (max-device-width: 1024px) {
  .section-headline {
    font-family: $secondary-font;
    font-size: 25px;
  }
}
</style>
