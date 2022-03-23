import { format } from 'date-fns'

export const state = () => ({
  deletedActivityTableData: [],
  deletedNewsTableData: [],
  deletedCategoryTableData: [],
  deletedTagTableData: [],
  deletedOfferTableData: [],
  deletedUserTableData: [],
  deletedRequestTableData: []
})

export const actions = {
  fetchDeletedActivities({ commit, state }) {
    return this.$axios.$get('/api/activities?trashed=1')
      .then(response => {
        response.message ? state.deletedActivityTableData.length = 0 : commit('setDeletedActivities', response.data)
      })
  },
  restoreActivityData({ commit, state }, restoreIds) {
    restoreIds.sort((a, b) => a - b)
    const queueIds = restoreIds.join(',')
    return this.$axios.$post(`/api/activities/restore?ids=${ queueIds }`)
      .then(response => {
        response.message ? state.deletedActivityTableData.length = 0 : commit('setDeletedActivities', response.data)
      })
  },
  deleteActivityData({ commit, state }, restoreIds) {
    restoreIds.sort((a, b) => a - b)
    const queueIds = restoreIds.join(',')
    return this.$axios.$post(`/api/activities/delete?ids=${ queueIds }`)
      .then(response => {
        response.message ? state.deletedActivityTableData.length = 0 : commit('setDeletedActivities', response.data)
      })
  },
  // --------------------------------------------------------------
  fetchDeletedNews({ commit, state }) {
    return this.$axios.$get('/api/blogs?trashed=1')
      .then(response => {
        response.message ? state.deletedNewsTableData.length = 0 : commit('setDeletedNews', response.data)
      })
  },
  restoreNewsData({ commit, state }, restoreIds) {
    restoreIds.sort((a, b) => a - b)
    const queueIds = restoreIds.join(',')
    return this.$axios.$post(`/api/blogs/restore?ids=${ queueIds }`)
      .then(response => {
        response.message ? state.deletedNewsTableData.length = 0 : commit('setDeletedNews', response.data)
      })
  },
  deleteNewsData({ commit, state }, restoreIds) {
    restoreIds.sort((a, b) => a - b)
    const queueIds = restoreIds.join(',')
    return this.$axios.$post(`/api/blogs/delete?ids=${ queueIds }`)
      .then(response => {
        response.message ? state.deletedNewsTableData.length = 0 : commit('setDeletedNews', response.data)
      })
  },
  // ---------------------------------------------------------------
  fetchDeletedCategories({ commit, state }) {
    return this.$axios.$get('/api/categories?trashed=1')
      .then(response => {
        response.message ? state.deletedCategoryTableData.length = 0 : commit('setDeletedCategories', response.data)
      })
  },
  restoreCategoryData({ commit, state }, restoreIds) {
    restoreIds.sort((a, b) => a - b)
    const queueIds = restoreIds.join(',')
    return this.$axios.$post(`/api/categories/restore?ids=${ queueIds }`)
      .then(response => {
        response.message ? state.deletedCategoryTableData.length = 0 : commit('setDeletedCategories', response.data)
      })
  },
  deleteCategoryData({ commit, state }, restoreIds) {
    restoreIds.sort((a, b) => a - b)
    const queueIds = restoreIds.join(',')
    return this.$axios.$post(`/api/categories/delete?ids=${ queueIds }`)
      .then(response => {
        response.message ? state.deletedCategoryTableData.length = 0 : commit('setDeletedCategories', response.data)
      })
  },
  // ---------------------------------------------------------------
  fetchDeletedTags({ commit, state }) {
    return this.$axios.$get('/api/tags?trashed=1')
      .then(response => {
        response.message ? state.deletedTagTableData.length = 0 : commit('setDeletedTags', response.data)
      })
  },
  restoreTagData({ commit, state }, restoreIds) {
    restoreIds.sort((a, b) => a - b)
    const queueIds = restoreIds.join(',')
    return this.$axios.$post(`/api/tags/restore?ids=${ queueIds }`)
      .then(response => {
        response.message ? state.deletedTagTableData.length = 0 : commit('setDeletedTags', response.data)
      })
  },
  deleteTagData({ commit, state }, restoreIds) {
    restoreIds.sort((a, b) => a - b)
    const queueIds = restoreIds.join(',')
    return this.$axios.$post(`/api/tags/delete?ids=${ queueIds }`)
      .then(response => {
        response.message ? state.deletedTagTableData.length = 0 : commit('setDeletedTags', response.data)
      })
  },
  // ----------------------------------------------------------------
  fetchDeletedOffers({ commit, state }) {
    return this.$axios.$get('/api/offers?trashed=1')
      .then(response => {
        response.message ? state.deletedOfferTableData.length = 0 : commit('setDeletedOffers', response.data)
      })
  },
  restoreOfferData({ commit, state }, restoreIds) {
    restoreIds.sort((a, b) => a - b)
    const queueIds = restoreIds.join(',')
    return this.$axios.$post(`/api/offers/restore?ids=${ queueIds }`)
      .then(response => {
        response.message ? state.deletedOfferTableData.length = 0 : commit('setDeletedOffers', response.data)
      })
  },
  deleteOfferData({ commit, state }, restoreIds) {
    restoreIds.sort((a, b) => a - b)
    const queueIds = restoreIds.join(',')
    return this.$axios.$post(`/api/offers/delete?ids=${ queueIds }`)
      .then(response => {
        response.message ? state.deletedOfferTableData.length = 0 : commit('setDeletedOffers', response.data)
      })
  },
  // -------------------------------------------------------------------
  fetchDeletedUsers({ commit, state }) {
    return this.$axios.$get('/api/users?trashed=1')
      .then(response => {
        response.message ? state.deletedUserTableData.length = 0 : commit('setDeletedUsers', response.data)
      })
  },
  restoreUserData({ commit, state }, restoreIds) {
    restoreIds.sort((a, b) => a - b)
    const queueIds = restoreIds.join(',')
    return this.$axios.$post(`/api/users/restore?ids=${ queueIds }`)
      .then(response => {
        response.message ? state.deletedUserTableData.length = 0 : commit('setDeletedUsers', response.data)
      })
  },
  deleteUserData({ commit, state }, restoreIds) {
    restoreIds.sort((a, b) => a - b)
    const queueIds = restoreIds.join(',')
    return this.$axios.$post(`/api/users/delete?ids=${ queueIds }`)
      .then(response => {
        response.message ? state.deletedUserTableData.length = 0 : commit('setDeletedUsers', response.data)
      })
  },
  // -------------------------------------------------------------------
  fetchDeletedRequests({ commit, state }) {
    return this.$axios.$get('/api/contacts?trashed=1')
      .then(response => {
        response.message ? state.deletedRequestTableData.length = 0 : commit('setDeletedRequests', response.data)
      })
  },
  restoreRequestData({ commit, state }, restoreIds) {
    restoreIds.sort((a, b) => a - b)
    const queueIds = restoreIds.join(',')
    return this.$axios.$post(`/api/contacts/restore?ids=${ queueIds }`)
      .then(response => {
        response.message ? state.deletedRequestTableData.length = 0 : commit('setDeletedRequests', response.data)
      })
  },
  deleteRequestData({ commit, state }, restoreIds) {
    restoreIds.sort((a, b) => a - b)
    const queueIds = restoreIds.join(',')
    return this.$axios.$post(`/api/contacts/delete?ids=${ queueIds }`)
      .then(response => {
        response.message ? state.deletedRequestTableData.length = 0 : commit('setDeletedRequests', response.data)
      })
  },
}

export const mutations = {
  setDeletedActivities(state, deletedActivities) {
    state.deletedActivityTableData.length = 0
    for (let k of Object.keys(deletedActivities)) {
      state.deletedActivityTableData[k] = {
        activity_id: deletedActivities[k].identifier,
        activity_title: deletedActivities[k].activityTitle,
        activity_subtitle: deletedActivities[k].activitySubtitle,
      };
    }
  },
  setDeletedNews(state, deletedNews) {
    state.deletedNewsTableData.length = 0
    for (let k of Object.keys(deletedNews)) {
      state.deletedNewsTableData[k] = {
        news_id: deletedNews[k].identifier,
        news_title: deletedNews[k].blogTitle,
        news_date: format(new Date(deletedNews[k].blogEntryUpdatedAt), 'dd MMM y'),
      };
    }
  },
  setDeletedCategories(state, deletedCategories) {
    state.deletedCategoryTableData.length = 0
    for (let k of Object.keys(deletedCategories)) {
      state.deletedCategoryTableData[k] = {
        category_id: deletedCategories[k].identifier,
        category_title: deletedCategories[k].categoryTitle,
        category_color: deletedCategories[k].categoryColor,
        category_icon: deletedCategories[k].categoryIcon,
      };
    }
  },
  setDeletedTags(state, deletedTags) {
    state.deletedTagTableData.length = 0
    for (let k of Object.keys(deletedTags)) {
      state.deletedTagTableData[k] = {
        tag_id: deletedTags[k].identifier,
        tag_title: deletedTags[k].tagTitle,
      };
    }
  },
  setDeletedOffers(state, deletedOffers) {
    state.deletedOfferTableData.length = 0
    for (let k of Object.keys(deletedOffers)) {
      state.deletedOfferTableData[k] = {
        offer_id: deletedOffers[k].identifier,
        offer_title: deletedOffers[k].offerTitle,
        offer_icon: deletedOffers[k].offerIcon,
      };
    }
  },
  setDeletedUsers(state, deletedUsers) {
    state.deletedUserTableData.length = 0
    for (let k of Object.keys(deletedUsers)) {
      state.deletedUserTableData[k] = {
        user_id: deletedUsers[k].identifier,
        user_first_name: deletedUsers[k].userFirstName,
        user_last_name: deletedUsers[k].userLastName,
        user_role: deletedUsers[k].userRole,
        user_email: deletedUsers[k].userEmail,
      };
    }
  },
  setDeletedRequests(state, deletedRequests) {
    state.deletedRequestTableData.length = 0
    for (let k of Object.keys(deletedRequests)) {
      state.deletedRequestTableData[k] = {
        request_id: deletedRequests[k].identifier,
        request_name: deletedRequests[k].contactName,
        request_email: deletedRequests[k].contactEmail,
        request_date: format(new Date(deletedRequests[k].contactDate), 'dd MMM y')
      };
    }
  }
}

export const getters = {
  getAllDeletedActivities(state) {
    return state.deletedActivityTableData
  }
}
