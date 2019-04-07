<template>
  <div class="home-sog">
    <video id="myVideo" autoplay muted loop class="video">
      <source :src="source" type="video/mp4" />
    </video>
    <div class="site-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionVideo',
  // eslint-disable-next-line vue/require-prop-types
  props: ['source']
}
</script>

<style scoped lang="scss">
.home-sog {
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.site-inner {
  position: absolute;
  top: 50%;
  width: 100%;
  color: #f1f1f1;
  z-index: 2;
}

.video {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  opacity: 0.5;
  pointer-events: none;
}

/* Add some content at the bottom of the video/page */
.content {
  position: absolute;
  width: 80vw;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

@media (min-width: 1024px) {
}

@media (max-width: 764px) {
}

@media (max-width: 764px) and (orientation: landscape) {
}

@media (min-device-width: 768px) and (max-device-width: 1024px) {
}
</style>
