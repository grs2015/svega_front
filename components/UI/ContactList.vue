<template>
  <base-card>
    <template #title>
      <span>Contact Data Edit</span>
    </template>
    <template #content>
      <v-form v-model="validContactEditForm">
        <base-contact-input
          v-model="mainData.mainCompanyName"
          label="Company Name"
          icon="mdi-domain"
          :rules="rulesData.contactTextRules"
        ></base-contact-input>
        <base-contact-input
          v-model="mainData.mainAddress"
          label="Company Address"
          icon="mdi-map-marker"
          :rules="rulesData.contactTextRules"
        ></base-contact-input>
        <base-contact-input
          v-model="mainData.mainCompanyData"
          label="Company Data (NIP/KRS)"
          icon="mdi-bank"
          :rules="rulesData.contactTextRules"
        ></base-contact-input>
        <base-contact-input
          v-model="mainData.mainPhone"
          label="Company Phone"
          icon="mdi-phone"
          :rules="rulesData.contactPhoneRules"
          tooltip="Pattern: 10-15 numbers-spaces-hyphens"
        ></base-contact-input>
        <base-contact-input
          v-model="mainData.mainEmail"
          label="Company Email"
          icon="mdi-at"
          :rules="rulesData.contactEmailRules"
          tooltip="Pattern: email@company.com"
        ></base-contact-input>
        <base-contact-input
          v-model="mainData.mainWebsite"
          label="Company Website"
          icon="mdi-web"
          :rules="rulesData.contactWebsiteRules"
          tooltip="Pattern: website.com"
        ></base-contact-input>
      </v-form>
    </template>
    <template #actions>
      <v-row justify="end">
          <v-col cols="4" class="mr-2">
            <v-btn
              block
              outlined
              color="primary"
              :disabled="!validContactEditForm || getLoading"
              :loading="getLoading"
              @click="onSave">
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
              Save
            </v-btn>
          </v-col>
        </v-row>
    </template>
  </base-card>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard.vue'
import BaseContactInput from '@/components/UI/BaseContactInput.vue'
import { mapGetters } from 'vuex'
import _ from 'lodash'
import { contactTextRules, contactEmailRules, contactPhoneRules, contactWebsiteRules } from '@/utils/shared/validationRules.js'


export default {
  components: { BaseCard, BaseContactInput },
  data() {
    return {
      mainData: null,
      validContactEditForm: false,
      rulesData: {
        contactTextRules,
        contactEmailRules,
        contactPhoneRules,
        contactWebsiteRules
      }
    }
  },
  computed: {
    ...mapGetters('main', ['getMain', 'getLoading'])
  },
  methods: {
    onSave() {
      const data = {
        company_name: this.mainData.mainCompanyName,
        company_data: this.mainData.mainCompanyData,
        address: this.mainData.mainAddress,
        phone: this.mainData.mainPhone,
        email: this.mainData.mainEmail,
        website: this.mainData.mainWebsite
      }
      this.$store.commit('main/toggleLoading')
      this.$store.dispatch('main/updateContact', data)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Slogan has been updated!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
        .then(() => this.$store.commit('main/toggleLoading'))
    }
  },
  created() {
    this.mainData = _.cloneDeep(this.getMain)
  }


}
</script>
