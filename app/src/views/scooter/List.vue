<template>
  <div>
    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          :sort-by="['id']"
          :sort-desc="true"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Scooter List</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                dark
                class="mb-2 mr-2"
                @click="onAddClick()"
              >
                Create
              </v-btn>
              <!-- <v-btn color="primary" dark class="mb-2">Import</v-btn> -->
            </v-toolbar>
            <v-row class="ma-1">
              <v-col xs="6" sm="4" md="3">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            {{ item.name }}
          </template>
          <template v-slot:[`item.createdAt`]="{ item }">
            {{
              item.createdAt ? setDateFormat(item.createdAt) : "Not Available"
            }}
          </template>
          <template v-slot:[`item.updatedAt`]="{ item }">
            {{
              item.updatedAt ? setDateFormat(item.updatedAt) : "Not Available"
            }}
          </template>
          <template v-slot:[`item.statusId`]="{ item }">
            <v-chip :color="getStatus(item.statusId).color" dark>
              {{ getStatus(item.statusId).name }}
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  color="success"
                  class="mr-2"
                  @click="onViewClick(item)"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-eye
                </v-icon>
              </template>
              <span>View</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  color="primary"
                  class="mr-2"
                  @click="onEditClick(item.id)"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-pencil
                </v-icon>
              </template>
              <span>Edit</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  color="red"
                  class="mr-2"
                  @click="onDeleteClick(item)"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-delete
                </v-icon>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
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
    <add-dialog
      v-model="addDialog"
      @close="addDialog = false"
      @submit="addScooter"
    />
    <view-dialog
      v-model="viewDialog"
      :selected-item="selectedViewItem"
      @close="viewDialog = false"
    />
    <edit-dialog
      v-model="editDialog"
      :selected-item="selectedEditItem"
      :return-value.sync="selectedEditItem"
      @close="editDialog = false"
      @submit="updateScooter"
    />
    <delete-dialog
      v-model="deleteDialog"
      @cancel="deleteDialog = false"
      @confirm="deleteScooter"
    />
  </div>
</template>

<script>
import AddDialog from "./AddDialog.vue";
import ViewDialog from "./ViewDialog.vue";
import EditDialog from "./EditDialog.vue";
import DeleteDialog from "./DeleteDialog.vue";

import dayjs from "dayjs";

import { IPC_HANDLERS, IPC_FUNCTIONS, STATUSES } from "../../modules/constants";

export default {
  name: "ScooterList",
  components: {
    AddDialog,
    ViewDialog,
    EditDialog,
    DeleteDialog,
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Phone", value: "phone" },
        { text: "Barcode", value: "barcode" },
        { text: "Model", value: "model" },
        { text: "Termen", value: "termen" },
        { text: "Problem", value: "problem" },
        { text: "Price", value: "price" },
        { text: "Created Date", value: "createdAt" },
        { text: "Updated Date", value: "updatedAt" },
        { text: "Status", value: "statusId", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      pagination: { sortBy: "requested", descending: true, rowsPerPage: 10 },
      items: [],

      snackBar: {
        enabled: false,
        message: "",
      },

      addDialog: false,
      viewDialog: false,
      editDialog: false,
      deleteDialog: false,

      selectedViewItem: {},
      selectedEditItem: {},
      selectedDeleteItem: {},
    };
  },
  created() {
    this.getScooterList();
  },
  mounted() {
    window.ipc.on("DATA_CHANGE", () => {
      this.getScooterList();
    });
  },
  methods: {
    getValue(resource, key) {
      return get(resource, key);
    },
    onSearchInput() {
      this.getScooterList();
    },
    setDateFormat(date) {
      return dayjs(date).format("DD/MM/YYYY");
    },
    async getScooterList() {
      await window.ipc
        .invoke(IPC_HANDLERS.DATABASE, {
          func: IPC_FUNCTIONS.GET_SCOOTER_LIST,
        })
        .then((result) => {
          this.items = result;
        });
    },
    getStatus(id) {
      switch (id) {
        case 1:
          return {
            id: 1,
            name: "NewIN LUCRU",
            color: "#1e88e5",
          };

        case 2:
          return {
            id: 2,
            name: "FINALIZAT",
            color: "#4caf50",
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
            color: "#1e88e5",
          };
      }
    },
    onAddClick() {
      this.addDialog = true;
    },
    onViewClick(item) {
      this.selectedViewItem = item;
      this.viewDialog = true;
    },
    onEditClick(id) {
      // this.selectedEditItem = this.items.filter((item) => item.id === id)[0];
      // console.log(this.selectedEditItem);
      this.items.map((item) => {
        if (item.id === id) {
          this.selectedEditItem = item;
        }
      });
      this.editDialog = true;
    },
    onDeleteClick(item) {
      this.selectedDeleteItem = item;
      this.deleteDialog = true;
    },
    async addScooter(form) {
      const data = {
        id: Date.now(),
        ...form,
        content: "",
        statusId: 1,
        createdAt: dayjs().format(),
        updatedAt: dayjs().format(),
      };
      this.items.push(data);
      await window.ipc
        .invoke(IPC_HANDLERS.DATABASE, {
          func: IPC_FUNCTIONS.ADD_SCOOTER,
          data: data,
        })
        .then(() => {
          this.addDialog = false;
        });
    },
    async updateScooter(form) {
      this.items = this.items.map((item) => {
        let temp = Object.assign({}, item);
        if (temp.id === form.id) {
          temp = form;
        }
        return temp;
      });
      await window.ipc
        .invoke(IPC_HANDLERS.DATABASE, {
          func: IPC_FUNCTIONS.UPDATE_SCOOTER,
          data: form,
        })
        .then(() => {
          this.editDialog = false;
        });
    },
    async deleteScooter() {
      this.items = this.items.filter(
        (item) => item.id !== this.selectedDeleteItem.id
      );
      await window.ipc
        .invoke(IPC_HANDLERS.DATABASE, {
          func: IPC_FUNCTIONS.DELETE_SCOOTER,
          data: this.selectedDeleteItem,
        })
        .then(() => {
          this.deleteDialog = false;
        });
    },
  },
};
</script>
