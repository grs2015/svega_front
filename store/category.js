export const state = () => ({
  categories: []
})

export const actions = {
  fetchAllCategories({ commit }) {
    return this.$axios.$get('/api/categories')
      .then(response => commit('setAllCategories', response.data))
  },
  addCategory({ commit }, newCategoryTitle) {
    return this.$axios.$post('/api/categories', { title: newCategoryTitle })
      .then(response => commit('addCategory', response.data))
  },
  updateTitleCategory({ commit }, categoryTitleData) {
    let { id, ...category } = categoryTitleData
    return this.$axios.$post(`/api/categories/${id}`, category)
      .then(response => commit('updateTitleCategory', response.data ))
  },
  deleteCategory({ commit }, categoryData) {
    return this.$axios.$delete(`/api/categories/${categoryData}`)
      .then(response => commit('deleteCategory', response.data.identifier))
  },
  updateIconCategory({ commit }, categoryIconData) {
    let { id, ...category } = categoryIconData
    return this.$axios.$post(`/api/categories/${id}`, category)
      .then(response => commit('updateIconCategory', response.data))
  },
  updateColorCategory({ commit }, categoryColorData) {
    let { id, ...category } = categoryColorData
    return this.$axios.$post(`/api/categories/${id}`, category)
     .then(response => commit('updateColorCategory', response.data))
  }
}

export const mutations = {
  setAllCategories(state, categories) {
    state.categories = categories
  },
  addCategory(state, newCategoryEntry) {
    state.categories.push(newCategoryEntry)
  },
  updateTitleCategory(state, updatedCategory) {
    const category = state.categories.filter(category => category.identifier === updatedCategory.identifier)[0]
    category.categoryTitle = updatedCategory.categoryTitle
  },
  deleteCategory(state, id) {
    state.categories = state.categories.filter(category => category.identifier !== id)
  },
  updateIconCategory(state, updatedCategory) {
    const category = state.categories.filter(category => category.identifier === updatedCategory.identifier)[0]
    category.categoryIcon = updatedCategory.categoryIcon
  },
  updateColorCategory(state, updatedCategory) {
    const category = state.categories.filter(category => category.identifier === updatedCategory.identifier)[0]
    category.categoryColor = updatedCategory.categoryColor
  }
}

export const getters = {
  getAllCategories(state) {
    return state.categories
  }
}
