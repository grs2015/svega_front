<template>
  <div>
    <base-card>
      <template #title>
        <v-row no-gutters align="center" justify="start">
          <v-col cols="auto">Page Hero Image & Slogan Edit</v-col>
        </v-row>
      </template>
      <template #content>
        <v-form v-model="validHeroSloganForm" ref="heroSloganForm">
          <v-row no-gutter align="center">
            <v-col cols="12">
              <base-slogan-input
                label="Hero Image Slogan"
                icon="mdi-bullhorn"
                v-model="mainData.mainTitle"
                :rules="rulesData.sloganTitleRules"
              ></base-slogan-input>
              <v-file-input
                @change="onImageSelected"
                :counter="counterAction"
                class="mx-4"
                show-size
                persistent-placeholder
                v-model="selectedImage"
                accept="image/*"
                label="Activity Image Gallery"
                hint="Size of the file can't exceed 2MB"
                :rules="rulesData.mainImageRules"
                >
                  <template #selection="{ text }">
                    <v-chip
                      color="primary accent-4"
                      dark
                      label
                      small>
                      {{ text }}
                    </v-chip>
                  </template>
              </v-file-input>
            </v-col>
          </v-row>
        </v-form>
      </template>
      <template #actions>
        <v-row class="mt-auto">
            <v-col cols="12">
              <v-row justify="end">
                <v-col cols="4" class="mr-2">
                  <v-btn
                    block
                    outlined
                    color="primary"
                    :disabled="!validHeroSloganForm || getLoadingMainImage"
                    :loading="getLoadingMainImage"
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
import BaseSloganInput from '@/components/UI/BaseSloganInput.vue'
import { sloganTitleRules, mainImageRules } from '@/utils/shared/validationRules.js'
import { mapGetters } from 'vuex'

export default {
  components: { BaseCard, BaseSloganInput },
  data() {
    return {
      mainData: {},
      validHeroSloganForm: false,
      rulesData: {
        sloganTitleRules,
        mainImageRules
      },
      selectedImage: null,
      counterAction: false
    }
  },
  computed: {
    ...mapGetters('main', ['getMain', 'getLoadingMainImage'])
  },
  created() {
    this.mainData = { ...this.getMain }
  },
  methods: {
    onImageSelected() {
      this.counterAction = true
    },
    onSave() {
      const fb = new FormData()

      if (this.selectedImage) {
        fb.append('main_image', this.selectedImage, this.selectedImage.name)
      }

      fb.append('main_title', this.mainData.mainTitle)
      fb.append('_method', 'PUT')

      this.$store.commit('main/toggleLoadingMainImage')
      this.$store.dispatch('main/updateMainImage', fb)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Hero Slogan/Image have been updated!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
        .then(() => this.$store.commit('main/toggleLoadingMainImage'))
        .then(() => {
          this.counterAction = false
          this.selectedImage = null
          this.$refs.heroSloganForm.resetValidation()
        })

    }
  }
}
</script>


