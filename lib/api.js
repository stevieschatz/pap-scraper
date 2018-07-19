const request = require('request-promise-native')
const cheerio = require('cheerio')
const querystring = require('querystring');
let __this = {}


const options = {
    url: 'https://www.residentadvisor.net/clubs.aspx?ai=34',
    headers: {
        'User-Agent': 'request'
    }
}

const optionsMain = {
    url: 'https://www.residentadvisor.net',
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
            // clubs = await addLinkToForScrape(clubs)
            resolve(clubs)
        }))

    } catch(e) {
        console.log(e)
    }
}

async function parseClubsFromHtml(body) {
    let clubs = []
    const $ = cheerio.load(body)

    $('#clubs').children().children().children().children().children().each(async (index, element) => {
        const name = $(element).children().first().text().trim()
        const address = $(element).children().last().text().trim()
        const ralink = $('a', element).attr('href')
        const id = ralink ? await parseId(ralink) : ''
        const club = name && address ? { id: id, name: name , address: address, ralink: ralink } : null
        club != null ? clubs.push(club) : ''
    })

    return clubs

}

async function parseId(link) {
	const reg = new RegExp( '[?&]id=([^&#]*)', 'i' );
	let id = reg.exec(link);
    return id ? id[1]: null
}


// async function addLinkToForScrape(clubs) {

//     clubs.map(() => {
//         clubs.link
//     })


// }

// async function addLatLong(url) {
//    console.log('add lat long')
//     try {
//         return new Promise((resolve, reject) => request(url, async (err, res, body) => {
//           if(err){ return reject(err)}
//            let latLong = await parseLatLong(body)
//            clubs.lat = latLong.lat
//            clubs.lat = latLong.long
//            resolve(clubs)
//        }))

//    } catch(e) {
//        console.log(e)
//    }

//    return clubs;

// }


// async function parseLatLong(body) {
//     let latLong = {}
//     const $     = cheerio.load(body)

//     latLong.lat  =  $('#hdnLatitude').text()
//     latLong.long =  $('#hdnLongitude').text()

//     return latLong
// }

// async function parseAddress(address) {

    // address = address ? await parseAddress(address) : ''

// }

module.exports = __this
