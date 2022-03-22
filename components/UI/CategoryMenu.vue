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

    <category-title-edit-dialog
      v-if="dialogs.editTitle"
      @close="dialogs.editTitle = false"
      :category="category"
    >
    </category-title-edit-dialog>

    <category-delete-dialog
      v-if="dialogs.delete"
      @close="dialogs.delete = false"
      :category="category"
    >
    </category-delete-dialog>

    <category-icon-edit-dialog
      v-if="dialogs.editIcon"
      @close="dialogs.editIcon = false"
      :category="category"
    >
    </category-icon-edit-dialog>

    <category-color-edit-dialog
      v-if="dialogs.editColor"
      @close="dialogs.editColor = false"
      :category="category"
    >
    </category-color-edit-dialog>

  </div>
</template>

<script>

import CategoryTitleEditDialog from '@/components/dialogs/CategoryTitleEditDialog.vue'
import CategoryDeleteDialog from '@/components/dialogs/CategoryDeleteDialog.vue'
import CategoryIconEditDialog from '@/components/dialogs/CategoryIconEditDialog.vue'
import CategoryColorEditDialog from '@/components/dialogs/CategoryColorEditDialog.vue'

export default {
  components: { CategoryTitleEditDialog, CategoryDeleteDialog, CategoryIconEditDialog, CategoryColorEditDialog },
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      menuItems: [
        {
          title: 'Category Color',
          icon: 'mdi-pencil',
          click: () => {
            this.dialogs.editColor = true;
          }
        },
        {
          title: 'Category Title',
          icon: 'mdi-pencil',
          click: () => {
            this.dialogs.editTitle = true;
          }
        },
        {
          title: 'Category Icon',
          icon: 'mdi-pencil',
          click: () => {
            this.dialogs.editIcon = true;
          }
        },
        {
          title: 'Delete',
          icon: 'mdi-delete',
          click: () => {
            this.dialogs.delete = true;
          }
        },
      ],
      dialogs: {
        editColor: false,
        editTitle: false,
        editIcon: false,
        delete: false
      }
    }
  },
  methods: {
    handleClick(index) {
      this.menuItems[index].click()
    }
  },

}
</script>
