import API from './apiManager'
import userSession from "./userSession"

const validate = {
  newUser(entryObject) {
    return API.getData(`users?email=${entryObject.email}`)
      .then((user) => {
        if (user.length === 0) {
          return API.saveData("users", entryObject)
            .then((user) => {
              userSession.logInUser(user.id)
              return true
            })
        } else {
          return false
        }
      })
  },
  existingUser(entryObject) {
    return API.getData(`users?email=${entryObject.email}`)
      .then((user) => {
        if (user[0] && user[0].password === entryObject.password) {
          userSession.logInUser(user[0].id)
          return true
        } else {
          return false
        }
      })
  }
}

export default validate