const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
}) // autoescape: false == permits html code in the variables *** noCache: true == forgets local machine cache to actualize with the server


server.get('/', function(req, res) {
    const about = {
        avatar_url: "https://avatars.githubusercontent.com/u/104738346?v=4",
        name: "Renato Knauer",
        role: "Desenvolvedor - Front-End",
        description: 'Desenvolvo Aplicações Web utilizando JavaScript e React, focado em me profissionalizar como Desenvolvedor Júnior. Aluno da <a target="_blank" href="https://www.rocketseat.com.br">Rocketseat</a>',
        links: [
            { name: "Github", url: "https://www.github.com/renato-knauer" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/renatoknauer/" },
            { name: "Instagram", url: "https://www.instagram.com/chnowair/" }
        ]
    }

    return res.render('about', { about }) // == { about: about } => 1st = random name; 2nd = const name
})

server.get('/portfolio', function(req, res) {
    const footer = {
        links: [
            { name: "Github", url: "https://www.github.com/renato-knauer" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/renatoknauer/" },
            { name: "Instagram", url: "https://www.instagram.com/chnowair/" }
        ]
    }

    return res.render('portfolio', { data: { items: videos, footer } })
})

server.get('/video', function(req, res) {
    const id = req.query.id
    const footer = {
        links: [
            { name: "Github", url: "https://www.github.com/renato-knauer" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/renatoknauer/" },
            { name: "Instagram", url: "https://www.instagram.com/chnowair/" }
        ]
    }

    const video = videos.find(function(video) {
        if(video.id == id) {
            return true
        }
    })

    if(!video) {
        return res.send('Video not found!')
    }

    return res.render('video', { data: { item: video, footer }})
})

server.listen(5000, function() {
    console.log('server is running')
})