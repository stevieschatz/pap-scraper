const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const port = process.env.port ||  3000
const api = require('./lib/api.js')


router.get('/health', (ctx) => {

})

router.get('/clubs', async (ctx) => {
    console.log('Clubs EP hit..')
    let html = await api.getClubs()
    // ctx.response.body = JSON.stringify(html)
    // console.log(JSON.stringify(html))

})


app.listen(port, () => {
    console.log('Listening on port 3000...')
})

app.use(router.routes())