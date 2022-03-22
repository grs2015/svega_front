export default function ({ app, redirect }) {
  if (!app.$auth.user.verifiedAt) {
    redirect('/admin')
  }
}
