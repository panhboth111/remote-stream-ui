<template>
  <v-navigation-drawer class="secondary" v-model="navDrawer" app clipped>
    <template v-slot:prepend>
      <v-card class="d-flex flex-column text-center pa-5 transparent" flat>
        <v-card-text class="">
          <v-avatar size="62">
            <img :src="user.profilePic" :alt="user.name" />
          </v-avatar>
        </v-card-text>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle class="caption text-uppercase">{{
              user.role
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <v-divider></v-divider>
      <v-list dense class="mt-5 text-center">
        <v-list-item-group v-model="item" color="primary">
          <v-list-item router to="/home">
            <v-list-item-content>
              <v-list-item-title v-text="'Home'"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item router to="/profile">
            <v-list-item-content>
              <v-list-item-title v-text="'Profile'"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item router to="/devices" v-if="user.role !== 'Student'">
            <v-list-item-content>
              <v-list-item-title v-text="'Device Manager'"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            router
            to="/user-management"
            v-if="user.role === 'Admin'"
          >
            <v-list-item-content>
              <v-list-item-title v-text="'User Management'"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            router
            to="/stream-management"
            v-if="user.role === 'Admin'"
          >
            <v-list-item-content>
              <v-list-item-title
                v-text="'Stream Management'"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    items: [
      { text: "Home", route: "/home" },
      { text: "Device Manager", route: "/devices" },
      { text: "User", route: "/user-management" }
    ],
    user: {}
  }),
  methods: {
    async getUser() {
      this.user = await this.$store.getters.user;
    }
  },
  computed: {
    ...mapState(["user", "navDrawer"])
  },
  created() {
    this.getUser();
  }
};
</script>

<style></style>
