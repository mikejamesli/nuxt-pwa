<template>
  <v-app dark>
    <v-content>
      <nuxt />
    </v-content>
    <v-bottom-nav
      :class="[toolbarColor]"
      fixed
      :active.sync="bottomNav"
      :value="true"
      dark
    >
      <v-btn to="/news" value="news">
        <span>NEWS</span>
        <v-badge v-model="show" color="red">
          <span v-if="newPostCount > 0" slot="badge">{{ newPostCount }}</span>
          <v-icon>announcement</v-icon>
        </v-badge>
      </v-btn>
      <v-btn to="/workouts" value="music">
        <span>WORKOUTS</span>
        <v-icon>fitness_center</v-icon>
      </v-btn>
      <v-btn to="/channel" value="channel">
        <span>TANYA TV</span>
        <v-icon>ondemand_video</v-icon>
      </v-btn>
      <v-btn value="contact" @click="openNavDrawer()">
        <span>MORE</span>
        <v-icon>more_horiz</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      showFullAudio: false,
      floatingVideo: false,
      episode: null,
      navPadding: 'nav-padding',
      toolbarColor: 'toolbar-color',
      audioView: 'margin-nav',
      show: true,
      bottomNav: 'news',
      prevHeight: 0,
      hydrated: false,
      aboutPage: null,
      cvPage: null,
      companyPage: null,
      privacy: false,
      deployedTimeout: 600000,
      newPostCount: 0,
      newsTypeList: [],
      audioPlayer: false,
      audioSource: '',
      isIphoneX: false,
      player: null,
      playing: true,
      audioLoaded: false,
      musicDialog: false
    }
  }
}
</script>
