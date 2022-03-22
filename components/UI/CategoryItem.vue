<template>
  <div>
    <v-list-item

    >
      <template #default>
        <v-list-item-action>
          <v-icon :color="category.categoryColor">
              {{ category.categoryIcon }}
            </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ category.categoryTitle }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <category-menu :category="category"></category-menu>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
import CategoryMenu from '@/components/UI/CategoryMenu.vue'

export default {
  components: { CategoryMenu },
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>

