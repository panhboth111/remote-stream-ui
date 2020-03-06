<template>
  <v-app-bar class="primary pr-2" dark flat app clipped-left>
    <v-app-bar-nav-icon
      @click="$store.state.navDrawer = !$store.state.navDrawer"
      id="drawerBtn"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="text-uppercase">
      <router-link
        to="/home"
        exact
        class="white--text"
        style="text-decoration: none"
      >
        <span class=" title">Class</span>
        <span class="font-weight-bold title">Time</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <span v-if="$vuetify.breakpoint.mdAndUp">
      <v-btn
        outlined
        v-if="user.isStreaming"
        class="red"
        id="stopStreamBtn"
        @click="stopStream()"
      >
        <v-icon left>mdi-record</v-icon>Stop Stream
      </v-btn>
      <StartStream v-else :user="user" />
    </span>

    <v-btn icon class="ml-4">
      <v-icon @click="signout()">mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import StartStream from "../components/NavbarComponents/StartStream";
import auth from "../auth";
import backend from "../Service";
import io from "socket.io-client";
import { URL } from "../../config";
import { mapState } from "vuex";

export default {
  data: () => {
    return {
      socket: io(`${URL}:3001`),
      socket2: io(`${URL}:3000`),
      item: 1,
      items: [
        { text: "Home", route: "/home" },
        { text: "Device Manager", route: "/devices" },
        { text: "User", route: "/user-management" }
      ],
      user: {}
    };
  },
  props: {},
  methods: {
    async getUser() {
      this.user = await this.$store.getters.user;
    },
    computed: {
      ...mapState(["user"])
    },
    signout() {
      backend.logout();
      auth();
    },
    async stopStream() {
      // this.socket.emit("stop", this.user.email);
      await backend.stopStream();
      await setTimeout(() => {
        this.socket2.emit(
          "streamStop",
          window.location.href.split("stream/")[1]
        );
        window.location.replace("/home");
      }, 1000);
    }
  },
  // computed: {
  //   ...mapState(['user'])
  // },
  components: {
    StartStream
  },
  created() {
    this.getUser();
    console.log(this.$route);
    this.socket2.on("stopStream", streamCode => {
      console.log(streamCode);
      //alert(`${window.location.href.split("stream/")[1]} vs ${streamCode}`);
      if (window.location.href.split("stream/")[1] == streamCode)
        window.location.replace("/home");
    });
  }
};
</script>
