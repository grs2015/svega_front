<template>
  <v-form ref="userForm" v-model="validUserForm">
    <v-container>
      <v-row no-gutters align="center">
        <v-col cols="12" class="mr-2">
          <v-text-field
            label="User First Name"
            v-model="userFirstName"
            clearable
            @input="onFirstNameInput"
            :rules="rulesData.userFirstName"
            counter="50"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters align="center">
        <v-col cols="12" class="mr-2">
          <v-text-field
            label="User Last Name"
            v-model="userLastName"
            clearable
            @input="onLastNameInput"
            :rules="rulesData.userLastName"
            counter="50"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters align="center">
        <v-col cols="12" class="mr-2">
          <v-text-field
            label="User Email"
            v-model="userEmail"
            clearable
            @input="onEmailInput"
            :rules="rulesData.contactEmailRules"
            counter="50"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters align="center">
        <v-col cols="12" class="mr-2">
          <v-radio-group
            @change="onRoleChange"
            v-model="userRole"
            column
            label="Choose the User Role"
            mandatory
            hide-details
          >
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
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { userFirstName, userLastName, contactEmailRules } from '@/utils/shared/validationRules.js'

export default {
  data() {
    return {
      userFirstName: '',
      userLastName: '',
      userEmail: '',
      userRole: '',
      rulesData: {
        userFirstName,
        userLastName,
        contactEmailRules
      },
      validUserForm: false,
      userRole: null
    }
  },
  watch: {
    validUserForm(val) {
      this.$emit('valid', val)
    },
  },
  methods: {
    onFirstNameInput() {
      this.$emit('newUserFirstName', this.userFirstName)
    },
    onLastNameInput() {
      this.$emit('newUserLastName', this.userLastName)
    },
    onEmailInput() {
      this.$emit('newUserEmail', this.userEmail)
    },
    onRoleChange() {
      this.$emit('newUserRole', this.userRole)
    }

  }
}
</script>
