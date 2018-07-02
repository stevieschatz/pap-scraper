const request = require('request-promise-native')

 async function getClubs () {
     console.log('test')
     let html
    try {
         await new Promise((resolve, reject) =>  request('https://www.residentadvisor.net/clubs.aspx?ai=34', (err, res, body) => {
           if(err){ return err}

            html = 'test1'

        }))

        resolve()
    } catch(e) {
        console.log(e)
    }

    return  html
}


module.exports = getClubs()
