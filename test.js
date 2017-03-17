const path = require('path')
const mkdirp = require('mkdirp')
const toThumbnail = require('./index.js')

const TMP = path.join(__dirname, 'tmp')
const output = path.join(TMP, 'test.png')
const url = 'http://www.pdf995.com/samples/pdf.pdf'

mkdirp.sync(TMP)

toThumbnail(url, output, {})
  .then(() => {
    console.log('done')
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
