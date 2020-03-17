<template>
  <v-sheet class="ma-1">
    <v-card
      v-if="type === 'large'"
      width="800px"
      height="230px"
      :to="`/stream/${stream.id}`"
      :ref="`${stream.title}`"
      @click="myClickEvent"
    >
      <v-row align="center" no-gutters>
        <v-col cols="6">
          <v-card width="100%" flat>
            <v-img height="230px" :src="stream.thumbnail"></v-img>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="transparent px-2" flat>
            <v-card class="transparent px-5 title font-weight-bold" flat>
              {{ stream.title }}
            </v-card>
            <v-card class="transparent px-1" flat>
              <v-list two-line>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img :src="stream.profile"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ stream.author }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="overline">
                      {{ stream.isPrivate ? "Public" : "Private" }}
                      STREAM
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
            <v-card-actions class="transparent px-5 overline" flat>
              {{ formatDate(stream.date) }}
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-if="type === 'small'" max-width="600px" height="190px" lg="3">
      <v-row align="center" no-gutters>
        <v-col cols="6">
          <v-card width="100%" flat>
            <v-img height="190px" :src="stream.thumbnail"></v-img>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="transparent px-2" flat>
            <v-card class="transparent px-5 subtitle-1 font-weight-bold" flat>
              {{ stream.title }}
            </v-card>
            <v-card class="transparent px-1" flat>
              <v-list two-line>
                <v-list-item>
                  <v-list-item-avatar size="35">
                    <v-img :src="stream.profile"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="subtitle-2">
                      {{ stream.author }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="caption text-uppercase">
                      {{ stream.isPrivate ? "Private" : "Public" }}
                      STREAM
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
            <v-card-actions class="transparent px-5 overline" flat>
              {{ formatDate(stream.date) }}
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-if="type === 'history'" width="324px" dark :id="stream._id">
      <v-img
        :src="stream.stream.thumbnail"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="160px"
      >
        <v-card class="transparent py-2">
          <v-card class="transparent px-5 subtitle-1 font-weight-bold" flat>
            {{ stream.stream.streamTitle }}
          </v-card>
          <v-card class="transparent px-5 caption font-weight-bold" flat>
            {{ stream.action }}
          </v-card>
        </v-card>
      </v-img>
    </v-card>
    <v-card v-if="type === 'mobile'" dark>
      <v-img
        :src="stream.thumbnail"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="160px"
      >
        <v-card class="transparent py-2">
          <v-card class="transparent px-5 subtitle-1 font-weight-bold" flat>
            {{ stream.title }}
          </v-card>
          <v-card class="transparent px-5 caption font-weight-bold" flat>
            {{ stream.author }}
          </v-card>
        </v-card>
      </v-img>
    </v-card>
  </v-sheet>
</template>

<script>
import moment from "moment";

export default {
  methods: {
    formatDate(date) {
      return moment(date).format("LL");
    }
  },
  props: {
    stream: Object,
    type: String
  }
};
</script>

<style></style>
