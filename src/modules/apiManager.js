const api = {
  getData(resource) {
    return fetch(`http://localhost:8088/${resource}`)
      .then(response => response.json())
  },
  saveData(resource, entryObject) {
    return fetch(`http://localhost:8088/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entryObject)

    })
    .then(response => response.json())
  },
  editData(resource, entryObject, id) {
    return fetch(`http://localhost:8088/${resource}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entryObject)
    })
    .then(response => response.json())
  },
  deleteData(resource, id) {
    return fetch(`http://localhost:8088/${resource}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
  }
}

export default api