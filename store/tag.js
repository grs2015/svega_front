export const state = () => ({
  tags: [],
  loading: false
})

export const actions = {
  fetchAllTags({ commit }) {
    return this.$axios.$get('/api/tags')
      .then(response => commit('setAllTags', response.data))
  },
  addTag({ commit }, newTagTitle) {
    return this.$axios.$post('/api/tags', { title: newTagTitle })
      .then(response => commit('addTag', response.data))
  },
  updateTitleTag({ commit }, tagTitleData) {
    let { id, ...tag } = tagTitleData
    return this.$axios.$post(`/api/tags/${id}`, tag)
      .then(response => commit('updateTitleTag', response.data ))
  },
  deleteTag({ commit }, tagData) {
    return this.$axios.$delete(`/api/tags/${tagData}`)
      .then(response => commit('deleteTag', response.data.identifier))
  },
  updateAllTags({ commit, state }) {
    const promiseArray = []
    state.tags.forEach(item => {
      let data = {
        title: item.tagTitle,
        progress: item.tagProgress
      }
      let promise = () => this.$axios.$put(`/api/tags/${ item.identifier }`, data)
      promiseArray.push(promise())
    })
    return Promise.all(promiseArray)
      .then(response => {
        const tags = []
        response.forEach(item => tags.push(item.data))
        commit('setAllTags', tags)
      })
  }
}

export const mutations = {
  setAllTags(state, tags) {
    state.tags = tags
  },
  addTag(state, newTagEntry) {
    state.tags.push(newTagEntry)
  },
  updateTitleTag(state, updatedTag) {
    const tag = state.tags.filter(tag => tag.identifier === updatedTag.identifier)[0]
    tag.tagTitle = updatedTag.tagTitle
  },
  deleteTag(state, id) {
    state.tags = state.tags.filter(tag => tag.identifier !== id)
  },
  updateProgressTag(state, updatedTag) {
    const tag = state.tags.filter(tag => tag.identifier === updatedTag.identifier)[0]
    tag.tagProgress = updatedTag.tagProgress
  },
  toggleLoading(state) {
    state.loading = !state.loading
  }
}

export const getters = {
  getAllTags(state) {
    return state.tags
  },
  getLoading(state) {
    return state.loading
  }
}
