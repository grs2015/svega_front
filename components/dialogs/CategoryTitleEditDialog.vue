<template>
  <v-dialog
    persistent
    :value="true"
    max-width="500"
  >
    <v-card>
      <v-card-title class="text-h5">
        Category Title
      </v-card-title>
      <v-card-text>
        Edit the Title of Category
        <v-text-field
          v-model="categoryTitle"
          @keyup.enter="saveTitle"
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="$emit('close')"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          :disabled="categoryTitleIsInvalid"
          color="red darken-1"
          @click="saveTitle"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      categoryTitle: null
    }
  },
  methods: {
    saveTitle() {
      if (!this.categoryTitleIsInvalid) {
        const categoryData = {
          title: this.categoryTitle,
          id: this.category.identifier,
          _method: 'PUT'
        }
        this.$store.dispatch('category/updateTitleCategory', categoryData)
          .then(() => this.$store.dispatch('showSnackBar', { message: 'The Category Title has been updated!', status: 'success'}))
          .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
          .then(() => this.$emit('close'))
      }
    }
  },
  computed: {
    categoryTitleIsInvalid() {
      return !this.categoryTitle || this.categoryTitle === this.category.categoryTitle
    }
  },
  mounted() {
    this.categoryTitle = this.category.categoryTitle
  }
}
</script>
