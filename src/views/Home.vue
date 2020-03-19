<template>
  <v-container class="py-12">
    <OngoingStreams />
  </v-container>

  <!-- <PreviousVideos :videos="this.videos" />

    <CommunityVideos :videos="this.videos" />-->
</template>

<script>
import io from "socket.io-client";
import OngoingStreams from "../components/HomePageComponents/OngoingStreams";
const DEVICE_SERVER = process.env.VUE_APP_DEVICE_SERVER;

// I disabled these because it is not implemented as of right now

// import PreviousVideos from "../components/HomePageComponents/PreviousVideos";
// import CommunityVideos from "../components/HomePageComponents/CommunityVideos";

export default {
  data: () => ({
    socket: io(DEVICE_SERVER),
    temp: {
      title: "Introduction to Design Patterns",
      img_url:
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      author: "Ly Chunvira",
      isPrivate: false,
      date: "10/10/2010"
    }
  }),
  props: {
    user: Object
  },
  components: {
    OngoingStreams
    // PreviousVideos,
    // CommunityVideos
  },
  methods: {
    async getUser() {
      await this.$store.dispatch(getUserInfo);
      this.user = this.$store.getters.user;
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

<style></style>
