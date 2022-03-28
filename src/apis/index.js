import axios from 'axios'
import qs from 'qs'

export const request = (method, url, body, queryParameters, form, config) => {
  method = method.toLowerCase()
  let keys = Object.keys(queryParameters)
  config = Object.assign(
    {
      arrayFormat: 'repeat'
    },
    config
  )
  let queryUrl = url
  if (keys.length > 0) {
    queryUrl = url + '?' + qs.stringify(queryParameters, config)
  }
  // let queryUrl = url+(keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
  if (body) {
    return axios[method](queryUrl, body, config)
  } else if (method === 'get') {
    return axios[method](
      queryUrl,
      {
        params: form
      },
      config
    )
  } else {
    return axios[method](queryUrl, qs.stringify(form), config)
  }
}

const login = (username, password) => {
  const data = {
    grant_type: 'password',
    username: username,
    password: password,
    client_id: 'gateway-management',
    client_secret: '123456'
  }
  return request('post', '/oauth2/token', null, data, {})
}

const userInfo = () => {
  return request('get', '/api/admin/user-info', null, {}, null)
}

export { login, userInfo }
