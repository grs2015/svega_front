export const state = () => ({
  currentActivity: {
    sectionOneData: {},
    sectionTwoData: {}
  },
  activities: [],
  uploadStatus: false,
  addStatus: false,
  redirectOnSave: true,
  paginationIndex: 1
})

export const actions = {
  createActivity(_, formData) {
    return this.$axios.$post('/api/mains/1/activities', formData)
  },
  getActivities(_, formData) {
    return this.$axios.$get('/api/activities')
  },
  deleteActivity(_, activityIndex) {
    return this.$axios.$delete(`/api/activities/${activityIndex}`)
  },
  fetchActivity({ commit }, id) {
    return this.$axios.$get(`/api/mains/1/activities/${id}`)
      .then(response => commit('setCurrentActivity', response.data))
  },
  setUploadFileStatus({ commit }, status) {
    commit('setUploadFileStatus', status)
  },
  setAddFileStatus({ commit }, status) {
    commit('setAddFileStatus', status)
  },
  updateActivityEntry(_, formRouteData) {
    let { route, data } = formRouteData
    return this.$axios.$post(`/api/activities/${route}`, data)
  },
}

export const mutations = {
  setUploadFileStatus(state, status) {
    state.uploadStatus = status
  },
  setAddFileStatus(state, status) {
    state.addStatus = status
  },
  toggleRedirectOnSave(state) {
    state.redirectOnSave = !state.redirectOnSave
  },
  setCurrentActivity(state, activityData) {
    state.currentActivity.sectionOneData = {
      activityTitle: activityData.activityTitle,
      activitySubtitle: activityData.activitySubtitle,
      activityImage: activityData.activityImage
    },
    state.currentActivity.sectionTwoData = {
      activitySectionTitle1: activityData.activitySectionTitle1,
      activitySectionDescription1: activityData.activitySectionDescription1,
      activitySectionType1: activityData.activitySectionType1,
      activitySectionTitle2: activityData.activitySectionTitle2,
      activitySectionDescription2: activityData.activitySectionDescription2,
      activitySectionType2: activityData.activitySectionType2,
      activitySectionTitle3: activityData.activitySectionTitle3,
      activitySectionDescription3: activityData.activitySectionDescription3,
      activitySectionType3: activityData.activitySectionType3,
    }
  },
  setAllActivities(state, activitiesData) {
    activitiesData.forEach(item => {
      state.activities.push({
        identifier: item.identifier,
        sectionOneData: {
          activityTitle: item.activityTitle,
          activitySubtitle: item.activitySubtitle,
          activityImage: item.activityImage
        },
        sectionTwoData: {
          activitySectionTitle1: item.activitySectionTitle1,
          activitySectionDescription1: item.activitySectionDescription1,
          activitySectionTitle2: item.activitySectionTitle2,
          activitySectionDescription2: item.activitySectionDescription2,
          activitySectionTitle3: item.activitySectionTitle3,
          activitySectionDescription3: item.activitySectionDescription3,
        }
      })
    })
  },
  paginationIndex(state, index) {
    state.paginationIndex = index + 1
  }
}

export const getters = {
  getAllActivities(state) {
    return state.activities
  },
  getPaginationIndex(state) {
    return state.paginationIndex
  }
}
