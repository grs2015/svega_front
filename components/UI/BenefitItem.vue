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
            {{ benefit.benefitTitle }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <benefit-menu :benefit="benefit"></benefit-menu>
        </v-list-item-action>
        <v-list-item-action v-if="$store.state.benefit.sorting">
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
import BenefitMenu from '@/components/UI/BenefitMenu.vue'

export default {
  components: { BenefitMenu },
  props: {
    benefit: {
      type: Object,
      required: true
    }
  }
}
</script>
