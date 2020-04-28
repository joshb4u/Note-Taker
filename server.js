const http = require('http')
const express = require('express')
const fs = require('fs')
const data = require('./db/db.json')

let app = express();
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", function (req, res) {
    res.sendFile(__dirname + "/public/notes.html");
});


//api routes
app.get("/api/notes", function (req, res) {
    res.json(data)
});

app.post("/api/notes", function (req, res) {

    let id;

    if (data.length === 0) {
        id = 1;
    } else {
        id = data[data.length - 1].id + 1;
    }

    let newNote = req.body

    newNote.id = id;


    data.push(newNote)

    // console.log(data);

    fs.writeFile(__dirname + '/db/db.json', JSON.stringify((data), null, 4), "utf8", function () {

        res.json(data);

    })
});

app.delete("/api/notes/:id", function (req, res) {

    const chosen = req.params.id

    const indexPos = data.findIndex((element) => element.id === parseInt(chosen))
   
    data.splice(indexPos, 1);

    fs.writeFile(__dirname + '/db/db.json', JSON.stringify((data), null, 4), "utf8", function () {

        res.json(data);

    })

});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})