<template>
  <div>
    <v-data-table
      :headers="usersHeader"
      :items="userTableData"
      :loading="loading"
      sort-by="user_id"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar flat>
            <v-toolbar-title>Users in System</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialogAddItem" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                  Add User
                </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class="text-h5">New User</span>
                </v-card-title>
                <v-card-text>

                  <user-item-create
                    @valid="validationForm"
                    @newUserFirstName="setNewFirstName"
                    @newUserLastName="setNewLastName"
                    @newUserRole="setNewRole"
                    @newUserEmail="setNewEmail"
                  ></user-item-create>

                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="close">Cancel</v-btn>
                  <v-btn color="red darken-1" text @click="save" :disabled="!formValid">Save</v-btn>
                </v-card-actions>

              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDeleteItem" max-width="500px">
              <v-card>
                <v-card-title class="text-h6"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
      </template>

      <template #item.user_role="{ item }">
        <v-edit-dialog
          :return-value.sync="item.user_role"
          large
          @save="saveRole(item)"
        >
          <v-chip
            color="primary"
            class="ma-2"
            text-color="white"
            label
          >
            <v-icon
              dark
              left
              small
            >
              mdi-tag
            </v-icon>
              {{ item.user_role }}
          </v-chip>

          <template #input>
            <v-radio-group v-model="item.user_role" row>
              <v-radio
                label="Regular"
                value="regular"
              ></v-radio>
              <v-radio
                label="Editor"
                value="editor"
              ></v-radio>
              <v-radio
                label="Manager"
                value="manager"
              ></v-radio>
            </v-radio-group>
          </template>
        </v-edit-dialog>
      </template>

      <template #item.user_verified="{ item }">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
              <v-icon
                :color="item.user_verified.color"
                v-on="on"
                v-bind="attrs"
              >
                {{ item.user_verified.icon }}
              </v-icon>
            </template>
            <span>{{ item.user_verified.text }}</span>
        </v-tooltip>
      </template>

      <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon
                @click="deleteItem(item)"
                color="red"
                v-on="on"
                v-bind="attrs"
              >
                mdi-delete
              </v-icon>
            </template>
            <span>Delete Entry</span>
          </v-tooltip>


        </template>

    </v-data-table>

    <v-snackbar
      v-model="roleChange"
      :timeout="3000"
      :color="roleChangeColor"
    >
      {{ roleChangeText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          text
          @click="roleChange = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>

<script>
import UserItemCreate from '@/components/UI/UserItemCreate.vue'

export default {
  components: { UserItemCreate },
  props: {
    users: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      roleChange: false,
      roleChangeColor: '',
      roleChangeText: '',
      userTableData: [],
      usersHeader: [
        {
          text: "First Name",
          value: "user_first_name",
        },
        {
          text: "Last Name",
          value: "user_last_name",
        },
        {
          text: "Role",
          value: "user_role",
        },
        {
          text: "Email",
          value: "user_email",
          width: "30%"
        },
        {
          text: "Verified Email",
          value: "user_verified",
          width: "150"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          width: "100"
        },
      ],
      loading: false,
      editedIndex: -1,
      dialogAddItem: false, // Visbility of AddItem Dialog
      dialogDeleteItem: false, // Visibility of DeleteItem Dialog
      formValid: false,
      newFirstName: '',
      newLastName: '',
      newEmail: '',
      newRole: ''
    }
  },
  created() {
    this.initialize(this.users)
  },
  methods: {
    saveRole(data) {
      const userData = {
        id: data.user_id,
        data: {
          first_name: data.user_first_name,
          last_name: data.user_last_name,
          email: data.user_email,
          role: data.user_role
        }
      }

      this.$store.dispatch('user/updateUser', userData)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The user has been updated!', status: 'success'}))
        .catch(e => {
          this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'})
        })
    },
    initialize(userList) {
      for (let k of Object.keys(userList)) {
        this.userTableData[k] = {
          user_id: userList[k].identifier,
          user_first_name: userList[k].userFirstName,
          user_last_name: userList[k].userLastName,
          user_role: userList[k].userRole,
          user_email: userList[k].userEmail,
          user_verified: userList[k].verifiedAt ?
            { color: 'success', icon: 'mdi-check-circle-outline', text: 'Email is verified!' } :
            { color: 'red lighten-4', icon: 'mdi-close', text: 'Email is not verified!' }
        };
      }
      this.userTableData = this.userTableData.filter(item => item.user_role !== "admin")
    },
    deleteItem(item) {
      this.editedIndex = item.user_id
      this.dialogDeleteItem = true
    },
    validationForm(val) {
      this.formValid = val
    },
    setNewFirstName(data) {
      this.newFirstName = data
    },
    setNewLastName(data) {
      this.newLastName = data
    },
    setNewEmail(data) {
      this.newEmail = data
    },
    setNewRole(data) {
      this.newRole = data
    },
    close() {
      this.dialogAddItem = false;
    },
    save() {
      const userData = {
        first_name: this.newFirstName,
        last_name: this.newLastName,
        email: this.newEmail,
        role: this.newRole
      }
      this.$store.dispatch('user/createUser', userData)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The user has been created!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
        .then(() => this.close())

      this.getBackendData()
    },
    closeDelete() {
      this.dialogDeleteItem = false;
    },
    deleteItemConfirm() {
      this.$store.dispatch('user/deleteUser', this.editedIndex)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The user has been deleted!', status: 'success'}))
        .then(() => this.closeDelete())
        .catch(e => {
          this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'})
        })

      this.getBackendData();
    },
    getBackendData() {
      this.loading = true;
      this.$store.dispatch('user/getUsers')
        .then(response => {
          const usersData = { ...response.data }
          this.userTableData = []
          this.initialize(usersData)
          this.loading = false
        })
    }

  }
}
</script>
