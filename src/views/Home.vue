<template>
  <div class="px-8 pb-8">
    <OngoingStreams/>

    <!-- <PreviousVideos :videos="this.videos" />

    <CommunityVideos :videos="this.videos" />-->
  </div>
</template>

<script>
import io from "socket.io-client";
import OngoingStreams from "../components/HomePageComponents/OngoingStreams";
import { URL } from "../../config";
// I disabled these because it is not implemented as of right now

// import PreviousVideos from "../components/HomePageComponents/PreviousVideos";
// import CommunityVideos from "../components/HomePageComponents/CommunityVideos";

export default {
  props: {
    user: Object
  },
  components: {
    OngoingStreams
    // PreviousVideos,
    // CommunityVideos
  },
  data: () => {
    return {
      socket: io(`http://${URL}:3001`)
    };
  },
};
</script>

<style></style>
