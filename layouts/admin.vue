<template>
  <v-app id="inspire">
    <v-navigation-drawer
      app
      permanent
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar color="red">
            <span class="white--text">CJ</span>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>
              Hello, {{ $auth.user.userFirstName }}!
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $auth.user.userEmail }}
            </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-menu bottom left offset-y>
                <template v-slot:activator="{ attrs, on }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list dense nav>
                  <v-list-item-group v-model="profileMenuItem" color="primary">
                    <v-list-item nuxt to="/admin/account">
                      <v-list-item-title>Edit Profile</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$auth.logout()">
                      <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item-group v-model="adminMenuItem" color="primary">
          <v-list-item nuxt exact to="/admin">
            <v-list-item-icon>
              <v-icon>mdi-home-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Svega Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt exact to="/admin/activities" :disabled="!isVerified">
            <v-list-item-icon>
              <v-icon>mdi-book-open-page-variant-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Activities</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt exact to="/admin/news" :disabled="!isVerified">
            <v-list-item-icon>
              <v-icon>mdi-newspaper-variant-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>News</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt exact to="/admin/categories" :disabled="!isVerified || isRegular || isManager">
            <v-list-item-icon>
              <v-icon>mdi-shape-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Categories</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt exact to="/admin/tags" :disabled="!isVerified || isRegular || isManager">
            <v-list-item-icon>
              <v-icon>mdi-tag-multiple-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Tags</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt exact to="/admin/main" :disabled="!isVerified || isRegular || isManager">
            <v-list-item-icon>
              <v-icon>mdi-application-cog-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Main page data</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt exact to="/admin/requests" :disabled="!isVerified || isRegular || isEditor">
            <v-list-item-icon>
              <v-icon>mdi-currency-eur</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Customer requests</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt exact to="/admin/users" :disabled="!isVerified || !isAdmin">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt exact to="/admin/restore" :disabled="!isVerified || !isAdmin">
            <v-list-item-icon>
              <v-icon>mdi-delete-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Trash / Restore Data</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list-item-group>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item nuxt @click="$auth.logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar app>
      <v-toolbar-title>Svega Admininstration Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>

      <div v-if="$auth.loggedIn">
        <v-btn color="primary" @click="$auth.logout()" class="mr-2">Logout</v-btn>
      </div>
      <div v-else>
        <v-btn color="primary" nuxt to="/auth" class="mr-2">Login</v-btn>
        <v-btn color="primary" nuxt to="/register" class="mr-2">Register</v-btn>
        <v-btn color="primary" nuxt to="/forgotpassword" class="mr-2">Reset Password</v-btn>

      </div>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <Nuxt />
        <the-snack-bar></the-snack-bar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'admin',
  data() {
    return {
      profileMenuItem: 0,
      adminMenuItem: 0,
    }
  },
  computed: {
    isVerified() {
      return this.$auth.user.verifiedAt
    },
    isAdmin() {
      return this.$auth.user.userRole === 'admin'
    },
    isRegular() {
      return this.$auth.user.userRole === 'regular'
    },
    isEditor() {
      return this.$auth.user.userRole === 'editor'
    },
    isManager() {
      return this.$auth.user.userRole === 'manager'
    }
  },
  // created() {
  //   this.$store.dispatch('fetchBasicData')
  // }
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
