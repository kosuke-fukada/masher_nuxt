export default class ValidationError extends Error {
  constructor(message = '', errors = {}) {
    super(message)
    this._errors = errors
  }

  get errors() {
    return this._errors
  }
}
