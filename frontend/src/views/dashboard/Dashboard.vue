<template>
  <div class="wrapper">
    <v-btn color="primary" dark class="mb-2 mr-2" to="/admin/scooter/add">
      Add Scooter
    </v-btn>
    <v-row>
      <v-col xs="12" sm="12" md="6">
        <work-list />
      </v-col>
      <v-col xs="12" sm="12" md="6">
        <completed-list />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import WorkList from "./WorkList.vue";
import CompletedList from "./CompletedList.vue";

export default {
  name: "Dashboard",
  components: {
    WorkList,
    CompletedList,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.dialog-title {
  font-size: 18px !important;
  font-weight: 500;
  line-height: 24px;
}
</style>
