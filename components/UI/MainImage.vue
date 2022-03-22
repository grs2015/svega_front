<template>
  <div v-if="mainData.mainImage">
    <base-card>
      <template #title>
        <v-row no-gutters align="center" justify="space-between">
          <v-col cols="auto">Main Hero Image</v-col>
        </v-row>
      </template>
      <template #content>
        <v-row>
          <v-col cols="12">
            <v-img
              max-height="200"
              cover
              class="text-right pa-2"
              :src="getBackEndURL">
                <v-btn
                  fab
                  @click="deleteURL"
                  dark
                  color="indigo">
                  <v-icon dark>
                    mdi-delete
                  </v-icon>
                </v-btn>
            </v-img>
          </v-col>
        </v-row>
      </template>
      <template #actions>
        <v-row class="mt-auto">

        </v-row>
      </template>
    </base-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseCard from '@/components/UI/BaseCard.vue'
import _ from 'lodash'

export default {
  components: { BaseCard },
  data() {
    return {
      mainData: null,
      backEndURL: process.env.BACKEND_APP_URL,
    }
  },
  computed: {
    ...mapGetters('main', ['getMain']),
    getBackEndURL() {
      return this.backEndURL + this.mainData.mainImage
    },
  },
  watch: {
    getMain: {
      handler() {
        this.mainData = _.cloneDeep(this.getMain)
      },
      deep: true
    }
  },
  created() {
    this.mainData = { ...this.getMain }
  },
  methods: {
    deleteURL() {
      const fb = new FormData()
      fb.append('deletedImage', this.mainData.mainImage)
      fb.append('_method', 'PUT')

      this.$store.dispatch('main/updateMainImage', fb)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Hero Image has been deleted!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
    }
  }
}
</script>
