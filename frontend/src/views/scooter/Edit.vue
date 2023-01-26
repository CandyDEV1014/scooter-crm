<template>
  <div>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-card style="width: 100%; max-width: 600px">
          <v-card-title class="dialog-title"> Edit Scooter </v-card-title>
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
                    <v-textarea
                      color="primary"
                      label="Content"
                      :rows="3"
                      v-model="form.content"
                    >
                    </v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      color="primary"
                      label="Price"
                      v-model="form.price"
                      :rules="rules.price"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      color="primary"
                      label="Status"
                      placeholder="Select a Status"
                      :items="status"
                      v-model="form.statusId"
                      item-text="title"
                      item-value="id"
                      :rules="rules.status"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <div class="signature-wrapper" v-if="form.signature">
                      <span class="text-caption">Signature</span>
                      <div class="signature-img">
                        <v-btn
                          x-small
                          icon
                          color="white"
                          class="close-btn"
                          style="background: #ff5252"
                          @click="removeSignature()"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-img
                          :src="signature"
                          alt="signature"
                          max-height="150"
                          max-width="120"
                        ></v-img>
                      </div>
                    </div>
                    <vuetify-upload
                      v-else
                      :max="1"
                      can-delete
                      accept="image/*"
                      color="accent"
                      v-model="images"
                    ></vuetify-upload>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions class="dialog-actions">
            <v-spacer></v-spacer>
            <v-btn color="success" small @click="handlePrint">
              Print PDF
            </v-btn>
            <v-btn color="primary" small @click="updateScooter"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <VueHtml2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="false"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="download"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="100%"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <pdf-content :item="form" />
      </section>
    </VueHtml2pdf>
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
import PdfContent from "./PdfContent";
import VueHtml2pdf from "vue-html2pdf";

export default {
  name: "EditScooter",
  components: {
    PdfContent,
    VueHtml2pdf,
  },
  data() {
    return {
      form: {},
      images: [],
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
        price: [
          (v) => !!v || "Price is required",
          (v) => Number.isInteger(Number(v)) || "Price must be a number",
        ],
        status: [(v) => !!v || "Status is required"],
        imageRules: [(v) => v.length > 0 || "This image is required"],
      },
      valid: true,
      status: [
        { id: 1, title: "IN LUCRU" },
        { id: 2, title: "FINALIZAT" },
        { id: 3, title: "IESIT" },
      ],

      snackBar: {
        type: "default",
        enabled: false,
        message: "",
      },
    };
  },
  created() {},
  mounted() {
    this.getItem();
  },
  computed: {
    signature() {
      if (this.form.signature) {
        return process.env.VUE_APP_UPLOAD_BASEURL + this.form.signature;
      }
      return null;
    },
  },
  methods: {
    getItem() {
      this.$http
        .get("scooter/" + this.$route.params.id)
        .then((response) => {
          if (response.status === 200) {
            this.form = response.data.result;
          }
        })
        .catch((error) => {
          this.snackBar.type = "error";
          this.snackBar.enabled = true;
          this.snackBar.message = "Cannot get scooter item";
        });
    },
    handlePrint() {
      this.$refs.html2Pdf.generatePdf();
    },
    removeSignature() {
      this.form.signature = "";
    },
    updateScooter() {
      this.update = () => {
        this.$http
          .put("scooter", this.form)
          .then((response) => {
            if (response.status === 200) {
              this.getItem();
              this.snackBar.type = "success";
              this.snackBar.enabled = true;
              this.snackBar.message = "Successfully update Scooter";
            }
          })
          .catch((error) => {
            console.log(error);
            this.snackBar.type = "error";
            this.snackBar.enabled = true;
            this.snackBar.message = "Cannot update Scooter";
          });
      };

      const isValid = this.$refs.form.validate();
      if (isValid) {
        if (this.images.length) {
          const formData = new FormData();
          formData.append("file", this.images[0].file);
          this.$http
            .post("scooter/uploadSignature", formData, {
              headers: { "X-Requested-With": "XMLHttpRequest" },
            })
            .then((response) => {
              if (response.status === 200) {
                this.form.signature = response.data.filename;
                this.update();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.update();
        }
      }
    },
  },
};
</script>

<style scoped>
.dialog-title {
  font-size: 18px !important;
  font-weight: 500;
  line-height: 24px;
}
.dialog_actions {
  padding: 10px 16px;
}
.signature-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.signature-img {
  position: relative;
  padding: 10px;
  padding-left: 0;
}
.close-btn {
  position: absolute;
  overflow: hidden;
  z-index: 9999999;
  right: 0;
  top: 0;
}
</style>
