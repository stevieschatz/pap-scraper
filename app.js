const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const port = process.env.port ||  3000
const api = require('./lib/api.js')


router.get('/health', (ctx) => {
    ctx.response.body = 200;
})

router.get('/clublist', async (ctx) => {
    console.log('Clubs EP hit..')
    //TODO add area
    let clubs = await api.getClubs()
    ctx.response.body = JSON.stringify(clubs)
})


app.listen(port, () => {
    console.log('Listening on port 3000...')
})

app.use(router.routes())