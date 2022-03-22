<template>
  <v-dialog
    persistent
    :value="true"
    max-width="500"
  >
    <v-card>
      <v-card-title class="text-h5">Delete Tag?</v-card-title>
      <v-card-text>Are you sure you want to delete this tag?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="$emit('close')"
        >No</v-btn>
        <v-btn
          text
          color="red darken-1"
          @click="deleteTag"
        >Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteTag() {
      const tagData = this.tag.identifier
      this.$store.dispatch('tag/deleteTag', tagData)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Tag has been deleted!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
        .then(() => this.$emit('close'))
    }
  }
}
</script>
