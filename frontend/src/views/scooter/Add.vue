<template>
  <div>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-card style="width: 100%; max-width: 600px">
          <v-card-title class="dialog-title"> Add Scooter </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="submit"
            >
              <v-container fluid class="px-0">
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      color="primary"
                      label="Name"
                      v-model="form.name"
                      :rules="rules.name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      color="primary"
                      label="Phone Number"
                      v-model="form.phone"
                      :rules="rules.phone"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      color="primary"
                      label="Barcode"
                      v-model="form.barcode"
                      :rules="rules.barcode"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      color="primary"
                      label="Model"
                      v-model="form.model"
                      :rules="rules.model"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      color="primary"
                      label="TERMEN APROXIMATIV"
                      v-model="form.termen"
                      :rules="rules.termen"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      color="primary"
                      label="Problem"
                      :rows="3"
                      v-model="form.problem"
                      :rules="rules.problem"
                      required
                    >
                    </v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      color="primary"
                      label="Price"
                      v-model="form.price"
                      :rules="rules.price"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions class="dialog-actions">
            <v-spacer></v-spacer>
            <v-btn color="error" small @click="handleClose"> Reset </v-btn>
            <v-btn color="primary" small @click="addScooter"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackBar.enabled"
      timeout="3000"
      :color="snackBar.type"
      top
      right
    >
      {{ snackBar.message }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "AddScooter",
  components: {},
  data() {
    return {
      form: {
        name: "",
        phone: "",
        barcode: "",
        model: "",
        termen: "",
        problem: "",
        price: "",
      },
      rules: {
        name: [(v) => !!v || "Name is required"],
        phone: [(v) => !!v || "Phone Number is required"],
        barcode: [
          (v) => !!v || "Barcode is required",
          (v) => Number.isInteger(Number(v)) || "Barcode must be a number",
        ],
        model: [(v) => !!v || "Model is required"],
        termen: [(v) => !!v || "TERMEN APROXIMATIV is required"],
        problem: [(v) => !!v || "Problem is required"],
        price: [(v) => Number.isInteger(Number(v)) || "Price must be a number"],
      },
      valid: true,

      snackBar: {
        type: "default",
        enabled: false,
        message: "",
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.$emit("close");
      this.$refs.form.resetValidation();
    },
    handleSubmit() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        this.$emit("submit", this.form);
        this.$refs.form.resetValidation();
      }
    },
    addScooter() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        this.$http
          .post("scooter", this.form)
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              this.snackBar.type = "success";
              this.snackBar.enabled = true;
              this.snackBar.message = "Successfully Create Scooter";
              this.$router.push({
                path: `/admin/scooter/edit/${response.data.id}`,
              });
            }
          })
          .catch((error) => {
            this.snackBar.type = "error";
            this.snackBar.enabled = true;
            this.snackBar.message = "Cannot create Scooter";
          });
      }
    },
  },
};
</script>
