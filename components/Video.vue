<template>
  <div class="resp-iframe" style="background:black">
    <div v-show="showPreview">
      <a @click="onPlayClicked">
        <div class="vid-clip-sm resp-iframe">
          <img class="placeholder-img" :src="placeholder" />
          <div class="vid-clip-play">
            <img
              class="play-img"
              src="https://res.cloudinary.com/pickmywoof/image/upload/v1536919250/bts/play.png"
            />
          </div>
        </div>
      </a>
    </div>
    <iframe
      v-if="showVideo"
      title="myFrame"
      class="resp-iframe"
      :src="source"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'Video',
  // eslint-disable-next-line vue/require-prop-types
  props: ['source', 'placeholder'],
  data() {
    return {
      showPreview: false,
      showVideo: true
    }
  },
  mounted() {
    if (!navigator.onLine) {
      this.showPreview = true
      this.showVideo = false
    }
  },
  methods: {
    onPlayClicked: function() {
      if (navigator.onLine) {
        this.showPreview = false
        this.showVideo = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.video-thumbnail {
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin: 30px;

  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    content: '\f01d';
    font-family: FontAwesome;
    font-size: 100px;
    opacity: 0.8;
    text-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
  }
  &:hover:before {
    color: #eee;
  }
}

.vid-clip-sm .vid-clip-play:hover {
  background-color: rgba(0, 0, 0, 0.3);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#66000000', endColorstr='#66000000'); /* IE */
}

.section-background {
  background-color: #212121;
}

.section-background-list {
  background-color: #eeeeee;
}

.card {
  font-size: 20px;
}

.expansion-panel-background {
  background-color: rgba(0, 0, 0, 1) !important;
}

.placeholder-img {
  height: 100%;
  width: 100%;
}

@media (min-width: 1025px) {
  .resp-iframe {
    margin: auto;
    display: block;
    width: 100%;
    height: 50vh;
    border: 0;
  }

  .vid-clip-sm {
    width: 70vw;
    height: 70vh;
    position: relative;
    margin: 0 8px 8px 0;
  }

  .vid-clip-sm .vid-clip-play {
    width: 70vw;
    height: 70vh;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transition-property: background-color;
    -moz-transition-property: background-color;
    -o-transition-property: background-color;
    transition-property: background-color;
    -webkit-transition-duration: 0.4s;
    -moz-transition-duration: 0.4s;
    -o-transition-duration: 0.4s;
    transition-duration: 0.4s;
  }

  .play-img {
    height: 100px;
    width: 100px !important;
  }

  .vid-clip-sm .vid-clip-play img {
    position: absolute;
    top: 50%;
    left: 48%;
    margin: -22px 0 0 -22px;
    width: 44px;
  }
}

@media (max-width: 764px) {
  .resp-iframe {
    margin: auto;
    display: block;
    width: 100%;
    height: 33vh;
    border: 0;
  }

  .vid-clip-sm {
    position: relative;
    margin: 0 8px 8px 0;
  }

  .vid-clip-sm .vid-clip-play {
    width: 100vw;
    height: 33vh;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transition-property: background-color;
    -moz-transition-property: background-color;
    -o-transition-property: background-color;
    transition-property: background-color;
    -webkit-transition-duration: 0.4s;
    -moz-transition-duration: 0.4s;
    -o-transition-duration: 0.4s;
    transition-duration: 0.4s;
  }

  .vid-clip-sm .vid-clip-play img {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -22px 0 0 -22px;
    width: 44px;
  }
}

@media (max-width: 764px) and (orientation: landscape) {
  .resp-iframe {
    margin: auto;
    display: block;
    width: 100%;
    height: 90vh;
    border: 0;
  }

  .vid-clip-sm {
    position: relative;
    margin: 0 8px 8px 0;
  }

  .vid-clip-sm .vid-clip-play {
    width: 100vw;
    height: 90vh;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transition-property: background-color;
    -moz-transition-property: background-color;
    -o-transition-property: background-color;
    transition-property: background-color;
    -webkit-transition-duration: 0.4s;
    -moz-transition-duration: 0.4s;
    -o-transition-duration: 0.4s;
    transition-duration: 0.4s;
  }

  .vid-clip-sm .vid-clip-play img {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -22px 0 0 -22px;
    width: 44px;
  }
}

@media (min-device-width: 768px) and (max-device-width: 1024px) {
  .resp-iframe {
    margin: auto;
    display: block;
    width: 100%;
    height: 34vh;
    border: 0;
  }

  .vid-clip-sm {
    position: relative;
    margin: 0 8px 8px 0;
  }

  .vid-clip-sm .vid-clip-play {
    width: 80vw;
    height: 34vh;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transition-property: background-color;
    -moz-transition-property: background-color;
    -o-transition-property: background-color;
    transition-property: background-color;
    -webkit-transition-duration: 0.4s;
    -moz-transition-duration: 0.4s;
    -o-transition-duration: 0.4s;
    transition-duration: 0.4s;
  }

  .vid-clip-sm .vid-clip-play img {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -22px 0 0 -22px;
    width: 44px;
  }
}

@media (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .resp-iframe {
    margin: auto;
    display: block;
    width: 100%;
    height: 50vh;
    border: 0;
  }

  .vid-clip-sm {
    position: relative;
    margin: 0 8px 8px 0;
  }

  .vid-clip-sm .vid-clip-play {
    width: 80vw;
    height: 50vh;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transition-property: background-color;
    -moz-transition-property: background-color;
    -o-transition-property: background-color;
    transition-property: background-color;
    -webkit-transition-duration: 0.4s;
    -moz-transition-duration: 0.4s;
    -o-transition-duration: 0.4s;
    transition-duration: 0.4s;
  }

  .vid-clip-sm .vid-clip-play img {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -22px 0 0 -22px;
    width: 44px;
  }
}
</style>
