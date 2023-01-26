<template>
  <div>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-card style="width: 100%; max-width: 600px">
          <v-card-title class="dialog-title"> View Scooter </v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="item-title">Name</td>
                    <td class="item-value">
                      {{ item.name }}
                    </td>
                  </tr>
                  <tr>
                    <td class="item-title">Phone</td>
                    <td class="item-value">{{ item.phone }}</td>
                  </tr>
                  <tr>
                    <td class="item-title">Barcode</td>
                    <td class="item-value">{{ item.barcode }}</td>
                  </tr>
                  <tr>
                    <td class="item-title">Model</td>
                    <td class="item-value">{{ item.model }}</td>
                  </tr>
                  <tr>
                    <td class="item-title">Termen</td>
                    <td class="item-value">{{ item.termen }}</td>
                  </tr>
                  <tr>
                    <td class="item-title">Problem</td>
                    <td class="item-value">{{ item.problem }}</td>
                  </tr>
                  <tr>
                    <td class="item-title">Price</td>
                    <td class="item-value">{{ item.price }}</td>
                  </tr>
                  <tr>
                    <td class="item-title">Solved</td>
                    <td class="item-value">{{ item.solved }}</td>
                  </tr>
                  <tr>
                    <td class="item-title">Price</td>
                    <td class="item-value">{{ item.price }}</td>
                  </tr>
                  <tr>
                    <td class="item-title">Status</td>
                    <td class="item-value">
                      <v-chip :color="getStatus(item.statusId).color" dark>
                        {{ getStatus(item.statusId).name }}
                      </v-chip>
                    </td>
                  </tr>
                  <tr>
                    <td class="item-title">Signature</td>
                    <td class="item-value">
                      <div v-if="item.signature">
                        <v-img
                          :src="signature"
                          alt="signature"
                          max-height="150"
                          max-width="120"
                        ></v-img>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions class="dialog-actions">
            <v-spacer></v-spacer>
            <v-btn color="success" small @click="handlePrint">
              Print PDF
            </v-btn>
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
        <pdf-content :item="item" />
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
      item: {},
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
      if (this.item.signature) {
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
            this.item = response.data.result;
          }
        })
        .catch((error) => {
          this.snackBar.type = "error";
          this.snackBar.enabled = true;
          this.snackBar.message = "Cannot get scooter item";
        });
    },
    getStatus(id) {
      switch (id) {
        case 1:
          return {
            id: 1,
            name: "NewIN LUCRU",
            color: "#4caf50",
          };

        case 2:
          return {
            id: 2,
            name: "FINALIZAT",
            color: "#1e88e5",
          };
        case 3:
          return {
            id: 3,
            name: "IESIT",
            color: "#fb8c00",
          };
        default:
          return {
            id: id,
            name: "NewIN LUCRU",
            color: "#4caf50",
          };
      }
    },
    handlePrint() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
};
</script>
