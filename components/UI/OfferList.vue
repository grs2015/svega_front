<template>
  <base-card>
    <template #title>
      <v-row no-gutters align="center" justify="space-between">
        <v-col cols="auto">Page Offer Edit</v-col>
        <v-col cols="6">
          <offer-add-field></offer-add-field>
        </v-col>
      </v-row>


    </template>
    <template #content>
      <v-list flat class="pt-0">
        <draggable
          v-model="offers"
          handle=".handle"
          ghost-class="ghost"
        >
          <transition-group>
            <offer-item
              v-for="offer in offers"
              :key="offer.identifier"
              :offer="offer"
            >
            </offer-item>
          </transition-group>
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
              :disabled="!$store.state.offer.sorting || getLoading"
              :loading="getLoading"
              @click="onSave">
              <template #loader>
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
import OfferItem from '@/components/UI/OfferItem.vue'
import OfferAddField from '@/components/UI/OfferAddField.vue'
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'

export default {
  components: { BaseCard, OfferItem, OfferAddField, draggable },
  computed: {
    offers: {
      get() {
        return this.$store.state.offer.offers
      },
      set(value) {
        this.$store.commit('offer/setOffers', value)
      }
    },
    ...mapGetters('offer', ['getLoading'])
  },
  fetch() {
    return this.$store.dispatch('offer/fetchAllOffers')
  },
  methods: {
    onSave() {

      this.$store.commit('offer/updateSortIndexes')
      this.$store.commit('offer/toggleLoading')
      this.$store.dispatch('offer/updateAllOffers')
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Offers sorting has been updated!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
        .then(() => this.$store.commit('offer/toggleSorting'))
        .then(() => this.$store.commit('offer/toggleLoading'))
    }
  }
}
</script>

<style scoped>
  .ghost {
    opacity: .5;
    background: #E3F2FD;
  }

  /* .sortable-drag {
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.788)
  } */
</style>
