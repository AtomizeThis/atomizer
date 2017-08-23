const axios = require('axios')
const cheerio = require('cheerio')

const fetch = (article) => (
    axios.get(`https://en.wikipedia.org/wiki/${article}`)
    // cheerio provides jquery functionality
    // loads html into virtual DOM => '$'
        .then(res => {
            const html = res.data
            const $ = cheerio.load(html)
            // send first paragraph to front end
            return bundle(article,
                isAmbiguous($)
                    // if article is ambigous return possibilites
                    ? 'This is a disambiguation page!'
                    // otherwise return related articles
                    : grabFirstParagraph($)
            )
        })
)

// bundle format for D3 rendering
const bundle = (article, text) => ({
    title: article,
    firstParagraph: text
})

// div indicating ambiguous query. If array is empty, query was non-ambigous
const isAmbiguous = ($) => Array.from($('#disambigbox')).length > 0

// finds first paragraph in a given context
const grabFirstParagraph = ($) => {
    return $('p').first().text()
}

module.exports = fetch;