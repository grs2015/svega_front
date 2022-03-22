<template>
  <v-dialog
    persistent
    max-width="600"
    :value="true"
  >
    <v-form v-model="validBenefitEditForm">
      <v-card>
        <v-card-title class="text-h5">
          Benefit Edit
        </v-card-title>
        <v-card-text>
          Edit the Benefit Title
          <v-text-field
            placeholder="Benefit Title"
            clearable
            v-model="benefitData.benefitTitle"
            :rules="rulesData.benefitTitleRules"
            counter="25"
          >
            <template #prepend>
              <v-icon color="orange">
                mdi-pencil
              </v-icon>
            </template>
          </v-text-field>
        </v-card-text>
        <v-card-text>
          Edit the Benefit Description
          <v-textarea
            placeholder="Benefit Description"
            v-model="benefitData.benefitDescription"
            :rules="rulesData.benefitDescriptionRules"
            rows="3"
            counter="200"
          >
            <template #prepend>
              <v-icon color="orange">
                mdi-text-box
              </v-icon>
            </template>
          </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="$emit('close')">Cancel</v-btn>
          <v-btn text color="red darken-1" :disabled="!validBenefitEditForm" @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>


  </v-dialog>
</template>

<script>
import { benefitTitleRules, benefitDescriptionRules } from '@/utils/shared/validationRules.js'
export default {
  props: {
    benefit: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      validBenefitEditForm: false,
      benefitData: {},
      rulesData: {
        benefitTitleRules,
        benefitDescriptionRules
      }
    }
  },
  created() {
    this.benefitData = { ...this.benefit }
  },
  methods: {
    onSave() {
      const benefitEntry = {
        id: this.benefitData.identifier,
        data: {
          title: this.benefitData.benefitTitle,
          description: this.benefitData.benefitDescription
        }
      }
      this.$store.dispatch('benefit/updateBenefitEntry', benefitEntry)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Benefit Entry has been updated!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
        .then(() => this.$emit('close'))
    }
  }
}
</script>
