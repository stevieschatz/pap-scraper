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
            resolve(clubs)
        }))

    } catch(e) {
        console.log(e)
    }
}

async function parseClubsFromHtml(body) {
    let clubs = []
    const $ = cheerio.load(body)
    let count = 0
    $('#clubs').children().children().children().children().children().each((index, element) => {
        ++count
        const name = $(element).children().first().text().trim()
        const address = $(element).children().last().text().trim()
        // address = address ? await parseAddress(address) : ''
        const ralink = $('a', element).attr('href')
        //TODO parse id
        const club = name && address ? { name: name , address: address, ralink: ralink } : null
        club != null ? clubs.push(club) : ''
    })

    return clubs

}

// async function parseClubsFromHtml(address) {

//     address
// }



module.exports = __this
