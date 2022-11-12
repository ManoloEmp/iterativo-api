class TypeParamError extends Error {
  constructor (paramName, type) {
    super(`"${paramName}" must be a ${type}`)
    this.name = 'ValidationError'
    this.type = type
  }
}

class MissingParamError extends Error {
  constructor (paramName) {
    super(`"${paramName}" is required`)
    this.name = 'ValidationError'
  }
}

class PrototypeError extends Error {
  constructor (paramName, prototype) {
    super(`"${paramName}" must have "${prototype} prototype"`)
    this.name = 'prototypeError'
  }
}

class ReadError extends Error {
  constructor (paramName, prototype) {
    super(`"${paramName}" is read only property`)
    this.name = 'ReadError'
  }
}

module.exports = {
  TypeParamError,
  MissingParamError,
  PrototypeError,
  ReadError
}
