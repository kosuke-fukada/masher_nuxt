export default class ForbiddenError extends Error {
  constructor(message = '') {
    super(message)
  }
}
