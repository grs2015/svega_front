<template>
  <v-dialog
    persistent
    max-width="600"
    :value="true"
  >
    <v-form v-model="validOfferEditForm">
      <v-card>
        <v-card-title class="text-h5">
          Offer Title
        </v-card-title>
        <v-card-text>
          Edit the Offer Title
          <v-text-field
            placeholder="Offer Title"
            clearable
            v-model="offerData.offerTitle"
            :rules="rulesData.offerTitleRules"
            counter="25"
          >
            <template #prepend>
              <v-icon color="orange">
                mdi-pencil
              </v-icon>
            </template>
          </v-text-field>
        </v-card-text>
        <v-card-text>
          Edit the Offer Description
          <v-textarea
            placeholder="Offer Description"
            v-model="offerData.offerDescription"
            :rules="rulesData.offerDescriptionRules"
            rows="3"
            counter="200"
          >
            <template #prepend>
              <v-icon color="orange">
                mdi-text-box
              </v-icon>
            </template>
          </v-textarea>
        </v-card-text>
        <v-card-text>
          Pick the appropriate Offer Icon
          <v-item-group
            mandatory
            v-model="offerData.offerIndexIcon"
            @change="onChange"
          >
            <v-container class="mx-4">
              <v-row no-gutters>
                <v-col cols="auto"
                  v-for="(icon, index) in icons"
                  :key="index"
                >
                  <v-item #default="{ active, toggle }">
                    <v-card
                      outlined
                      tile
                      :color="active ? 'orange' : ''"
                      @click="toggle"
                    >
                      <v-icon
                        large
                        :color="active? 'white' : 'primary'"
                      >
                        {{ icon }}
                      </v-icon>
                    </v-card>
                  </v-item>

                </v-col>
              </v-row>
            </v-container>

          </v-item-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="$emit('close')">Cancel</v-btn>
          <v-btn text color="red darken-1" :disabled="!validOfferEditForm" @click="onSave">Save</v-btn>
        </v-card-actions>

      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { offerTitleRules, offerDescriptionRules } from '@/utils/shared/validationRules.js'
import iconSet from '@/utils/shared/iconSet.js'

export default {
  props: {
    offer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      validOfferEditForm: false, // Пока так
      offerData: {},
      rulesData: {
        offerTitleRules,
        offerDescriptionRules
      },
      icons: iconSet,
      activeIcon: ''
    }
  },
  created() {
    this.offerData = { ... this.offer }

  },
  methods: {
    onChange() {
      this.offerData.offerIcon = this.icons[this.offerData.offerIndexIcon]
    },
    onSave() {
      const offerEntry = {
        id: this.offerData.identifier,
        data: {
          title: this.offerData.offerTitle,
          description: this.offerData.offerDescription,
          icon: this.offerData.offerIcon,
          indexicon: this.offerData.offerIndexIcon
        }
      }
      this.$store.dispatch('offer/updateOfferEntry', offerEntry)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Offer Entry has been updated!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
        .then(() => this.$emit('close'))
        }

  }
}
</script>
