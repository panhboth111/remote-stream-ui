<template>
  <v-container>
    <h1 class="display-1 my-4">Profile</h1>
    <v-divider></v-divider>
    <v-row class="my-4">
      <v-col cols="4">
        <p class="headline">Account</p>
        <v-card class="mx-auto my-4" justify-center height="370px">
          <v-btn absolute small right class="mt-2 coverPicBtn" @click="uploadCoverPic">
            <div id="uploadText" style="display: none">Upload Cover</div>
            <v-icon @mouseover="showUploadText" @mouseout="hideUploadText">mdi-upload</v-icon>
          </v-btn>
          <input
            type="file"
            accept="image/*"
            ref="coverPicInput"
            @change="onCoverPicPicked"
            style="display:none"
          />
          <v-img
            :src="user.coverPic"
            alt="NO IMG"
            class="align-end align-right"
            height="200px"
            @click="showCoverPic = true"
          ></v-img>

          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-divider></v-divider>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                absolute
                right
                v-on="on"
                class="editProfileBtn ma-2"
                @click="editProfileDialog = true"
              >
                <v-icon>mdi-settings</v-icon>
              </v-btn>
            </template>
            <span>Change your password</span>
          </v-tooltip>

          <div class="profileInfo">
            <v-avatar size="130" class="profilePic mb-2">
              <v-avatar size="120" class @click="showProfilePic = true">
                <img :src="user.profilePic" />
              </v-avatar>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    absolute
                    right
                    fab
                    small
                    v-on="on"
                    class="profilePicBtn"
                    @click="uploadProfilePic"
                  >
                    <v-icon>mdi-camera</v-icon>
                  </v-btn>
                </template>
                <span>Change Profile Picture</span>
              </v-tooltip>
              <input
                type="file"
                accept="image/*"
                ref="profilePicInput"
                @change="onProfilePicPicked"
                style="display:none"
              />
            </v-avatar>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <p class="headline" v-on="on" @click="editUsernameDialog = true">{{ user.name }}</p>
              </template>
              <span>Change username</span>
            </v-tooltip>
            <p class="caption">{{ user.role }}</p>
          </div>
        </v-card>
      </v-col>

      <v-col offset="1" cols="7">
        <p class="headline">Streams</p>
        <p class="title font-regular my-4">Your History</p>
        <v-row>
          <v-col v-for="(stream, i) in user.history" :key="i" :lg="6" :md="12">
            <v-card dark @click="myClickEvent">
              <v-img :src="coverPicURL" class="white--text align-end" height="240px" alt="pic">
                <v-card-title v-text="stream.streamTitle"></v-card-title>
                <v-card-subtitle v-text="stream.action"></v-card-subtitle>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="showCoverPic" width="1000px">
      <v-card>
        <v-container>
          <v-img :src="user.coverPic"></v-img>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showProfilePic" width="1000px">
      <v-card>
        <v-container>
          <v-img :src="user.profilePic"></v-img>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editProfileDialog" width="600px">
      <v-card>
        <v-card-title>Change your password</v-card-title>
        <v-card-text>
          <v-text class="red--text">{{errorMsg}}</v-text>
          <v-text-field
            label="Current password"
            type="password"
            append-icon="mdi-key"
            v-model="currentPassword"
          ></v-text-field>
          <v-text-field
            type="password"
            label="New password"
            append-icon="mdi-key"
            v-model="newPassword"
          ></v-text-field>
          <v-text-field
            type="password"
            label="Confirm password"
            append-icon="mdi-key"
            v-model="confirmPassword"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="editProfileDialog = false">Cancel</v-btn>
          <v-btn text @click="saveCredentials">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editUsernameDialog" width="600px">
      <v-card>
        <v-card-title>Change your username</v-card-title>
        <v-card-text>
          <v-text-field label="Username" append-icon="mdi-account" v-model="newName"></v-text-field>
          <v-text-field type="password" label="Password" append-icon="mdi-key" v-model="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="editUsernameDialog = false,newName = user.name">Cancel</v-btn>
          <v-btn text @click="saveUser">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// import { mapState } from "vuex";
import backend from "../Service";
export default {
  data() {
    return {
      //user: mapState,
      user: {},
      name: "Name",
      role: "Role",
      coverPicURL: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
      profilePicURL: "https://cdn.vuetifyjs.com/images/john.jpg",
      showCoverPic: false,
      showProfilePic: false,
      editProfileDialog: false,
      editUsernameDialog: false,
      changePassword: false,
      password: "",
      newName: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      errorMsg: "",
      streams: [],
      editCredentials: false
    };
  },
  methods: {
    showUploadText() {
      document.getElementById("uploadText").style.display = "block";
    },
    hideUploadText() {
      document.getElementById("uploadText").style.display = "none";
    },
    getUser() {
      this.user = this.$store.getters.user;
    },
    uploadCoverPic() {
      this.$refs.coverPicInput.click();
    },
    uploadProfilePic() {
      this.$refs.profilePicInput.click();
    },
    async onCoverPicPicked(event) {
      const files = event.target.files;
      const selectedFile = files[0];

      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);

      fileReader.addEventListener("load", async () => {
        const temp = fileReader.result;
        const response = await backend.changeCover(temp);
        alert(response.message);
        location.reload();
      });
    },
    async onProfilePicPicked(event) {
      const files = event.target.files;
      const selectedFile = files[0];

      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);

      fileReader.addEventListener("load", async () => {
        const temp = fileReader.result;
        const response = await backend.changeProfile(temp);
        alert(response.message);
        location.reload();
      });
    },
    async saveCredentials() {
      if (this.currentPassword == "") {
        this.errorMsg = "*Please Enter Your Current Password";
      } else if (this.newPassword == "") {
        this.errorMsg = "*Please Enter Your New Password";
      } else if (this.newPassword != this.confirmPassword) {
        this.errorMsg = "*The Passwords Do Not Match";
      } else {
        const result = await backend.changePassword(
          this.currentPassword,
          this.newPassword
        );
        alert(result.data.message);
        this.editProfileDialog = false;
        this.changePassword = false;
        this.errorMsg = "";
      }
    },
    async saveUser() {
      if (this.newName == "") {
        alert("Name can't be empty!");
      } else if (this.password == "") {
        alert("Password can't be empty");
      } else if (this.password.length < 4) {
        alert("Password are 4 or more characters long..");
      } else {
        const result = await backend.changeName(this.newName, this.password);
        alert(result.data.message);
        this.editUsernameDialog = false;
        location.reload();
      }
    }
  },
  mounted() {
    this.user = this.$store.getters.user;
  }
};
</script>

<style></style>
