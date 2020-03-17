<template>
  <v-container class="py-12">
    <v-card
      class="transparent"
      flat
      v-if="user.role === 'Admin' || user.role === 'Lecturer'"
    >
      <v-card-title class="title font-weight-bold">
        Device Management
      </v-card-title>
      <DeviceCard
        v-for="device in devices"
        :device="device"
        :key="device.deviceId"
      />
    </v-card>
    <v-card class="text-center transparent" flat v-else>
      <h1 class="title font-weight-bold">Unauthorized access</h1>
      <p>This route is for <strong>Admininstrators</strong> only.</p>
    </v-card>
  </v-container>
</template>

<script>
import DeviceCard from "../components/DevicesComponents/DeviceCard";

export default {
  name: "device-manager",
  components: {
    DeviceCard
  },
  data() {
    return {
      devices: []
    };
  },
  methods: {
    getDevices() {
      this.socket.on("info", device_info => {
        this.devices = device_info;
        console.log(this.devices);
      });
    }
  },
  created() {
    this.getDevices();
    this.socket.emit("here", "hiii");
  },
  // mounted() {
  //   this.getDevices();
  // },
  props: {
    user: Object
  }
};
</script>
