export const state = () => ({
  tagActivities: [],

})

export const actions = {
  fetchActivities({ commit }, tagId) {
    return this.$axios.$get(`/api/tags/${ tagId }/activities`)
      .then(response => {
        commit('setTagActivities', { tagId: tagId, data: response.data })
        return response
      })
  },
  fetchBaseData({ commit }) {
    const getMain = () => app.$axios.$get('/api/mains/1')
    const getSections = () => app.$axios.$get('/api/mains/1/sections')
    const getBenefits = () => app.$axios.$get('/api/mains/1/benefits')
    const getTags = () => app.$axios.$get('/api/mains/1/tags')
    const getOffers = () => app.$axios.$get('/api/mains/1/offers')

    return Promise.all([getMain(), getSections(), getOffers(), getTags(), getBenefits()])
      .then(response => {
        commit('main/setMain', response[0].data)
        commit('section/setAllSections', response[1].data)
        commit('category/setAllCategories', response[2].data)
        commit('tag/setAllTags', response[3].data)
        commit('benefit/setAllBenefits', response[4].data)
      })
  }

}

export const mutations = {
  setTagActivities(state, tagActivities) {
    let { tagId, data } = tagActivities
    const activityData = data.map(item => ({
      identifier: item.identifier,
      activityImage: item.activityImage,
      activityTitle: item.activityTitle,
      activitySubtitle: item.activitySubtitle
    }))
    state.tagActivities[tagId] = activityData
  }
}

export const getters = {
  getTagActivities(state) {
    return state.tagActivities
  }
}
