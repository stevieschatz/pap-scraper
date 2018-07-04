const request = require('request-promise-native')
let __this = {}

const options = {
    url: 'https://www.residentadvisor.net/clubs.aspx?ai=34',
    headers: {
        'User-Agent': 'request'
    }
}

__this.getClubs = () => {
    console.log('getClubs hit....')
    try {
         return new Promise((resolve, reject) =>  request(options, (err, res, body) => {
           if(err){ return reject(err)}
            resolve(body)
        }))

    } catch(e) {
        console.log(e)
    }
}


module.exports = __this
