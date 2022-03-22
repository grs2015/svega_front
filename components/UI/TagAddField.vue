<template>
  <v-text-field
    outlined
    label="Add Tag"
    class="pa-4"
    hide-details
    clearable
    @keyup.enter="addTag"
    v-model="newTagTitle"
  >
    <template #append>
      <v-icon
        @click="addTag"
        color="primary"
        :disabled="newTagTitleIsInvalid"
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
      newTagTitle: null
    }
  },
  computed: {
    newTagTitleIsInvalid() {
      return !this.newTagTitle
    }
  },
  methods: {
    addTag() {
      if (!this.newTagTitleIsInvalid) {
        this.$store.dispatch('tag/addTag', this.newTagTitle)
          .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
        this.newTagTitle = null
      }
    }
  }

}
</script>
