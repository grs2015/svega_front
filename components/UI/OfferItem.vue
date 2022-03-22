<template>
  <div>
    <v-list-item>
      <template #default>
        <v-list-item-action>
          <v-icon class="primary--text text--lighten-2">
            mdi-check
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ offer.offerTitle }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <offer-menu :offer="offer"></offer-menu>
        </v-list-item-action>
        <v-list-item-action v-if="$store.state.offer.sorting">
          <v-btn
            color="primary"
            class="handle"
            icon
          >
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-btn>

        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
import OfferMenu from '@/components/UI/OfferMenu.vue'

export default {
  components: { OfferMenu },
  props: {
    offer: {
      type: Object,
      required: true
    }
  }
}
</script>



