<template>

</template>
<template>
  <v-dialog
    persistent
    :value="true"
    max-width="500"
  >
    <v-card>
      <v-card-title class="text-h5">
        Category Color
      </v-card-title>
      <v-card-text>
        Choose the color for Category
        <category-color-picker @activeColor="setColor"></category-color-picker>
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
          @click="saveColor"
        >Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CategoryColorPicker from '@/components/UI/CategoryColorPicker.vue'
import { colorTransform } from '@/utils/shared/colorSet.js'

export default {
  components: { CategoryColorPicker },
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      color: null
    }
  },
  methods: {
    saveColor() {
      const categoryData = {
        color: colorTransform(this.color),
        id: this.category.identifier,
        _method: 'PUT'
      }
      this.$store.dispatch('category/updateColorCategory', categoryData)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Category Color has been updated!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
        .then(() => this.$emit('close'))
    },
    setColor(data) {
      this.color = data
    }
  }
}
</script>
