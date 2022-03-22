<template>
  <base-card>
    <template #title>
      <v-row no-gutters align="center" justify="space-between">
        <v-col cols="auto">Page Benefits Edit</v-col>
        <v-col cols="6">
          <benefit-add-field></benefit-add-field>
        </v-col>
      </v-row>
    </template>

    <template #content>
      <v-list flat class="pt-0">
        <draggable
          v-model="benefits"
          handle=".handle"
          ghost-class="ghost"
        >
          <benefit-item
            v-for="benefit in benefits"
            :key="benefit.identifier"
            :benefit="benefit"
          ></benefit-item>
        </draggable>
      </v-list>
    </template>
    <template #actions>
      <v-row justify="end">
          <v-col cols="4" class="mr-2">
            <v-btn
              block
              outlined
              color="primary"
              :disabled="!$store.state.benefit.sorting || getLoading"
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
import BenefitItem from '@/components/UI/BenefitItem.vue'
import draggable from 'vuedraggable'
import BenefitAddField from '@/components/UI/BenefitAddField.vue'
import { mapGetters } from 'vuex'


export default {
  components: { BaseCard, BenefitItem, draggable, BenefitAddField },
  computed: {
    benefits: {
      get() {
        return this.$store.state.benefit.benefits
      },
      set(value) {
        this.$store.commit('benefit/setBenefits', value)
      }
    },
    ...mapGetters('benefit', ['getLoading'])
  },
  methods: {
    onSave() {
      this.$store.commit('benefit/updateSortIndexes')
      this.$store.commit('benefit/toggleLoading')
      this.$store.dispatch('benefit/updateAllBenefits')
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Benefits sorting has been updated!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
        .then(() => this.$store.commit('benefit/toggleSorting'))
        .then(() => this.$store.commit('benefit/toggleLoading'))
    }
  }
}
</script>

<style scoped>
  .ghost {
    opacity: .5;
    background: #E3F2FD;
  }

</style>
