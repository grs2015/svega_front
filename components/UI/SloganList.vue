<template>
  <base-card>
    <template #title>
      <v-row no-gutters align="center" justify="space-between">
        <v-col cols="auto">Page Slogan Edit</v-col>
      </v-row>
    </template>
    <template #content>
      <v-form v-model="validSloganEditForm">
        <base-slogan-input
          label="Company Slogan"
          icon="mdi-bullhorn"
          v-model="mainData.mainSloganTitle"
          :rules="rulesData.sloganTitleRules"
        ></base-slogan-input>
        <base-slogan-textarea
          label="Slogan Description"
          icon="mdi-text-box-multiple-outline"
          v-model="mainData.mainSloganDescription"
          :rules="rulesData.sloganDescriptionRules"
        >
        </base-slogan-textarea>
      </v-form>
    </template>
    <template #actions>
      <v-row justify="end">
          <v-col cols="4" class="mr-2">
            <v-btn
              block
              outlined
              color="primary"
              :disabled="!validSloganEditForm || getLoadingSlogan"
              :loading="getLoadingSlogan"
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
import BaseSloganInput from '@/components/UI/BaseSloganInput.vue'
import BaseSloganTextarea from '@/components/UI/BaseSloganTextarea.vue'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { sloganTitleRules, sloganDescriptionRules } from '@/utils/shared/validationRules.js'


export default {
  components: { BaseCard, BaseSloganInput, BaseSloganTextarea },
  data() {
    return {
      mainData: null,
      validSloganEditForm: false,
      rulesData: {
        sloganTitleRules,
        sloganDescriptionRules
      },
    }
  },
  computed: {
    ...mapGetters('main', ['getMain', 'getLoadingSlogan'])
  },
  methods: {
    onSave() {
      const data = {
        slogan_text: this.mainData.mainSloganTitle,
        slogan_description: this.mainData.mainSloganDescription
      }
      this.$store.commit('main/toggleLoadingSlogan')
      this.$store.dispatch('main/updateSlogan', data)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Slogan has been updated!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
        .then(() => this.$store.commit('main/toggleLoadingSlogan'))
    }
  },
  created() {
    this.mainData = { ...this.getMain }
  }

}
</script>
