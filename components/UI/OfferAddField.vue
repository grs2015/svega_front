<template>
  <div>
    <v-text-field
      dense
      hide-details
      label="Add Offer"
      clearable
      @keyup.enter="addOffer"
      v-model="newOfferTitle"
    >
      <template #append>
      <v-icon
        @click="addOffer"
        color="primary"
        :disabled="newOfferTitleIsInvalid"
      >
        mdi-plus
      </v-icon>
    </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newOfferTitle: null
    }
  },
  computed: {
    newOfferTitleIsInvalid() {
      return !this.newOfferTitle
    }
  },
  methods: {
    addOffer() {
      if (!this.newOfferTitleIsInvalid) {
        this.$store.dispatch('offer/addOffer', this.newOfferTitle )
          .then(() => this.$store.dispatch('showSnackBar', { message: 'The Offer Entry has been added!', status: 'success'}))
          .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
        this.newOfferTitle = null
      }
    }
  }
}
</script>
