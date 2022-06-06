import ForbiddenError from '~/errors/ForbiddenError'
import InternalServerError from '~/errors/InternalServerError'
import NotFoundError from '~/errors/NotFoundError'

export default ({ $axios, error }) => {
  $axios.onError(e => {
    if (e.response.status === 404) {
      throw new NotFoundError(e.response.data.message)
    } else if (e.response.status === 403) {
      throw new ForbiddenError(e.response.data.message)
    } else if (e.response.status === 500) {
      throw new InternalServerError(e.response.data.message)
    }
  })
}
