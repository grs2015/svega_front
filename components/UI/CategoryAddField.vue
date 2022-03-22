<template>
  <v-text-field
    outlined
    label="Add Category"
    class="pa-4"
    hide-details
    clearable
    @keyup.enter="addCategory"
    v-model="newCategoryTitle"
  >
    <template #append>
      <v-icon
        @click="addCategory"
        color="primary"
        :disabled="newCategoryTitleIsInvalid"
      >
        mdi-plus
      </v-icon>
    </template>

  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newCategoryTitle: null
    }
  },
  computed: {
    newCategoryTitleIsInvalid() {
      return !this.newCategoryTitle
    }
  },
  methods: {
    addCategory() {
      if (!this.newCategoryTitleIsInvalid) {
        this.$store.dispatch('category/addCategory', this.newCategoryTitle)
          .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
        this.newCategoryTitle = null
      }
    }
  }
}
</script>
