const request = require('request')
const fs = require('fs')
const os = require('os')
const path = require('path')
const uuid = require('uuid')
const filepreview = require('filepreview')

function download (url, output) {
  return new Promise((resolve, reject) => {
    request(url)
      .pipe(fs.createWriteStream(output))
      .on('finish', resolve)
      .on('error', reject)
  })
}

function makePreview (input, output, options) {
  options = Object.assign({
    width: null,
    height: null
  }, options || {})

  return new Promise((resolve, reject) => {
    filepreview.generate(input, output, options, (err) => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}

module.exports = function toThumbnail (url, output, options) {
  let extension = path.extname(url)

  let temp = path.join(os.tmpdir(), uuid.v4() + extension)

  return download(url, temp)
    .then(() => {
      return makePreview(temp, output, options)
    })
}
