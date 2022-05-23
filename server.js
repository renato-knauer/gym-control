const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()

server.use(routes)
server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
}) // autoescape: false == permits html code in the variables *** noCache: true == forgets local machine cache to actualize with the server

server.listen(5000, function() {
    console.log('server is running')
})