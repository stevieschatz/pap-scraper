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
            clubs = await addLinkToForScrape(clubs)
            console.log('done11' + clubs)
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


async function addLinkToForScrape(clubs) {
    console.log('addLinkToForScrape')
    let clubslist = []
    clubs.forEach(async (club) => {

        //not pushing clubs after adding lat and long
        club = await addLatLong(club)

        clubslist.push(club)

    })
    console.log('clublist' + clubslist)


    return clubslist
}

async function addLatLong(club) {
   console.log('add lat long')
   let url = optionsMain.url + club.ralink
    let clubslist = []
    try {
        // await new Promise ((res, rej) => setTimeout(function(){res()}, (Math.random() * 10000) / 2, res))

        return new Promise((resolve, reject) => request(url, async (err, res, body) => {
          if(err){ return reject(err)}
           let latLong = await parseLatLong(body)
           club.lat = latLong.lat
           club.long = latLong.long
           console.log(club)
            clubslist.push(club)
           resolve(club)

       }))

   } catch(e) {
       console.log(e)
   }

   return clublist;

}


function parseLatLong(body) {
    // console.log('Parse Lat Long')
    let latLong = {}
    const $     = cheerio.load(body)

    latLong.lat  =  $('#hdnLatitude').attr('value')
    latLong.long =  $('#hdnLongitude').attr('value')
    latLong = latLong != null ? latLong : ''
    // console.log('Parse Lat Long' + JSON.stringify(latLong))
    return latLong
}

// async function parseAddress(address) {

//     address = address ? await parseAddress(address) : ''

// }

module.exports = __this
