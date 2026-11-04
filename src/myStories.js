export function getToken() {
  let token = localStorage.getItem('ownerToken')
  if (!token) {
    token = crypto.randomUUID()
    localStorage.setItem('ownerToken', token)
  }
  return token
}

export function getMyStories() {
  return JSON.parse(localStorage.getItem('myStories') || '[]')
}

export function addMyStory(id) {
  const list = getMyStories()
  list.push(id)
  localStorage.setItem('myStories', JSON.stringify(list))
}

export function removeMyStory(id) {
  const list = getMyStories().filter((x) => x !== id)
  localStorage.setItem('myStories', JSON.stringify(list))
}