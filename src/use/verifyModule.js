"use strict"

//throws an error if mod does not have all the required functions

module.exports = (mod, funcs) => {
  var missing = []

  funcs.forEach((func) => {
    if (!mod[func] || typeof mod[func] != 'function')
      missing.push(func)
  })

  if (missing.length > 0)
    throw new Error("Express-login module missing necessary functions: " + missing.join(", "))
}
