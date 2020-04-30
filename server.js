const express = require('express')
const nunjucks = require('nunjucks')


const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express:server,
    autoescape: false,
    noCache: true
})

server.get('/',function(req, res){
    const about = {
        avatar_url: "https://clipartart.com/images/naruto-chibi-clipart.jpg",
        name:"João marcos",
        role:"Estudante-Pitagoras",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem est officia, harum, fuga culpa unde ea eius non fugit nisi soluta nostrum. Consequatur mollitia, laudantium atque delectus aperiam deserunt quas.",
        links: [
            {name:"Github", url:"" },
            {name:"Twitter", url:"" },
            {name:"Linkedin", url:"" },
        ]
    }

    return res.render('about', { about })
})

server.get('/portifolio',function(req, res){
    return res.render('portifolio',{items: videos})
})

server.get('/video', function(req, res){
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
    })

    if (!video) {
        return res.send("video not found")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log("server is runing")
})