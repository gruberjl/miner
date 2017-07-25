const Crawler = require("simplecrawler")
const cheerio = require('cheerio')
const normalizeUrl = require('normalize-url')

const newCrawler = (url, maxDepth=10, decodeResponses=false) => {
  const crawler = Crawler(url)
  crawler.maxDepth = maxDepth
  crawler.decodeResponses = decodeResponses

  crawler.discoverResources = function(buffer, queueItem) {
    var $ = cheerio.load(buffer.toString("utf8"));

    return $("a[href]").map(function () {
        return $(this).attr("href");
    }).get();
  };

  return crawler
}

const findEmailAddresses = (body, emailAddresses=[]) => {
  const $ = cheerio.load(body)
  $('a[href^="mailto:"]').each(function(i, elem) {
    emailAddresses.push($(this).prop('href').substring(7))
  })

  return emailAddresses
}

const getEmailAddresses = (url, maxDepth=10) => new Promise((res, rej) => {
  let emailAddresses = []
  const crawler = newCrawler(url, maxDepth, true)

  crawler.on("fetchcomplete", function(queueItem, body, response) {
    emailAddresses = findEmailAddresses(body, emailAddresses)
  });

  crawler.on('complete', () => {
    res(newResponse(url, emailAddresses, 200))
  })

  crawler.start();
})

const dedupe = (array) => array.filter((item, pos) => array.indexOf(item) == pos)

const newResponse = (url='', emailAddresses=[], statusCode=500, error) => {
  emailAddresses = dedupe(emailAddresses)
  return {url, emailAddresses, statusCode, error}
}

module.exports.getEmailAddresses = (url, maxDepth = 10) => {
  if (!url)
    return Promise.reject(newResponse(url, [], 400, 'bad url'))

  return getEmailAddresses(normalizeUrl(url), maxDepth)
}
