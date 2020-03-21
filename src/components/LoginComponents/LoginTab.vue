<template>
  <v-container class="px-12">
    <v-form ref="form" @submit.prevent="login()" v-model="valid">
      <v-text-field
        id="usernameInput"
        label="E-mail"
        v-model="username"
        :rules="[
          v => !!v || '',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ]"
      ></v-text-field>
      <v-text-field
        id="passwordInput"
        label="Password"
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        :rules="[v => !!v || '']"
      ></v-text-field>

      <v-checkbox
        color="primary"
        v-model="login_checkbox"
        label="Remember my password"
        required
        class="mb-5 mt-6"
      ></v-checkbox>

      <v-btn
        id="loginBtn"
        color="primary"
        dark
        block
        height="50"
        @click="login()"
        >Login</v-btn
      >
    </v-form>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog max-width="400" v-model="dialog">
      <v-card>
        <v-card-title>Alert</v-card-title>
        <v-card-text class="text-center font-weight-bold">
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="dialog = false">
            <v-icon left>mdi-close</v-icon>
            Close
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import backend from "../../Service";

export default {
  data() {
    return {
      valid: false,
      login_checkbox: true,
      showPassword: false,
      password: "",
      username: "",
      message: "",
      dialog: false,
      loading: false
    };
  },
  methods: {
    async login() {
      this.loading = true;
      if (this.valid) {
        const log = await backend.login(this.username, this.password);
        this.message = log;
      } else {
        this.message = "Invalid credentials";
      }
      this.loading = false;
      this.dialog = true;
    }
  }
};
</script>

<style></style>
