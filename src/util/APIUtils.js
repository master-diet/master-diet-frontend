import { ACCESS_TOKEN, API_BASE_URL } from '../constants'

const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
  }

  const defaults = { headers: headers }
  options = Object.assign({}, defaults, options)

  return fetch(options.url, options)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }
        return json
      })
    )
}

export function getCurrentUser () {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.')
  }

  return request({
    url: API_BASE_URL + '/user/me',
    method: 'GET'
  })
}

export function login (loginRequest) {
  return request({
    url: API_BASE_URL + '/auth/login',
    method: 'POST',
    body: JSON.stringify(loginRequest)
  })
}

export function signup (signupRequest) {
  return request({
    url: API_BASE_URL + '/auth/signup',
    method: 'POST',
    body: JSON.stringify(signupRequest)
  })
}

export function createPlan (userPlanRequest) {
  return request({
    url: API_BASE_URL + '/plan',
    method: 'POST',
    body: JSON.stringify(userPlanRequest)
  })
}

export function getAllWeightsOfUser () {
  return request({
    url: API_BASE_URL + '/stats/weight',
    method: 'GET'
  })
}

export function searchProducts (searchTerm, pageIndex, perPage) {
  return request({
    url: API_BASE_URL + '/product-browser?searchTerm=' + searchTerm + '&pageIndex=' + pageIndex + '&perPage=' + perPage,
    method: 'GET'
  })
}

export function updateWeight (updateWeightRequest) {
  return request({
    url: API_BASE_URL + '/user/weight',
    body: JSON.stringify(updateWeightRequest),
    method: 'PUT'
  })
}

export function searchActivities (searchTerm, pageIndex, perPage) {
  return request({
    url: API_BASE_URL + '/activity-browser?searchTerm=' + searchTerm + '&pageIndex=' + pageIndex + '&perPage=' + perPage,
    method: 'GET'
  })
}

export function getRecentProducts (pageIndex, perPage) {
  return request({
    url: API_BASE_URL + '/product-browser/recent-products?pageIndex=' + pageIndex + '&perPage=' + perPage,
    method: 'GET'
  })
}

export function addRecentProduct (addRecentProductRequest) {
  return request({
    url: API_BASE_URL + '/diary/add',
    method: 'POST',
    body: JSON.stringify(addRecentProductRequest)
  })
}

export function addUserActivity (addUserActivityRequest) {
  return request({
    url: API_BASE_URL + '/userActivities/add',
    method: 'POST',
    body: JSON.stringify(addUserActivityRequest)
  })
}
export function getRecentProductsForDate (date) {
  return request({
    url: API_BASE_URL + '/diary/getForDate?date=' + date,
    method: 'GET'
  })
}

export function deleteRecentProducts (deleteRecentProductsRequest) {
  return request({
    url: API_BASE_URL + '/diary/delete',
    method: 'DELETE',
    body: JSON.stringify(deleteRecentProductsRequest)
  })
}

export function deleteUserActivities (deleteUserActivitiesRequest) {
  return request({
    url: API_BASE_URL + '/userActivities/delete',
    method: 'DELETE',
    body: JSON.stringify(deleteUserActivitiesRequest)
  })
}

export function getRecentActivitiesForDate (date) {
  return request({
    url: API_BASE_URL + '/userActivities/getForDate?date=' + date,
    method: 'GET'
  })
}

export function getRecentActivities (pageIndex, perPage) {
  return request({
    url: API_BASE_URL + '/activity-browser/recent-activities?pageIndex=' + pageIndex + '&perPage=' + perPage,
    method: 'GET'
  })
}

export function getUserAchievements () {
  return request({
    url: API_BASE_URL + '/achievements',
    method: 'GET'
  })
}

export function getUserProfile () {
  return request({
    url: API_BASE_URL + '/user/profile',
    method: 'GET'
  })
}

export function getUserCaloriesStatus () {
  return request({
    url: API_BASE_URL + '/user/caloriesStatus',
    method: 'GET'
  })
}
