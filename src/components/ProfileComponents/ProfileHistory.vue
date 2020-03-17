<template>
  <v-container>
    <v-sheet
      class="transparent"
      light
      v-if="$vuetify.breakpoint.mdAndUp"
      flat
      width="100%"
    >
      <v-card-title class="font-weight-bold title  pb-5"
        >Viewing history</v-card-title
      >
      <v-slide-group>
        <v-slide-item
          class="mx-3"
          v-for="stream in viewingHistory"
          :key="stream._id"
          :id="stream._id"
        >
          <Thumbnail type="history" :stream="stream" />
        </v-slide-item>
      </v-slide-group>

      <v-card-title class="font-weight-bold title pt-10 pb-5"
        >Previous streams</v-card-title
      >
      <v-slide-group>
        <v-slide-item
          class="mx-3"
          v-for="stream in previousStreams"
          :key="stream._id"
          :id="stream._id"
        >
          <Thumbnail type="history" :stream="stream" />
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

    <v-sheet light class="transparent" v-else>
      <v-card-title class="font-weight-bold title pt-10 pb-5"
        >Viewing history</v-card-title
      >
      <v-slide-group>
        <v-slide-item
          class="mx-3"
          v-for="stream in viewingHistory"
          :key="stream._id"
          :id="stream._id"
        >
          <Thumbnail type="history" :stream="stream" />
        </v-slide-item>
      </v-slide-group>

      <v-card-title class="font-weight-bold title pt-10 pb-5"
        >Previous streams</v-card-title
      >
      <v-slide-group>
        <v-slide-item
          class="mx-3"
          v-for="stream in previousStreams"
          :key="stream._id"
        >
          <Thumbnail type="history" :stream="stream" />
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<script>
import Thumbnail from "../Reusables/Thumbnail";

export default {
  components: {
    Thumbnail
  },
  data: () => ({
    user: {},
    tab: null,
    previousStreams: [],
    viewingHistory: []
  }),
  mounted() {
    this.user = this.$store.getters.user;
    (this.previousStreams = this.user.history.filter(
      x => x.action === "Started a stream"
    )).reverse(),
      (this.viewingHistory = this.user.history.filter(
        x => x.action === "Joined a stream"
      )).reverse();
  }
};
</script>

<style></style>
