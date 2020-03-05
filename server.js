const http = require('http')
const express = require('express')
const fs = require('fs')
const data = require("./db/db.json")

var app = express();
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"))

// const notesArr = []

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", function (req, res) {
    res.sendFile(__dirname + "/public/notes.html");
});

app.get("/api/notes", function (req, res) {
   res.json(data)
});

app.post("/api/notes", function (req, res) {
    var id;
    if (data.length === 0) {
        id = 1
    } else {
        id = data[data.length -1].id + 1
    }

    req.body.id = id
    data.push(req.body);
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(data), function(){
        
        res.json(data)
    })
});

app.delete("/api/notes/:id", function (req, res) {

    const deleted = req.params.id

    const indexPos = data.findIndex((element) => element.id === parseInt(deleted))
   
    data.splice(indexPos, 1);

    fs.writeFile(__dirname + '/db/db.json', JSON.stringify((data), null, 4), "utf8", function () {

        res.json(data);

    })

});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT, `  Go here --> http://localhost:${PORT}`);
})
