export function getPosts() {
  return wrapPromise(fetchPosts())
}

export function getUsers() {
  return wrapPromise(fetchUsers())
}

const delay = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

function wrapPromise(promise) {
  let status = 'pending'
  let result
  const suspender = promise.then(
    r => {
      result = r
      status = 'success'
    },
    e => {
      result = e
      status = 'error'
    }
  )

  return {
    read() {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'error') {
        throw result
      } else if (status === 'success') {
        return result
      }
    }
  }
}

function fetchPosts() {
  return delay(1000)
    .then(() => Promise.resolve([
      { id: 1, title: "123"},
      { id: 2, title: "123"},
      { id: 3, title: "123"},
    ]))
}

async function fetchUsers() {
  await delay(750)

  return await Promise.resolve(Promise.resolve([
    { id: 1, name: "123"},
    { id: 2, name: "123"},
    { id: 3, name: "123"},
  ]))
}
