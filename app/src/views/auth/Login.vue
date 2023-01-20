<template>
  <div>
    <div>
      <v-form ref="form" v-model="valid">
        <v-text-field
          :label="$t('auth.email')"
          prepend-icon="mdi-account"
          v-model="form.email"
          required
          :rules="rules.email"
        ></v-text-field>

        <v-text-field
          :label="$t('auth.password')"
          prepend-icon="mdi-lock"
          type="password"
          v-model="form.password"
          required
          :rules="rules.password"
        ></v-text-field>

        <div class="text-center">
          <v-btn
            :loading="loading"
            color="primary"
            large
            text
            rounded
            @click="signIn()"
          >
            {{ $t("auth.sign_in") }}
          </v-btn>
        </div>
      </v-form>
    </div>

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
  </div>
</template>

<script>
import { IPC_HANDLERS, IPC_FUNCTIONS, STATUSES } from "../../modules/constants";
export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      rules: {
        password: [(v) => !!v || "Password is required"],
        email: [
          (v) => !!v || "Email is required",
          (v) =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "E-mail must be valid",
        ],
      },
      errorMessages: {},
      valid: true,
      loading: false,
      snackBar: {
        enabled: false,
        message: "",
      },
    };
  },
  methods: {
    async signIn() {
      if (this.$refs.form.validate()) {
        await window.ipc
          .invoke(IPC_HANDLERS.AUTH, {
            func: IPC_FUNCTIONS.SIGN_IN,
            data: this.form,
          })
          .then((result) => {
            console.log(result);
            if (result.status === STATUSES.ERROR) {
              this.snackBar.enabled = true;
              this.snackBar.message = result.message;
            } else {
              window.localStorage.setItem("token", result.data.token);
              this.$store.dispatch("setAuth", result.data);
              this.$router.push("/admin/dashboard");
            }
          });
      }
    },
  },
};
</script>
