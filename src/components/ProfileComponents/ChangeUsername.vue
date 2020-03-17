<template>
  <v-card outlined>
    <v-form v-model="valid">
      <v-card-title
        >Username
        <v-spacer></v-spacer>
        <v-switch inset v-model="enableEdit" color="primary"></v-switch>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Username"
          :rules="[v => !!v || 'Field is empty']"
          :disabled="!enableEdit"
          v-model="newName"
        ></v-text-field>
        <v-text-field
          label="Password"
          :rules="[v => !!v || 'Field is empty']"
          type="password"
          :disabled="!enableEdit"
          v-model="password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text :disabled="!valid" @click="saveUser"
          >Confirm</v-btn
        >
      </v-card-actions>
    </v-form>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="dialog" max-width="400px" persistent>
      <v-card class="text-center pb-1">
        <v-card-title class="title font-weight-bold">Alert</v-card-title>
        <v-card-text class="font-weight-bold">
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="reload">
            <v-icon left small>mdi-reload</v-icon>
            Reload</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import backend from "../../Service";

export default {
  data: () => ({
    enableEdit: false,
    newName: "",
    password: "",
    loading: false,
    valid: false,
    message: "",
    dialog: false
  }),
  methods: {
    reload() {
      location.reload();
    },
    async saveUser() {
      this.loading = true;
      if (this.newName == "") {
        alert("Name can't be empty!");
      } else if (this.password == "") {
        alert("Password can't be empty");
      } else if (this.password.length < 4) {
        alert("Password are 4 or more characters long..");
      } else {
        const result = await backend.changeName(this.newName, this.password);
        this.loading = false;
        this.message = result.data.message;
        this.enableEdit = false;
        this.dialog = true;
      }
    }
  }
};
</script>

<style></style>
