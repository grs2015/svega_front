<template>
  <base-card>
    <template #title>
      <span>Page Section Edit</span>
    </template>
    <template #content>
      <v-expansion-panels hover focusable>
        <v-expansion-panel
          v-for="(section, index) in allSections"
          :key="index"
        >
          <v-expansion-panel-header
            :class="{ 'red lighten-5': !validSectionForm[index] }" >
            <template #default>
              <v-row no-gutters>
                <v-col cols="4">
                  <span
                    :class="{ 'primary--text text--lighten-2': validSectionForm[index],
                              'red--text': !validSectionForm[index] }"
                  >Page Section #{{ index + 1 }}</span>
                </v-col>
              </v-row>
            </template>
            <template #actions>
              <v-icon color="primary">
                $expand
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form ref="sectionForm" v-model="validSectionForm[index]">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    placeholder="Page Section #1 Title"
                    hint="Update the page section #1 title"
                    persistent-hint
                    clearable
                    v-model="section.sectionTitle"
                    :rules="sectionPageRules"
                  >
                    <template #prepend>
                      <v-icon color="orange">
                        mdi-pencil
                      </v-icon>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-textarea
                    placeholder="Page Section #1 Description"
                    hint="Update the page section #1 description"
                    persistent-hint
                    v-model="section.sectionDescription"
                    auto-grow
                    prepend-icon="mdi-pencil"
                  >
                    <template #prepend>
                      <v-icon color="orange">
                        mdi-text-box
                      </v-icon>
                    </template>
                  </v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
    <template #actions>
        <v-row justify="end">
          <v-col cols="4" class="mr-2">
            <v-btn
              block
              outlined
              color="primary"
              :disabled="!sectionFormValidation || getLoading"
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
import { mapGetters } from 'vuex'
import _ from 'lodash'
import { sectionPageRules } from '@/utils/shared/validationRules.js'

export default {

  components: { BaseCard },
  data() {
    return {
      allSections: [],
      validSectionForm: new Array(4).fill(true),
      sectionPageRules,
      panelId: null
    }
  },
  computed: {
    ...mapGetters('section', ['getLoading', 'getAllSections']),
    sectionFormValidation() {
      return this.validSectionForm.every(form => form === true)
    },
  },
  created() {
    this.allSections = _.cloneDeep(this.getAllSections)
  },
  methods: {
    onSave() {
      this.$store.commit('section/toggleLoading')
      this.$store.dispatch('section/updateAllSections', this.allSections)
        .then(() => this.allSections = _.cloneDeep(this.getAllSections))
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Sections have been updated!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
        .then(() => this.$store.commit('section/toggleLoading'))
    },
  }

}
</script>


