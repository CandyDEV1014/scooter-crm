<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
    <v-text-field
      color="primary"
      label="Email"
      disabled
      v-model="form.email"
      :rules="rules.email"
      required
    ></v-text-field>
    <v-text-field
      color="primary"
      label="Name"
      v-model="form.name"
      required
    ></v-text-field>
    <v-btn
      class="mt-3"
      color="primary"
      :loading="loading"
      @click.native="handleUpdate"
    >
      <v-icon left dark>mdi-check</v-icon>
      Save Changes
    </v-btn>
    <v-snackbar v-model="snackBar.enabled" timeout="3000">
      {{ snackBar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackBar.enabled = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>

<script>
export default {
  name: "ProfileForm",
  components: {},
  data() {
    return {
      form: {
        name: this.$store.state.auth.user.name,
        email: this.$store.state.auth.user.email,
      },
      rules: {
        name: [(v) => !!v || "Name is required"],
        email: [
          (v) => !!v || "Email is required",
          (v) =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "E-mail must be valid",
        ],
      },
      valid: true,
      loading: false,
      snackBar: {
        enabled: false,
        message: "",
      },
    };
  },
  methods: {
    handleUpdate() {
      this.loading = true;
      this.$http
        .post("user/updateProfile", this.form)
        .then((response) => {
          if (response.status === 200) {
            this.loading = false;
            const auth = this.$store.state.auth;
            auth.user.name = this.form.name;
            this.$store.dispatch("setAuth", auth);

            this.snackBar.enabled = true;
            this.snackBar.message = "Successfully updated the profile";
          }
        })
        .catch((error) => {
          console.log(error);
          this.snackBar.enabled = true;
          this.snackBar.message = "Cannot update profile";
        });
    },
  },
};
</script>
