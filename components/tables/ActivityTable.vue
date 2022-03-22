<template>
  <div>

      <v-data-table
        :headers="activitiesHeader"
        :items="activityTableData"
        :loading="loading"
        sort-by="activity_id"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Activities</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialogAddItem" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" class="mb-2" v-bind="attrs" v-on="on" :disabled="$store.state.user.isRegularUser" >
                  Add Activity
                </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class="text-h5">New Activity</span>
                </v-card-title>
                <v-card-text>

                  <activity-item-create
                    @valid="validationForm"
                    @newEntryTitle="setNewTitle"
                    @newEntrySubtitle="setNewSubtitle"
                    @newTag="setNewTag"
                  >
                  </activity-item-create>

                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="close">Cancel</v-btn>
                  <v-btn color="red darken-1" text @click="save" :disabled="!formValid">Save</v-btn>
                </v-card-actions>

              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDeleteItem" max-width="500px">
              <v-card>
                <v-card-title class="text-h6"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template #item.activity_tag="{ item }">

          <v-chip
            v-for="(element, index) in item.activity_tag"
            :key="index"
            color="primary"
            class="ma-2"
            text-color="white"
            label
          >
            <v-icon
              dark
              left
              small
            >
              mdi-tag
            </v-icon>
              {{ element.tagTitle }}
          </v-chip>

        </template>

        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon
                class="mr-2"
                @click="editItem(item)"
                color="green"
                v-on="on"
                v-bind="attrs"
                :disabled="$store.state.user.isRegularUser"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Edit the Entry</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon
                @click="deleteItem(item)"
                color="red"
                v-on="on"
                v-bind="attrs"
                :disabled="$store.state.user.isRegularUser"
              >
                mdi-delete
              </v-icon>
            </template>
            <span>Delete Entry</span>
          </v-tooltip>


        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>

  </div>
</template>

<script>
import ActivityItemCreate from '@/components/UI/ActivityItemCreate.vue'

export default {
  components: { ActivityItemCreate },
  props: {
    activities: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activityTableData: [], // Data to be placed into table
      activitiesHeader: [
        {
          text: "Title",
          value: "activity_title",
          width: "35%"
        },
        {
          text: "Tags",
          value: "activity_tag",
          width: "auto",
          sortable: false
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          width: "100"
        },
      ],
      dialogAddItem: false, // Visbility of AddItem Dialog
      dialogDeleteItem: false, // Visibility of DeleteItem Dialog
      editedIndex: -1,
      loading: false, // Table data loading indicator

      editedItem: {
        activity_title: '',
        activity_subtitle: '',
        activity_tag: []
      },
      defaultItem: {
        activity_title: '',
        activity_subtitle: '',
        activity_tag: []
      },
      formValid: false,
      newTitle: '',
      newSubtitle: '',
      newTag: '',
    };
  },
  created() {
    this.initialize(this.activities);
  },
  methods: {
    initialize(activityList) {
      for (let k of Object.keys(activityList)) {
        this.activityTableData[k] = {
          activity_id: activityList[k].identifier,
          activity_title: activityList[k].activityTitle,
          activity_subtitle: activityList[k].activitySubtitle,
          activity_tag: this.tagFormat(activityList[k].activityTags)
        };
      }
    },
    tagFormat(tagList) {
      const tags = []
      tagList.forEach(item => {
        tags.push({
          tagId: item.identifier,
          tagTitle: item.tagTitle
        })
      })
      return tags
    },
    getBackendData() {
      this.loading = true;
      this.$store.dispatch('activity/getActivities')
        .then(response => {
          const activitiesData = { ...response.data }
          this.activityTableData = []
          this.initialize(activitiesData)
          this.loading = false
        })
    },
    editItem(item) {
      this.editedIndex = item.activity_id
      // this.$store.dispatch('activity/setActivity', this.editedIndex)
      this.$router.push(`/admin/activities/edit/${this.editedIndex}`)
    },
    deleteItem(item) {
      this.editedIndex = item.activity_id
      this.dialogDeleteItem = true
    },
    deleteItemConfirm() {
      this.$store.dispatch('activity/deleteActivity', this.editedIndex)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The activity has been deleted!', status: 'success'}))
        .catch(e => {
          this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'})
        })
        .then(() => this.closeDelete())

      this.getBackendData();
    },
    close() {
      this.dialogAddItem = false;
      this.editedItem = {...this.defaultItem}
      // this.editedIndex = -1
    },
    closeDelete() {
      this.dialogDeleteItem = false;
      this.editedItem = {...this.defaultItem}
    },
    save() {
      const activityData = {
        title: this.newTitle,
        subtitle: this.newSubtitle,
        tag: this.newTag
      }
      this.$store.dispatch('activity/createActivity', activityData)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The activity has been created!', status: 'success'}))
        .catch(e => {
          this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'})
        })
        .then(() => this.close())

      this.getBackendData();
    },
    validationForm(val) {
      this.formValid = val
    },
    setNewTitle(data) {
      this.newTitle = data
    },
    setNewSubtitle(data) {
      this.newSubtitle = data
    },
    setNewTag(data) {
      this.newTag = data
    }
  },

};
</script>
