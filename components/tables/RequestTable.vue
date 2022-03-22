<template>
  <div>
    <v-data-table
      :headers="requestsHeader"
      :items="requestTableData"
      :loading="loading"
      sort-by="request_id"
      class="elevation-1"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="request_id"
      show-expand
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Requests</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="getBackendData">Update Requests</v-btn>

        </v-toolbar>
      </template>
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="green lighten-5">
          <v-row justify="end">
            <v-col cols="auto" class="font-weight-medium">
              Request:
            </v-col>
            <v-divider class="mx-4" vertical></v-divider>
            <v-col>
              {{ item.request_data }}
            </v-col>
          </v-row>
        </td>
      </template>
      <template #item.request_status="{ item }">
        <v-btn-toggle
          borderless
          dense
          mandatory
          tile
          v-model="item.request_status"
          @change="onChange(item)"
        >
          <v-btn text value="new" color="primary" :disabled="item.request_initial_status === 'processing' || item.request_initial_status === 'processed'">
            New
          </v-btn>
          <v-btn text value="processing" color="amber" :disabled="item.request_initial_status === 'processed'">
            Active
          </v-btn>
          <v-btn text value="processed" color="green">
            Finished
          </v-btn>
        </v-btn-toggle>
      </template>
      <template #item.actions="{ item }">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-icon
              class="mr-2"
              color="green"
              v-on="on"
              v-bind="attrs"
              @click="confirmItem(item)"
              :disabled="item.request_confirm"
            >
              mdi-check-circle-outline
            </v-icon>
          </template>
          <span>Confirm the request</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-icon
              color="red"
              v-on="on"
              v-bind="attrs"
              @click="deleteItem(item)"
              :disabled="item.request_confirm || $auth.user.userRole === 'manager'"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>Delete the request</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    requests: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      singleExpand: true,
      expanded: [],
      requestTableData: [],
      requestsHeader: [
        {
          text: "Name",
          value: "request_name",
          width: "15%"
        },
        {
          text: "Email",
          value: "request_email",

        },
        {
          text: "Status",
          value: "request_status",
          width: "20%"
        },
        {
          text: "Manager",
          value: "request_manager",
          width: "15%"
        },
        {
          text: "Confirmation Date",
          value: "request_date",
          width: "15%"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          width: "auto"
        },
      ],
      loading: false,
      text: ''
    }
  },
  created() {
    this.initialize(this.requests);
  },
  methods: {
    initialize(requestList) {
      for (let k of Object.keys(requestList)) {
        this.requestTableData[k] = {
          request_id: requestList[k].identifier,
          request_name: requestList[k].contactName,
          request_email: requestList[k].contactEmail,
          request_data: requestList[k].contactRequest,
          request_status: requestList[k].contactStatus,
          request_manager: requestList[k].contactStatus === 'new' ? 'No Data' : requestList[k].contactManager,
          request_date: this.dateFormat(requestList[k].contactDate),
          request_confirm: Boolean(requestList[k].contactConfirmation),
          request_initial_status: requestList[k].contactStatus,
        };
      }
    },
    dateFormat(date) {
      return format(new Date(date), 'dd MMM y')
    },
    currentStatus(data) {
      return (data.request_confirm === true || (data.request_status === data.request_initial_status))
    },
    onChange(data) {
      data.request_confirm = data.request_status === data.request_initial_status ? true : false
    },
    confirmItem(data) {
      const requestData = {
        id: data.request_id,
        data: {
          status: data.request_status,
          manager: this.$auth.user.userFirstName + ' ' + this.$auth.user.userLastName,
          confirm: true,
          date: (new Date()).toISOString()
        }
      }

      this.$store.dispatch('request/updateContact', requestData)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Contact Data has been updated!', status: 'success'}))
        .then(() => this.getBackendData())
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
    },
    deleteItem(data) {
      this.$store.dispatch('request/deleteContact', data.request_id)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Contact Data has been deleted!', status: 'success'}))
        .then(() => this.getBackendData())
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
    },
    getBackendData() {
      this.loading = true;
      this.$store.dispatch('request/fetchRequests')
        .then(response => {
          const requestData = { ...response.data }
          this.requestTableData = []
          this.initialize(requestData)
          this.loading = false
        })
    }
  }

}
</script>
