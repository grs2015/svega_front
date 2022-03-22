<template>
  <div>
    <v-menu
      bottom
      left
    >
      <template #activator="{ attrs, on }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
          color="primary"
        >
          <v-icon>
            mdi-dots-vertical
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <benefit-edit-dialog
      v-if="dialogs.editBenefit"
      @close="dialogs.editBenefit = false"
      :benefit="benefit"
    >
    </benefit-edit-dialog>

    <benefit-delete-dialog
      v-if="dialogs.deleteBenefit"
      @close="dialogs.deleteBenefit = false"
      :benefit="benefit"
    >
    </benefit-delete-dialog>

  </div>
</template>

<script>
import BenefitEditDialog from '@/components/dialogs/BenefitEditDialog.vue'
import BenefitDeleteDialog from '@/components/dialogs/BenefitDeleteDialog.vue'

export default {
  components: { BenefitEditDialog, BenefitDeleteDialog },
  props: {
    benefit: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      menuItems: [
        {
          title: 'Benefit Edit',
          icon: 'mdi-pencil',
          click: () => {
            this.dialogs.editBenefit = true;
          }
        },
        {
          title: 'Benefit Delete',
          icon: 'mdi-delete',
          click: () => {
            this.dialogs.deleteBenefit = true;
          }
        },
        {
          title: 'Sort Benefits',
          icon: 'mdi-drag-horizontal-variant',
          click: () => {
            this.$store.commit('benefit/toggleSorting');
          }
        }
      ],
      dialogs: {
        editBenefit: false,
        deleteBenefit: false,
      }
    }
  },
  methods: {
    handleClick(index) {
      this.menuItems[index].click()
    }
  }
}
</script>
