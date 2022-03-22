<template>
  <div>
    <v-text-field
      dense
      hide-details
      label="Add Benefit"
      clearable
      @keyup.enter="addBenefit"
      v-model="newBenefitTitle"
    >
      <template #append>
      <v-icon
        @click="addBenefit"
        color="primary"
        :disabled="newBenefitTitleIsInvalid"
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
      newBenefitTitle: null
    }
  },
  computed: {
    newBenefitTitleIsInvalid() {
      return !this.newBenefitTitle
    }
  },
  methods: {
    addBenefit() {
      if (!this.newBenefitTitleIsInvalid) {
        this.$store.dispatch('benefit/addBenefit', this.newBenefitTitle )
          .then(() => this.$store.dispatch('showSnackBar', { message: 'The Benefit Entry has been added!', status: 'success'}))
          .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
        this.newBenefitTitle = null
      }
    }
  }
}
</script>
