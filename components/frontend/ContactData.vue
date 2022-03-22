<template>
  <div>
    <v-list color="transparent" dark dense>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-body-2 font-weight-regular">
            {{ data.mainCompanyName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="(item, index) in contactData" :key="index">
        <v-list-item-icon>
          <v-icon dark>
            {{ item.icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-subtitle class="text-body-2 font-weight-light">
            {{ item.data }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-body-2 font-weight-regular">
            {{ data.mainCompanyData }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      contactData: [
        {
          icon: "mdi-map-marker-outline",
          data: this.data.mainAddress
        },
        {
          icon: "mdi-phone-outline",
          data: this.data.mainPhone
        },
        {
          icon: "mdi-email-outline",
          data: this.data.mainEmail
        },
        {
          icon: "mdi-web",
          data: this.data.mainWebsite
        }
      ]
    }
  },
}
</script>
