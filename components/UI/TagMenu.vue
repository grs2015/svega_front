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

    <tag-title-edit-dialog
      v-if="dialogs.editTitle"
      @close="dialogs.editTitle = false"
      :tag="tag"
    >
    </tag-title-edit-dialog>

    <tag-delete-dialog
      v-if="dialogs.delete"
      @close="dialogs.delete = false"
      :tag="tag"
    >
    </tag-delete-dialog>

  </div>
</template>

<script>

import TagTitleEditDialog from '@/components/dialogs/TagTitleEditDialog.vue'
import TagDeleteDialog from '@/components/dialogs/TagDeleteDialog.vue'

export default {
  components: { TagTitleEditDialog, TagDeleteDialog },
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      menuItems: [
        {
          title: 'Tag Title',
          icon: 'mdi-pencil',
          click: () => {
            this.dialogs.editTitle = true;
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
        editTitle: false,
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
