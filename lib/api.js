const request = require('request-promise-native')
const cheerio = require('cheerio')
let __this = {}


const options = {
    url: 'https://www.residentadvisor.net/clubs.aspx?ai=34',
    headers: {
        'User-Agent': 'request'
    }
}

__this.getClubs = () => {
    console.log('hit....')
    let clubs
    try {
         return new Promise((resolve, reject) =>  request(options, async (err, res, body) => {
           if(err){ return reject(err)}
            clubs = await parseClubsFromHtml(body)
            resolve(body)
        }))

    } catch(e) {
        console.log(e)
    }
}

async function parseClubsFromHtml(body) {
    let clubs
    // console.log('working...' + body)
    const $ = cheerio.load(body)
    $.html()
    clubs = $('.clubs')
    // clubs = $.html()
    // $('div','<div id="clubs"></div>' )
    console.log(clubs)
    return body

}


module.exports = __this
