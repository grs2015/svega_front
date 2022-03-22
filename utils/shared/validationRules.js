export const activityTitleRules = [
  v => !!v || 'Activity Title is required!',
  v => (v && v.length <= 50) || 'Activity title should be less than 50 characters'
]

export const activitySubtitleRules = [
  v => !!v || 'Activity Subtitle is required!',
  v => (v && v.length <= 70) || 'Activity title should be less than 70 characters'
]

// export const newsGalleryImageRules = [
//   v => !v || !v.some(item => item.size > 50) || 'Image size should be less than 2 MB!'
// ]

export const newsGalleryImageRules = [
  v => !v || !v.some(item => item.size > 2000000) || 'Image size should be less than 2 MB!'
]

export const activityImagesRules = [
  v => !v || !(v.size > 2000000) || 'Image size should be less than 2 MB!'
]

export const sectionPageRules = [
  v => !!v || 'Section Title is required!',
]

export const offerTitleRules = [
  v => !!v || 'Offer Title is required!',
  v => (v && v.length <= 25) || 'Offer title should be less than 25 characters'
]

export const offerDescriptionRules = [
  v => !!v || 'Offer Description is required!',
  v => (v && v.length <= 200) || 'Offer description should be less than 200 characters'
]

export const benefitTitleRules = [
  v => !!v || 'Benefit Title is required!',
  v => (v && v.length <= 25) || 'Benefit title should be less than 25 characters'
]

export const benefitDescriptionRules = [
  v => !!v || 'Benefit Description is required!',
  v => (v && v.length <= 200) || 'Benefit description should be less than 200 characters'
]

export const sloganTitleRules = [
  v => !!v || 'Slogan Title is required!',
  v => (v && v.length <= 40) || 'Slogan title should be less than 40 characters'
]

export const sloganDescriptionRules = [
  v => !!v || 'Slogan Description is required!',
  v => (v && v.length <= 500) || 'Slogan description should be less than 500 characters'
]

export const contactTextRules = [
  v => !!v || 'Data is required!',
  v => (v && v.length <= 60) || 'The string should be less than 60 characters'
]

export const contactEmailRules = [
  v => !!v || 'E-mail is required',
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]

export const contactPhoneRules = [
  v => !!v || 'Phone number  is required',
  v => /^\d[\d\s-]{10,15}$/.test(v) || 'Phone must be valid'
]

export const contactWebsiteRules = [
  v => !!v || 'Website address is required',
  v => /^\w+\.[a-zA-Z]{2,4}$/.test(v) || 'Website name must be valid'
]

export const mainImageRules = [
  v => !!v || 'Image is required',
  v => !v || !(v.size > 2000000) || 'Image size should be less than 2 MB!'
]

export const parallaxImageRules = [
  v => !(v.length == 0) || 'Images are required',
  v => !v || !(v.length > 2) || 'Max quantity of images is 2',
  v => !v || !v.some(item => item.size > 2000000) || 'Image size should be less than 2 MB!'
]

export const userFirstName = [
  v => !!v || 'User First Name is required!',
  v => (v && v.length <= 50) || 'First Name should be less than 50 characters'
]

export const userLastName = [
  v => !!v || 'User Last Name is required!',
  v => (v && v.length <= 50) || 'Last Name should be less than 50 characters'
]

export const contactNameRules = [
  v => !!v || 'Contact Name is required!',
  v => (v && v.length <= 50) || 'Contact Name should be less than 50 characters'
]

export const contactRequestRules = [
  v => !!v || 'Contact request is required!',
  v => (v && v.length <= 200) || 'Contact request should be less than 200 characters'
]

export const contactCheckRules = [
  v => !!v || 'The checkbox should be checked in order to continue'
]
