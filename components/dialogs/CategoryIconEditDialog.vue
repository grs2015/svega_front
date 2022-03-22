<template>
  <v-dialog
    persistent
    :value="true"
    max-width="500"
  >
    <v-card>
      <v-card-title class="text-h5">
        Category Icon
      </v-card-title>
      <v-card-text>
        Choose the Icon for the Category
        <category-icons @activeIcon="setIcon"></category-icons>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="$emit('close')"
        >Cancel</v-btn>
        <v-btn
          text
          color="red darken-1"
          @click="saveIcon"
        >Save</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
import CategoryIcons from '@/components/UI/CategoryIcons.vue'

export default {
  components: { CategoryIcons },
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      icon: null
    }
  },
  methods: {
    saveIcon() {
      const categoryData = {
          icon: this.icon,
          id: this.category.identifier,
          _method: 'PUT'
        }
      this.$store.dispatch('category/updateIconCategory', categoryData)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Category Icon has been updated!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
        .then(() => this.$emit('close'))
    },
    setIcon(data) {
      this.icon = data
    }
  },

}
</script>
