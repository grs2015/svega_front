<template>
  <v-list flat class="pt-0">
    <tag-item
      v-for="tag in tags"
      :key="tag.identifier"
      :tag="tag"
    >
    </tag-item>
  </v-list>
</template>

<script>
import TagItem from '@/components/UI/TagItem.vue'

export default {
  components: { TagItem },
  computed: {
    tags() {
      return this.$store.state.tag.tags
    }
  }

}
</script>
