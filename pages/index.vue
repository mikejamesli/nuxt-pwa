<template>
  <div class="home">
    <Section
      style="position: relative;"
      :section="{
        type: 'fullscreenImage',
        source:
          'https://res.cloudinary.com/pickmywoof/image/upload/v1551091839/AdobeStock_201297453.jpg'
      }"
    >
      <div :class="[isIphoneX ? groupPadding : '', bottomGroup]">
        <div class="page-title pa-1 text-xs-center">
          Social Media Fitness & Health Entrepreneur
        </div>
      </div>
      <div class="video-content position-bottom">
        <img
          class="highlight-headline mb-3 hidden-lg-and-up"
          alt="home"
          :src="require(`@/assets/logo-white.png`)"
        />
      </div>
      <div class="main-headline group-positioning mb-3 text-xs-center">
        <img
          class="home-title"
          alt="title"
          src="https://res.cloudinary.com/pickmywoof/image/upload/c_scale,w_770/v1554454394/home-title.png"
        />
        <v-btn large dark class="watch-button" @click="playVideoClicked">
          <v-icon class="custom-icon mr-2">play_circle_outline</v-icon>Watch
          Trailer
        </v-btn>
        <v-btn
          v-if="!isStandalone()"
          dark
          large
          class="watch-button"
          @click="install"
        >
          <v-icon class="custom-icon mr-2">system_update</v-icon>Install the app
        </v-btn>
      </div>
    </Section>
    <v-dialog v-model="showIosDialog" lazy max-width="700">
      <v-card v-touch="{ down: () => swipeDown() }" class="custom-card">
        <v-card-text class="meta">
          <v-layout row wrap>
            <v-flex xs12 sm12 class="mt-3 text-xs-center">
              <div class="section-headline">iOS</div>
              <div>
                1. In safari, tap on the
                <img
                  class="ml-1"
                  style="height:26px;width:18px"
                  :src="require(`@/assets/iosshare.png`)"
                />
                icon.
              </div>
              <div>2. Scroll left to find the "Add to Home Screen" icon.</div>
              <img :src="require(`@/assets/aths.jpg`)" />
              <div>
                3. Tap "Add" and the app icon will appear on your Home Screen.
              </div>
              <v-img
                class="mt-3"
                :src="require(`@/assets/install/ios.gif`)"
              ></v-img>
            </v-flex>
          </v-layout>
        </v-card-text>
        <div class="text-xs-center">
          <v-btn dark class="mt-3 mb-3" @click="showIosDialog = false"
            >Close</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDesktopDialog" lazy max-width="630">
      <v-card v-touch="{ down: () => swipeDown() }" class="custom-card">
        <v-card-text class="meta">
          <v-layout row wrap>
            <v-flex xs12 sm6 class="mt-3 text-xs-center">
              <div class="section-headline">iOS (Safari)</div>
              <v-img src="~/assets/install/ios.gif"></v-img>
            </v-flex>
            <v-flex xs12 sm6 class="mt-3 text-xs-center">
              <div class="section-headline">Android (Chrome)</div>
              <v-img src="~/assets/install/android.gif"></v-img>
            </v-flex>
          </v-layout>
        </v-card-text>
        <div class="text-xs-center">
          <v-btn dark class="mt-3 mb-3" @click="showDesktopDialog = false"
            >Close</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showVideo" persistent lazy max-width="830">
      <div class="text-xs-center section-padding">
        <div class="text-xs-right">
          <v-icon
            class="icon-color"
            @click="
              showVideo = false
              $bus.$emit('resume')
            "
            >close</v-icon
          >
        </div>
        <Video v-if="showVideo" :source="selectedVideo" />
      </div>
    </v-dialog>
  </div>
</template>

<script>
import Video from '@/components/Video.vue'
import Section from '@/components/Section.vue'
import Utils from '@/mixins/utils'
export default {
  name: 'Home',
  components: {
    Video,
    Section
  },
  mixins: [Utils],
  data() {
    return {
      showIosDialog: false,
      deferredPrompt: null,
      showDesktopDialog: false,
      showVideo: false,
      isIphoneX: false,
      bottomGroup: 'bottom-group',
      groupPadding: 'group-padding'
    }
  },
  computed: {},
  mounted() {
    // eslint-disable-next-line nuxt/no-env-in-hooks
    if (process.client) {
      window.addEventListener('beforeinstallprompt', e => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault()
        // Stash the event so it can be triggered later.
        this.deferredPrompt = e
      })
    }
  },
  created() {
    this.checkIfIphoneX()
    // this.$store.commit('updateLastOpenedPage', 'welcome')
    import('aos').then(AOS => AOS.init())
    // eslint-disable-next-line nuxt/no-globals-in-created
    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.onscroll = null
    }
  },
  methods: {
    playVideoClicked() {
      this.showVideo = true
      this.selectedVideo = 'https://player.vimeo.com/video/320174122'
      this.$bus.$emit('pauseToolbarAudio')
    },
    install() {
      if (process.client) {
        const isChromium = window.chrome
        const winNav = window.navigator
        const vendorName = winNav.vendor
        const isOpera = typeof window.opr !== 'undefined'
        const isIEedge = winNav.userAgent.indexOf('Edge') > -1
        const isIOSChrome = winNav.userAgent.match('CriOS')
        const userAgent = window.navigator.userAgent.toLowerCase()

        if (
          isChromium !== null &&
          typeof isChromium !== 'undefined' &&
          vendorName === 'Google Inc.' &&
          isOpera === false &&
          isIEedge === false &&
          /android/.test(userAgent)
        ) {
          this.deferredPrompt.prompt()
          // Wait for the user to respond to the prompt
          this.deferredPrompt.userChoice.then(choiceResult => {
            this.deferredPrompt = null
          })
        } else if (isIOSChrome || /iphone|ipad|ipod/.test(userAgent)) {
          this.showIosDialog = true
        } else {
          this.showDesktopDialog = true
        }
      }
    },
    canShow: function() {
      return Utils.canShow()
    },
    isStandalone: function() {
      return Utils.isStandalone()
    },
    isOnline: function() {
      return Utils.isOnline()
    },
    isIos: function() {
      return Utils.isIos()
    },
    onShareClicked: function() {
      return Utils.onShareClicked()
    },
    checkIfIphoneX: function() {
      if (process.client) {
        const iOS =
          /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
        // Get the device pixel ratio
        const ratio = window.devicePixelRatio || 1
        // Define the users device screen dimensions
        const screen = {
          width: window.screen.width * ratio,
          height: window.screen.height * ratio
        }
        // iPhone X Detection
        if (
          (iOS && (screen.width === 1125 && screen.height === 2436)) ||
          (screen.width === 1242 && screen.height === 2688) ||
          (screen.width === 828 && screen.height === 1792) ||
          (screen.width === 2048 && screen.height === 2732) ||
          (screen.width === 2436 && screen.height === 1125) ||
          (screen.width === 2688 && screen.height === 1242) ||
          (screen.width === 1792 && screen.height === 828) ||
          (screen.width === 2732 && screen.height === 2048)
        ) {
          this.isIphoneX = true
        }
      }
    }
  }
}
</script>

<style lang="scss">
.v-overlay--active:before {
  opacity: 0.9;
}

.v-overlay:before {
  background-color: #000;
}
</style>

<style scoped lang="scss">
.group-padding {
  padding-bottom: 24px !important;
}
.bg-color {
  background: #fff;
  max-width: 31.333333%;
}
.link {
  text-decoration: none;
}
.custom-margin {
  padding-top: 5%;
  padding-bottom: 5%;
}

.vimeo-container {
  background: #eee;
  height: 100%;
  overflow: hidden;
  padding: 0;
}
.vimeo-iframe {
  box-sizing: border-box;
  height: 56.25vw;
  left: 50%;
  min-height: 100%;
  min-width: 100%;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  width: 177.77777778vh;
}
.watch-button {
  font-weight: bold;
  color: #fff;
}
.container-video #myVideo {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bg-video {
  position: relative;
  height: 100%;
  width: 100vw;
  background-size: cover;
}

.custom-icon {
  margin-right: 2px;
  margin-left: -10px;
}

.custom-btn {
  margin: 0px;
}

.home {
  background: #fff;
  color: #fff;
}

.align-vertical {
  align-items: center;
  display: flex;
}

.align-vertical-button {
  align-items: center;
}

.card-margin {
  margin-top: 70px;
}

.pwa {
  height: 17px;
  margin-bottom: -2px;
}

.bottom-single {
  position: absolute;
  bottom: 80px;
  width: 100%;
  padding-bottom: 10px;
  padding-top: 10px;
}

.bottom-group {
  position: absolute;
  bottom: 55px;
  width: 100%;
  background-color: #000;
  z-index: 2;
  padding-bottom: 10px;
  padding-top: 10px;
}

.centered {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

/* Style the button used to pause/play the video */
.myBtn {
  width: 200px;
  font-size: 18px;
  padding: 10px;
  border: none;
  background: #000;
  color: #fff;
  cursor: pointer;
}

.wrap {
  max-width: 800px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
}

.myBtn:hover {
  background: #ddd;
  color: black;
}

@media (min-width: 0px) {
  .home-title {
    height: 182px;
  }

  .group-positioning {
    position: absolute;
    bottom: 30%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    left: 0;
    right: 0;
    z-index: 1;
    display: -ms-flex;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }
  .highlight-headline {
    height: 80px;
  }
  .card-font-size {
    font-size: 1.5rem;
    color: #000;
    padding: 30px;
  }
  .container-video {
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
    display: -webkit-box;
    display: flex;
  }
  .video-content {
    position: absolute;
    top: 2%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    left: 0;
    right: 0;
    z-index: 1;
    display: -ms-flex;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }
  .page-name {
    font-size: 4rem;
  }
  .container-custom {
    padding-left: 5%;
    padding-right: 5%;
  }
  .responsive-iframe {
    height: 42vh;
  }

  .card {
    font-size: 14px;
  }

  .header-padding {
    position: absolute;
    bottom: 0;
    padding: 20px;
    width: 100%;
  }

  .home-sog {
    height: 100vh;
    position: relative;
    background: #000;
    overflow: hidden;
  }

  .main-headline {
    font-size: 35px;
    color: #fff;
    margin-top: 10vh;
    margin-right: 20px;
    margin-left: 20px;
  }

  .sub-headline {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
  }

  .page-title {
    font-size: 20px;
  }

  .positioning {
    width: 50%;
    position: absolute;
    left: 5%;
    padding-top: 150px;
    max-width: 400px;
  }
}

@media (min-width: 1025px) {
  .home-title {
    height: 20vh;
  }

  .group-positioning {
    position: absolute;
    bottom: 0%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    left: 0;
    right: 0;
    z-index: 1;
    display: -ms-flex;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }
  .highlight-headline {
    height: 100px;
  }
  .card-font-size {
    font-size: 2rem;
    color: #000;
    padding: 30px;
  }
  .container-video {
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
    display: -webkit-box;
    display: flex;
  }
  .video-content {
    position: absolute;
    bottom: 25%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    left: 0;
    right: 0;
    z-index: 1;
    display: -ms-flex;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }
  .page-name {
    font-size: 5rem;
  }
  .responsive-iframe {
    width: 40vw;
    height: 50vh;
  }

  .about-header {
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: normal;
  }

  .header-padding {
    position: absolute;
    bottom: 0;
    padding: 70px;
    width: 100%;
  }

  .card {
    font-size: 18px;
  }

  .container-custom {
    padding-left: 20%;
    padding-right: 20%;
  }

  .mission {
    margin-top: 40px;
  }

  .main-headline {
    font-size: 8vh;
    color: #fff;
    margin-top: 10vh;
  }

  .page-title {
    font-size: 25px;
  }

  .sub-headline {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
  }

  .positioning {
    width: 50%;
    position: absolute;
    left: 20%;
    padding-top: 10vh;
    max-width: 20vw;
  }

  .positioning-btn {
    width: 50%;
    position: absolute;
    left: 20%;
    padding-top: 20vh;
    max-width: 20vw;
  }
}

@media (max-width: 767px) and (orientation: portrait) {
  .home-title {
    height: 112px;
  }

  .group-positioning {
    position: absolute;
    bottom: 6%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    left: 0;
    right: 0;
    z-index: 1;
    display: -ms-flex;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }

  .highlight-headline {
    height: 60px;
  }
  .card-font-size {
    font-size: 1.2rem;
    color: #000;
    padding: 24px;
  }
  .container-video {
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
    display: -webkit-box;
    display: flex;
  }
  .video-content {
    position: absolute;
    top: 10%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    left: 0;
    right: 0;
    z-index: 1;
    display: -ms-flex;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }
  .page-name {
    font-size: 3rem;
  }
  .responsive-iframe {
    height: 32vh;
  }

  .card {
    font-size: 14px;
  }

  .header-padding {
    position: absolute;
    bottom: 0;
    padding: 20px;
    width: 100%;
  }

  .home-sog {
    height: 100vh;
    position: relative;
    background: #000;
    overflow: hidden;
  }

  .main-headline {
    font-size: 35px;
    color: #fff;

    margin-right: 20px;
    margin-left: 20px;
  }

  .sub-headline {
    display: block;
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff;
  }

  .page-title {
    font-size: 16px;
  }

  .section-headline {
    font-size: 25px;
  }

  .positioning {
    width: 50%;
    position: absolute;
    left: 0%;
    padding-top: 30%;
    max-width: 500px;
  }

  .positioning-btn {
    width: 50%;
    position: absolute;
    left: 2%;
    padding-top: 70%;
    max-width: 500px;
  }
}

.padding-section {
  padding-top: 60px;
  padding-left: 10px;
  padding-right: 10px;
}

@media (max-width: 764px) and (orientation: landscape) {
  .home-title {
    height: 50px;
  }

  .group-positioning {
    position: absolute;
    bottom: 0%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    left: 0;
    right: 0;
    z-index: 1;
    display: -ms-flex;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }

  .highlight-headline {
    height: 30px;
  }
  .card-font-size {
    font-size: 1.2rem;
    color: #000;
    padding: 24px;
  }
  .container-video {
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
    display: -webkit-box;
    display: flex;
  }
  .video-content {
    position: absolute;
    top: 10%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    left: 0;
    right: 0;
    z-index: 1;
    display: -ms-flex;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }
  .page-name {
    font-size: 3rem;
  }
  .responsive-iframe {
    width: 300px;
    height: 100px;
  }

  .card {
    font-size: 14px;
  }

  .header-padding {
    position: absolute;
    bottom: 0;
    padding: 20px;
    width: 100%;
  }

  .home-sog {
    height: 100vh;
    position: relative;
    background: #000;
    overflow: hidden;
  }

  .main-headline {
    font-size: 25px;
    color: #fff;
    margin-top: 10vh;
    margin-right: 20px;
    margin-left: 20px;
  }

  .sub-headline {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
  }

  .page-title {
    font-size: 18px;
  }

  .section-headline {
    font-size: 20px;
  }

  .positioning {
    width: 50%;
    position: absolute;
    left: 0%;
    padding-top: 30px;
    max-width: 500px;
  }
}

@media (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  .home-title {
    height: 182px;
  }

  .group-positioning {
    position: absolute;
    bottom: 5%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    left: 0;
    right: 0;
    z-index: 1;
    display: -ms-flex;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }
  .highlight-headline {
    height: 7vh;
  }
  .card-font-size {
    font-size: 1.5rem;
    color: #000;
    padding: 30px;
  }
  .container-video {
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
    display: -webkit-box;
    display: flex;
  }
  .video-content {
    position: absolute;
    top: 10%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    left: 0;
    right: 0;
    z-index: 1;
    display: -ms-flex;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }
  .page-name {
    font-size: 4rem;
  }
  .container-custom {
    padding-left: 5%;
    padding-right: 5%;
  }
  .responsive-iframe {
    height: 42vh;
  }

  .card {
    font-size: 14px;
  }

  .header-padding {
    position: absolute;
    bottom: 0;
    padding: 20px;
    width: 100%;
  }

  .home-sog {
    height: 100vh;
    position: relative;
    background: #000;
    overflow: hidden;
  }

  .main-headline {
    font-size: 6vh;
    color: #fff;
    margin-top: 10vh;
    margin-right: 20px;
    margin-left: 20px;
  }

  .sub-headline {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
  }

  .page-title {
    font-size: 20px;
  }

  .positioning {
    width: 50%;
    position: absolute;
    left: 5%;
    padding-top: 150px;
    max-width: 400px;
  }
}

@media (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .home-title {
    height: 182px;
  }

  .group-positioning {
    position: absolute;
    bottom: 0%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    left: 0;
    right: 0;
    z-index: 1;
    display: -ms-flex;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }
  .highlight-headline {
    height: 7vh;
  }
  .card-font-size {
    font-size: 1.5rem;
    color: #000;
    padding: 30px;
  }
  .container-video {
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
    display: -webkit-box;
    display: flex;
  }
  .video-content {
    position: absolute;
    top: 10%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    left: 0;
    right: 0;
    z-index: 1;
    display: -ms-flex;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }
  .page-name {
    font-size: 4rem;
  }
  .container-custom {
    padding-left: 5%;
    padding-right: 5%;
  }
  .responsive-iframe {
    height: 42vh;
  }

  .card {
    font-size: 14px;
  }

  .header-padding {
    position: absolute;
    bottom: 0;
    padding: 20px;
    width: 100%;
  }

  .home-sog {
    height: 100vh;
    position: relative;
    background: #000;
    overflow: hidden;
  }

  .main-headline {
    font-size: 7vh;
    color: #fff;
    margin-top: 10vh;
    margin-right: 20px;
    margin-left: 20px;
  }

  .sub-headline {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
  }

  .page-title {
    font-size: 20px;
  }

  .positioning {
    width: 50%;
    position: absolute;
    left: 5%;
    padding-top: 150px;
    max-width: 400px;
  }
}
</style>
