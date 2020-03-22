<template>
  <v-card flat class="transparent">
    <v-card-title
      >Ongoing streams
      <v-spacer></v-spacer>
      <v-btn text small @click="getcurrentlyStreaming(6)" outlined
        >Refresh</v-btn
      >
    </v-card-title>
    <v-sheet
      class="mx-auto transparent"
      max-width="900px"
      v-if="streams.length !== 0"
    >
      <v-slide-group>
        <v-slide-item v-for="stream in streams" :key="stream.id">
          <Thumbnail
            type="large"
            :stream="stream"
            :id="stream.id"
            v-if="$vuetify.breakpoint.mdAndUp"
          />
          <Thumbnail type="mobile" :stream="stream" v-else />
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <v-sheet
      class="d-flex flex-column justify-center align-center transparent"
      max-width="100%"
      height="244px"
      v-else
    >
      <v-img
      src="../../assets/empty.png"
      width="384px"
      class="justify-center align-center"
      >
      </v-img>
      <v-card class="transparent title font-weight-bold" flat>Uh oh!</v-card>
      <v-card class="transparent text-center" flat
        >There are no streams on at the moment...</v-card
      >
    </v-sheet>
  </v-card>
</template>

<script>
import Thumbnail from "../Reusables/Thumbnail";

import backend from "../../Service";
export default {
  data: () => {
    return {
      streams: []
    };
  },
  components: {
    Thumbnail
  },
  methods: {
    async getcurrentlyStreaming(limit) {
      const streams = await backend.getCurrentlyStreaming(limit, true);
      this.streams = [];
      if (streams.data) {
        streams.data.forEach(stream => {
          this.streams.push({
            id: stream.streamCode,
            title: stream.streamTitle,
            description: stream.description,
            isPrivate: stream.isPrivate,
            author: stream.owner.name,
            profile: stream.owner.profilePic,
            date: stream.date,
            thumbnail: stream.thumbnail
          });
        });
      }
    }
  },
  created() {
    this.getcurrentlyStreaming(6);
  }
};
</script>

<style></style>
