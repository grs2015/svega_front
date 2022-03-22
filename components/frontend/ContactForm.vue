<template>
  <v-form ref="contactForm" v-model="validContactForm">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            dark
            outlined
            label="Your Name"
            v-model="contactName"
            clearable
            :rules="rulesData.contactNameRules"
            hide-details="false"
            required
            color="orange"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            dark
            outlined
            label="Your Email"
            v-model="contactEmail"
            clearable
            :rules="rulesData.contactEmailRules"
            hide-details="false"
            required
            color="orange"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            dark
            outlined
            label="Your request"
            v-model="contactRequest"
            hide-details="false"
            auto-grow
            required
            color="orange"
            :rules="rulesData.contactRequestRules"
          >
          </v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-checkbox
            dark
            dense
            color="orange"
            label="Wyrażam zgodę na przetwarzanie moich danych osobowych"
            required
            v-model="contactCheck"
            hide-details="false"
            :rules="rulesData.contactCheckRules"
          >
          </v-checkbox>
        </v-col>
      </v-row>
      <v-row no-gutters justify="end" class="pt-6">
        <v-col cols="auto">
          <v-btn color="orange" outlined :disabled="!validContactForm" @click="onClick">
            Send Request
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { contactNameRules, contactEmailRules, contactRequestRules, contactCheckRules } from '@/utils/shared/validationRules.js'

export default {
  data() {
    return {
      validContactForm: false,
      contactName: '',
      contactEmail: '',
      contactRequest: '',
      contactCheck: false,
      rulesData: {
        contactNameRules,
        contactEmailRules,
        contactRequestRules,
        contactCheckRules
      }
    }
  },
  methods: {
    onClick() {
      const requestData = {
        name: this.contactName,
        email: this.contactEmail,
        request: this.contactRequest,
        status: 'new',
        date: (new Date()).toISOString(),
        confirm: true
      }
      this.$store.dispatch('request/createRequest', requestData)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The request has been sent!', status: 'success'}))
          .catch(e => {
            this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'})
          })
    }
  }
}
</script>
