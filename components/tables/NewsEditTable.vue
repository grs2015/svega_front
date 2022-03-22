<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card flat outlined>
          <v-card-title>
            News Basic Information
          </v-card-title>
          <v-card-text>
            <v-row no-gutters align="center">
              <v-col cols="9" class="mr-2">
                <v-text-field
                  placeholder="News Title"
                  autofocus
                  hint="Update the news title"
                  persistent-hint
                  v-model="editedEntry.blogTitle"
                >
                 <template #prepend-inner>
                  <v-icon color="primary">
                    mdi-pencil
                   </v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col>
                <v-menu
                  v-model="pickerMenu"
                  :close-on-content-click="false"
                  :nudge-right="0"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedEntry.blogDate"
                      hint="Choose the date"
                      persistent-hint
                      clearable
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedEntry.blogDate"
                    @input="pickerMenu = false"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  placeholder="News description"
                  hint="Update the news description"
                  persistent-hint
                  v-model="editedEntry.blogDescription"
                 >
                  <template #prepend-inner>
                    <v-icon color="primary">
                      mdi-text-box
                     </v-icon>
                  </template>
                </v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  placeholder="News detailed description"
                  hint="Update the news detailed description"
                  persistent-hint
                  v-model="editedEntry.blogDescriptionFull"
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
          <v-divider class="mx-4"></v-divider>
          <v-card-title>
            News Category
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-chip-group
                  @change="onCategoriesChange"
                  v-model="chipSelected"
                  multiple
                  column
                >
                  <v-chip v-for="category in getAllCategories"
                    :key="category.identifier"
                    :active-class="category.categoryColor"
                    text-color="white"
                    label
                  >
                    {{ category.categoryTitle }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-title>
              News Image Gallery
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  @change="onImageSelected"
                  v-model="selectedImages"
                  :loading="uploadStatus.uploadAction"
                  :counter="uploadStatus.counterAction"
                  show-size
                  persistent-placeholder
                  multiple
                  accept="image/*"
                  label="News Image Gallery"
                  prepend-icon="mdi-camera"
                  hint="Size of each file can't exceed 2MB"
                  :rules="newsGalleryImageRules"
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
          </v-card-text>

          <div v-if="editedEntry.blogImages">
            <v-card-title>
              Images in Gallery
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col v-for="image in newsImages" :key="image" cols="4">
                  <v-img
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

    <!-- <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="editedEntry.blogTitle"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea
          v-model="editedEntry.blogDescription"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-menu
          v-model="pickerMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="editedEntry.blogDate"
              label="Choose the date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="editedEntry.blogDate"
            @input="pickerMenu = false"
          ></v-date-picker>
      </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-chip-group
          @change="onCategoriesChange"
          v-model="chipSelected"
          multiple
          column
        >
          <v-chip v-for="category in getAllCategories"
            :key="category.identifier"
            :active-class="category.categoryColor"
            text-color="white"
            label
          >
            {{ category.categoryTitle }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-file-input
            @change="onImageSelected"
            v-model="selectedImages"
            :loading="uploadStatus.uploadAction"
            :counter="uploadStatus.counterAction"
            show-size
            persistent-placeholder
            persistent-hint
            multiple
            accept="image/*"
            label="News Image Gallery"
            prepend-icon="mdi-camera"
            hint="Size of each file can't exceed 2MB"
            :rules="newsGalleryImageRules"
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
    <v-row v-if="newsImages">
      <v-col v-for="image in newsImages" :key="image" cols="4">
        <v-img
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
    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn text @click="onCancel">Close</v-btn>
        <v-btn text color="red darken-1" @click="onSave">Save</v-btn>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { newsGalleryImageRules } from '@/utils/shared/validationRules.js'

export default {
  props: {
    newsEntry: {
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
      selectedImages: [],
      editedEntry: {},
      pickerMenu: false,
      chipSelected: [],
      categoryIds: [],
      chipSelectedIds: [],
      newsGalleryImageRules,
      backEndURL: process.env.BACKEND_APP_URL,
    }
  },
  watch: {
    newsEntry: {
      handler() {
        this.editedEntry = _.cloneDeep(this.newsEntry) },
      deep: true
    }
  },
  computed: {
    ...mapGetters('category', ['getAllCategories']),
    newsImages() {
      //NOTE - Проверка в ситуации, когда происходит перезагрузка страницы, а propsов от родителя нет
      return (this.editedEntry.blogImages) ? [...(this.editedEntry.blogImages).split(',')] : []
    }
  },
  created() {
    this.editedEntry = _.cloneDeep(this.newsEntry)
    this.chipSelection()

    this.categoryIds = this.getAllCategories.map(category => {
      return category.identifier
    })
    this.editedEntry.blogCategories.forEach(item => {
      this.chipSelectedIds.push(item.identifier)
    })
  },
  methods: {
    getBackEndURL(image) {
      return this.backEndURL + image
    },
    deleteURL(image) {
      const fb = new FormData()
      fb.append('deletedImage',image)
      fb.append('_method', 'PUT')
      this.$emit('onDelete', fb)
    },
    onCancel() {
      return this.$router.push('/admin/news')
    },
    onSave() {
      this.$store.commit('news/toggleRedirectOnSave')
      this.onSaveClose()
    },
    onSaveClose(event) {

      this.uploadAction = true
      const fb = new FormData()

      if (this.selectedImages.length > 0 ) {
        this.selectedImages.forEach(imageFile => {
          fb.append('images[]', imageFile)
        })
      }

      if (this.chipSelectedIds.length > 0 ) {
        this.chipSelectedIds.forEach(chipId => {
          fb.append('category[]', chipId)
        })
      }

      fb.append('title', this.editedEntry.blogTitle)
      fb.append('description', this.editedEntry.blogDescription)
      fb.append('description_full', this.editedEntry.blogDescriptionFull)
      fb.append('date', this.editedEntry.blogDate)
      fb.append('_method', 'PUT')

      this.$emit('onUpdate', fb)
      this.selectedImages.length = 0
    },
    onCategoriesChange() {
      this.chipSelectedIds = this.chipSelected.map(chip => {
        return this.categoryIds[chip]
      })

      this.chipSelectedIds.sort(( a, b ) => a - b)
    },
    onImageSelected() {
      this.uploadStatus.counterAction = true
    },
    chipSelection() {
      this.getAllCategories.forEach((category, index) => {
      this.editedEntry.blogCategories.forEach(item => {
        if (item.identifier === category.identifier) {
          this.chipSelected.push(index)
        }
      })
    })
    }
  }

}

</script>
