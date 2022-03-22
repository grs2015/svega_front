<template>
   <v-container>
    <v-row>
      <v-col cols="12">
        <v-card flat outlined>
          <v-card-title>
            Activity Basic Information
          </v-card-title>
          <v-card-text>
            <v-row align="center">
              <v-col cols="5">
                <v-text-field
                  placeholder="Activity Title"
                  autofocus
                  hint="Update the activity title"
                  persistent-hint
                  clearable
                  v-model="editedEntry.activityTitle"
                >
                  <template #prepend-inner>
                    <v-icon color="primary">
                      mdi-pencil
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  placeholder="Activity Subtitle"
                  hint="Update the activity subtitle"
                  persistent-hint
                  clearable
                  v-model="editedEntry.activitySubtitle"
                >
                  <template #prepend-inner>
                    <v-icon color="primary">
                      mdi-pencil
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-title>
            Activity Section Information
          </v-card-title>
          <v-card-text>
            <v-expansion-panels hover focusable>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <template #default>
                    <v-row no-gutters>
                      <v-col cols="4">
                        <span class="primary--text text--lighten-2">Section #1 Basic Information</span>
                      </v-col>
                    </v-row>
                  </template>
                  <template #actions>
                    <v-icon color="primary">
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card-text>
                    <v-row align="start">
                      <v-col cols="12" md="4">
                        <v-text-field
                          placeholder="Section #1 Title"
                          hint="Update the section #1 title"
                          persistent-hint
                          clearable
                          v-model="editedEntry.activitySectionTitle1"
                        >
                          <template #prepend-inner>
                            <v-icon color="primary">
                              mdi-pencil
                            </v-icon>
                          </template>
                        </v-text-field>
                        <v-checkbox
                          true-value="1"
                          false-value="0"
                          label="Listed text in description"
                          v-model="editedEntry.activitySectionType1"
                          hide-details
                        >

                        </v-checkbox>
                      </v-col>
                      <v-col>
                        <v-textarea
                          placeholder="Section #1 Description"
                          hint="Update the section #1 description"
                          persistent-hint
                          v-model="editedEntry.activitySectionDescription1"
                          auto-grow
                        >
                          <template #prepend-inner>
                            <v-icon color="primary">
                              mdi-text-box
                            </v-icon>
                          </template>
                        </v-textarea>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <template #default>
                    <v-row no-gutters>
                      <v-col cols="4">
                        <span class="primary--text text--lighten-2">Section #2 Basic Information</span>
                      </v-col>
                    </v-row>
                  </template>
                  <template #actions>
                    <v-icon color="primary">
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card-text>
                    <v-row align="start">
                      <v-col cols="12" md="4">
                        <v-text-field
                          placeholder="Section #2 Title"
                          hint="Update the section #2 title"
                          persistent-hint
                          clearable
                          v-model="editedEntry.activitySectionTitle2"
                        >
                          <template #prepend-inner>
                            <v-icon color="primary">
                              mdi-pencil
                            </v-icon>
                          </template>
                        </v-text-field>
                        <v-checkbox
                          true-value="1"
                          false-value="0"
                          label="Listed text in description"
                          v-model="editedEntry.activitySectionType2"
                          hide-details
                        >

                        </v-checkbox>
                      </v-col>
                      <v-col>
                        <v-textarea
                          placeholder="Section #2 Description"
                          hint="Update the section #2 description"
                          persistent-hint
                          v-model="editedEntry.activitySectionDescription2"
                          auto-grow
                        >
                          <template #prepend-inner>
                            <v-icon color="primary">
                              mdi-text-box
                            </v-icon>
                          </template>
                        </v-textarea>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <template #default>
                    <v-row no-gutters>
                      <v-col cols="4">
                        <span class="primary--text text--lighten-2">Section #3 Basic Information</span>
                      </v-col>
                    </v-row>
                  </template>
                  <template #actions>
                    <v-icon color="primary">
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card-text>
                    <v-row align="start">
                      <v-col cols="12" md="4">
                        <v-text-field
                          placeholder="Section #3 Title"
                          hint="Update the section #3 title"
                          persistent-hint
                          clearable
                          v-model="editedEntry.activitySectionTitle3"
                        >
                          <template #prepend-inner>
                            <v-icon color="primary">
                              mdi-pencil
                            </v-icon>
                          </template>
                        </v-text-field>
                        <v-checkbox
                          true-value="1"
                          false-value="0"
                          label="Listed text in description"
                          v-model="editedEntry.activitySectionType3"
                          hide-details
                        >

                        </v-checkbox>
                      </v-col>
                      <v-col>
                        <v-textarea
                          placeholder="Section #3 Description"
                          hint="Update the section #3 description"
                          persistent-hint
                          v-model="editedEntry.activitySectionDescription3"
                          auto-grow
                        >
                          <template #prepend-inner>
                            <v-icon color="primary">
                              mdi-text-box
                            </v-icon>
                          </template>
                        </v-textarea>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-expansion-panel-content>
              </v-expansion-panel>

            </v-expansion-panels>
          </v-card-text>

          <v-card-title>
            Activity Tags
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-chip-group
                  multiple
                  column
                  @change="onTagsChange"
                  v-model="chipSelected"
                  active-class="primary--text"
                  mandatory
                >
                  <v-chip v-for="tag in getAllTags"
                    :key="tag.identifier"

                    label
                  >
                    {{ tag.tagTitle }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-title>
            Activity Image Gallery
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  @change="onImageSelected"
                  v-model="selectedImage"
                  :loading="uploadStatus.uploadAction"
                  :counter="uploadStatus.counterAction"
                  show-size
                  persistent-placeholder
                  accept="image/*"
                  label="Activity Image Gallery"
                  prepend-icon="mdi-camera"
                  hint="Size of the file can't exceed 2MB"
                  :rules="activityImagesRules"
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
          </v-card-text>

          <div v-if="editedEntry.activityImage">
            <v-card-title>
              Attached Hero-image
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-img
                    max-height="300"
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
            </v-card-text>

          </div>

          <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn text @click="onCancel">Cancel</v-btn>
                <v-btn text color="red darken-1" @click="onSave">Save</v-btn>
                <v-divider vertical></v-divider>
                <v-btn text color="red darken-1" @click="onSaveClose">Save & Close</v-btn>
            </v-card-actions>
        </v-card>
      </v-col>

    </v-row>


      <!-- <v-form @submit.prevent="onSubmit" >
        <base-header>Update Activity Information</base-header>
        <activity-input v-model="activity.activityTitle" label="Title">Activity Title</activity-input>
        <activity-input v-model="activity.activitySubtitle" label="Subtitle">Activity Subtitle</activity-input>

        <base-header>Update Image</base-header>
        <v-row align="center">
          <v-col cols="2">
            <v-subheader>Choose hero-image</v-subheader>
          </v-col>
          <v-col cols="6">
            <v-file-input @change="onImageSelected"
              v-model="selectedImage"
              :loading="uploadFileStatus"
              show-size
              :counter="addFileStatus"
              persistent-placeholder
              accept="image/*"
              label="Activity Hero-image"
              prepend-icon="mdi-camera"
              >
                <template v-slot:selection="{ text }">
                  <v-chip
                    color="accent"
                    dark
                    label
                    small>
                    {{ text }}
                  </v-chip>
                </template>
            </v-file-input>
          </v-col>
          <v-col cols="4" v-if="this.activity.image">
            <v-img
              class="text-right pa-4 rounded-lg"
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

        <base-header>Update Section Information</base-header>
        <activity-input v-model="activity.activitySectionTitle1" label="Title">Section #1 Title</activity-input>
        <activity-textarea v-model="activity.activitySectionDescription1" label="Description">Section #1 Description</activity-textarea>
        <activity-checkbox v-model="activity.activitySectionType1" label="Check if you want the list instead of plain text"></activity-checkbox>

        <v-divider></v-divider>

        <activity-input v-model="activity.activitySectionTitle2" label="Title" class="pt-8">Section #2 Title</activity-input>
        <activity-textarea v-model="activity.activitySectionDescription2" label="Description">Section #2 Description</activity-textarea>
        <activity-checkbox v-model="activity.activitySectionType2" label="Check if you want the list instead of plain text"></activity-checkbox>

        <v-divider></v-divider>

        <activity-input v-model="activity.activitySectionTitle3" label="Title" class="pt-8">Section #3 Title</activity-input>
        <activity-textarea v-model="activity.activitySectionDescription3" label="Description">Section #3 Description</activity-textarea>
        <activity-checkbox v-model="activity.activitySectionType3" label="Check if you want the list instead of plain text"></activity-checkbox>

        <v-divider></v-divider>

        <v-row justify="end" class="pt-8">
          <v-col cols="auto">
            <v-btn color="secondary" class="mr-3" @click="onCancel">Cancel</v-btn>
            <v-btn color="primary" type="submit">Save</v-btn>
          </v-col>
        </v-row>
      </v-form> -->
    </v-container>
</template>

<script>
// import BaseHeader from '../UI/BaseHeader.vue'
// import ActivityInput from '@/components/UI/ActivityInput.vue'
// import ActivityTextarea from '@/components/UI/ActivityTextarea.vue'
// import ActivityCheckbox from '@/components/UI/ActivityCheckbox.vue'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { activityImagesRules } from '@/utils/shared/validationRules.js'



export default {
  // components: { BaseHeader, ActivityInput, ActivityTextarea, ActivityTextarea, ActivityCheckbox },
  props: {
    activityEntry: {
      type: Object,
      required: true
    },
    uploadStatus: {
      type: Object,
      default() {
        return {
          uploadAction: false,
          counterAction: false
        }
      }
    },
  },
  data() {
    return {
      editedEntry: {},
      type_list_1: false,
      type_list_2: false,
      type_list_3: false,
      selectedImage: null,
      backEndURL: process.env.BACKEND_APP_URL,
      chipSelected: [],
      tagIds: [],
      chipSelectedIds: [],
      activityImagesRules

    }
  },
  watch: {
    activityEntry: {
      handler() {
        this.editedEntry = _.cloneDeep(this.activityEntry) },
      deep: true
    },
  },
  computed: {
    ...mapGetters('tag', ['getAllTags']),
    getBackEndURL() {
      return this.backEndURL + this.editedEntry.activityImage
    },
  },
  created() {
    this.editedEntry = _.cloneDeep(this.activityEntry)

    this.chipSelection()

    this.tagIds = this.getAllTags.map(tag => {
      return tag.identifier
    })
    this.editedEntry.activityTags.forEach(item => {
      this.chipSelectedIds.push(item.identifier)
    })

  },
  methods: {
    deleteURL() {
      const fb = new FormData()
      fb.append('deletedImage', this.editedEntry.activityImage)
      fb.append('_method', 'PUT')
      this.$emit('onDelete', fb)
    },
    onCancel() {
      return this.$router.push('/admin/activities')
    },
    onSave() {
      this.$store.commit('activity/toggleRedirectOnSave')
      this.onSaveClose()
    },
    onSaveClose(event) {

      this.uploadStatus.uploadAction = true
      const fb = new FormData()

      if (this.selectedImage) {
        fb.append('image', this.selectedImage, this.selectedImage.name)
      }

      this.chipSelectedIds.forEach(chipId => {
        fb.append('tag[]', chipId)
      })

      fb.append('title', this.editedEntry.activityTitle)
      fb.append('subtitle', this.editedEntry.activitySubtitle)
      fb.append('section_title_1', this.editedEntry.activitySectionTitle1)
      fb.append('section_description_1', this.editedEntry.activitySectionDescription1)
      fb.append('section_type_1', this.editedEntry.activitySectionType1)
      fb.append('section_title_2', this.editedEntry.activitySectionTitle2)
      fb.append('section_description_2', this.editedEntry.activitySectionDescription2)
      fb.append('section_type_2', this.editedEntry.activitySectionType2)
      fb.append('section_title_3', this.editedEntry.activitySectionTitle3)
      fb.append('section_description_3', this.editedEntry.activitySectionDescription3)
      fb.append('section_type_3', this.editedEntry.activitySectionType3)
      fb.append('_method', 'PUT')

      this.$emit('onUpdate', fb)
      this.selectedImage = null
    },
    onTagsChange() {
      this.chipSelectedIds = this.chipSelected.map(chip => {
        return this.tagIds[chip]
      })

      this.chipSelectedIds.sort(( a, b ) => a - b)
    },
    // onSubmit() {
    //   this.$store.dispatch('activity/setUploadFileStatus', true)
    //   const fb = new FormData();

    //   if (this.selectedImage) {
    //     fb.append('image', this.selectedImage, this.selectedImage.name)
    //   }

    //   fb.append('title', this.activity.activityTitle)
    //   fb.append('subtitle', this.activity.activitySubtitle)
    //   fb.append('section_title_1', this.activity.activitySectionTitle1)
    //   fb.append('section_description_1', this.activity.activitySectionDescription1)
    //   fb.append('section_type_1', this.activity.activitySectionType1)
    //   fb.append('section_title_2', this.activity.activitySectionTitle2)
    //   fb.append('section_description_2', this.activity.activitySectionDescription2)
    //   fb.append('section_type_2', this.activity.activitySectionType2)
    //   fb.append('section_title_3', this.activity.activitySectionTitle3)
    //   fb.append('section_description_3', this.activity.activitySectionDescription3)
    //   fb.append('section_type_3', this.activity.activitySectionType3)
    //   fb.append('_method', 'PUT')

    //   this.selectedImage = null

    //   this.$emit('on-submit', fb)
    // },
    onImageSelected() {
      this.uploadStatus.counterAction = true
    },
    chipSelection() {
      this.getAllTags.forEach((tag, index) => {

      this.editedEntry.activityTags.forEach(item => {
        if (item.identifier === tag.identifier) {
          this.chipSelected.push(index)
        }
      })
    })
    }
  }
}
</script>
