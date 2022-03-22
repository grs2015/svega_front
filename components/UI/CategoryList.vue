<template>
  <v-list flat class="pt-0">
    <category-item
      v-for="category in categories"
      :key="category.identifier"
      :category="category"
    >
    </category-item>
  </v-list>
</template>

<script>
import CategoryItem from '@/components/UI/CategoryItem.vue'

export default {
  components: { CategoryItem },
  computed: {
    categories() {
      return this.$store.state.category.categories
    }
  }

}
</script>
