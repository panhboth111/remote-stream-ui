<template>
  <v-container class="px-12">
    <v-form ref="form" @submit.prevent="register()" v-model="valid">
      <v-text-field
        label="Username"
        :rules="[v => !!v || 'Username is required']"
        v-model="register_username"
      ></v-text-field>
      <v-text-field
        label="Email"
        :rules="[
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ]"
        v-model="register_email"
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="register_password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        :rules="[v => !!v || 'Password is required']"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-checkbox
        color="primary"
        v-model="register_checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="I agree with the Terms and Conditions."
        required
        class="mb-5 mt-6"
      ></v-checkbox>

      <v-btn color="primary" dark block height="50" @click="register()"
        >Register</v-btn
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
      loading: false,
      register_checkbox: false,
      register_username: "",
      register_email: "",
      register_password: "",
      showPassword: false,
      dialog: false,
      message: ""
    };
  },
  methods: {
    async login() {
      await backend.login(this.username, this.password);
    },
    async register() {
      this.loading = true;
      const user = await backend.signUp(
        this.register_email,
        this.register_password,
        this.register_username
      );
      const { message, errCode } = user.data;
      this.loading = false;
      if (errCode) {
        this.message = message;
        this.dialog = true;
      } else {
        this.username = this.register_email;
        this.password = this.register_password;
        this.login();
      }
    }
  }
};
</script>

<style></style>
