export default ({ redirect, store }) => {
  if (store.getters['user/isAuthenticated']) {
    redirect('/main')
  }
}
