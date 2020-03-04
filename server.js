const http = require('http')
const express = require('express')
const fs = require('fs')

var app = express();
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const notesArr = []

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/notes", function (req, res) {
    res.sendFile(__dirname + "/notes.html");
});


app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db.json", function(err, data) {
        if (err) {
            throw err;
        }
        return res.json(data)
    })
});

app.post("/api/notes", function (req, res) {
    res.sendFile(__dirname + "/db/db.json");
});

app.delete("/api/notes", function (req, res) {
    res.sendFile(__dirname + "/db/db.json");
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT, `  Go here --> http://localhost:${PORT}`);
})

