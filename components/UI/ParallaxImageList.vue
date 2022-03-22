<template>
  <div>
    <base-card>
      <template #title>
        <v-row no-gutters align="center" justify="start">
          <v-col cols="auto">Parallax Images Edit</v-col>
        </v-row>
      </template>
      <template #content>
        <v-form v-model="validParallaxImagesForm" ref="parallaxImagesForm">
          <v-row>
            <v-col cols="12">
              <v-file-input
                @change="onImageSelected"
                v-model="selectedImages"
                :counter="counterAction"
                show-size
                persistent-placeholder
                multiple
                accept="image/*"
                label="News Image Gallery"
                prepend-icon="mdi-camera"
                hint="Size of each file can't exceed 2MB"
                :rules="rulesData.parallaxImageRules"
                >
                  <template #selection="{ text, index }">
                    <v-chip
                      v-if="index < 2"
                      color="primary accent-4"
                      dark
                      label
                      small>
                      {{ text }}
                    </v-chip>
                    <span
                      v-else-if="index === 2"
                      class="text-overline grey--text text--darken-3 mx-2">
                        + {{ selectedImages.length - 2 }} File(s)
                    </span>
                  </template>
              </v-file-input>
            </v-col>
          </v-row>
        </v-form>

        <div v-if="mainData.mainParallaxImages">
          <v-row>
            <v-col v-for="image in parallaxImages" :key="image" cols="6">
              <v-img
                max-height="300"
                class="text-right pa-2"
                :src="getBackEndURL(image)">
                <v-btn
                  fab
                  @click="deleteURL(image)"
                  dark
                  color="indigo">
                  <v-icon dark>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-img>
            </v-col>
          </v-row>
        </div>

      </template>
      <template #actions>
        <v-row class="mt-auto">
            <v-col cols="12">
              <v-row justify="end">
                <v-col cols="4" class="mr-2" md="2">
                  <v-btn
                    block
                    outlined
                    color="primary"
                    :disabled="!validParallaxImagesForm || getLoadingParallaxImages"
                    :loading="getLoadingParallaxImages"
                    @click="onSave"
                    >
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </template>
                    Save
                  </v-btn>
                </v-col>
              </v-row>

            </v-col>
          </v-row>
      </template>
    </base-card>
  </div>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard.vue'
import { parallaxImageRules } from '@/utils/shared/validationRules.js'
import { mapGetters } from 'vuex'
import _ from 'lodash'


export default {
  components: { BaseCard },
  data() {
    return {
      mainData: {},
      validParallaxImagesForm: false,
      selectedImages: [],
      backEndURL: process.env.BACKEND_APP_URL,
      rulesData: {
        parallaxImageRules
      },
      counterAction: false
    }
  },
  watch: {
    getMain: {
      handler() { this.mainData = _.cloneDeep(this.getMain) },
      deep: true
    }
  },
  computed: {
    ...mapGetters('main', ['getMain', 'getLoadingParallaxImages']),
    parallaxImages() {
      return (this.mainData.mainParallaxImages) ? [...(this.mainData.mainParallaxImages).split(',')] : []
    }
  },
  created() {
    this.mainData = _.cloneDeep(this.getMain)
  },
  methods: {
    getBackEndURL(image) {
      return this.backEndURL + image
    },
    deleteURL(image) {
      const fb = new FormData()
      fb.append('deletedParallaxImage', image)
      fb.append('_method', 'PUT')

      this.$store.dispatch('main/updateParallaxImages', fb)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Parallax Image has been deleted!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
    },
    onImageSelected() {
      this.counterAction = true
    },
    onSave() {
      const fb = new FormData()

      if (this.selectedImages.length > 0 ) {
        this.selectedImages.forEach(imageFile => {
          fb.append('parallax_images[]', imageFile)
        })
      }

      fb.append('_method', 'PUT')

      this.$store.commit('main/toggleLoadingParallaxImages')
      this.$store.dispatch('main/updateParallaxImages', fb)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Parallax Images have been updated!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
        .then(() => this.$store.commit('main/toggleLoadingParallaxImages'))
        .then(() => {
          this.counterAction = false
          this.selectedImages.length = 0
          this.$refs.parallaxImagesForm.resetValidation()
        })
    }
  }
}
</script>
