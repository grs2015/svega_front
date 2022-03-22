<template>
  <div>
    <v-list-item
    >
      <template #default>
        <v-list-item-action>
          <v-icon color="primary">
              mdi-tag
            </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ tag.tagTitle }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <tag-menu :tag="tag"></tag-menu>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
import TagMenu from '@/components/UI/TagMenu.vue'

export default {
  components: { TagMenu },
  props: {
    tag: {
      type: Object,
      required: true
    }
  }
}
</script>
