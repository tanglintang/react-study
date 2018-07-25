import originJsonp from 'jsonp'

let jsonp  = (url, data, option) => {
  return new Promise((resolve, reject) => {
    originJsonp( buildURL(url, data), option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// url 拼接
function buildURL (url, data) {
  let params = []
  for (const key in data) {
    params.push(`${key}=${data[key]}`)
  }
  let param = params.join('&')
  if (url.indexOf('?') === -1) {
    url += '?' + param
  } else {
    url += '&' + param
  }
  return url
}

export default jsonp
