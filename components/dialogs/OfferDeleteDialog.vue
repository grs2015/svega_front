<template>
  <v-dialog
    persistent
    :value="true"
    max-width="600"
  >
    <v-card>
      <v-card-title class="text-h5">Delete Offer</v-card-title>
      <v-card-text>Are you sure you want to delete this Offer?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')">No</v-btn>
        <v-btn text color="red darken-1" @click="deleteOffer">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    offer: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteOffer() {
      const id = this.offer.identifier
      this.$store.dispatch('offer/deleteOffer', id)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Offer has been deleted!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
        .then(() => this.$emit('close'))
    }
  }
}
</script>
