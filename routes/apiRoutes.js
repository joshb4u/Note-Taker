//Dependencies
const noteData = require("../db/db.json")
let router = require("express").Router();

//Deletes Test page on load using splice, posting & getting  notes still functional 
const result = noteData.find( ({ text }) => text === "Test text" );
noteData.splice(result, 1);


//Recieve notes data
    router.get("/notes", function(req, res) {
        res.json(noteData);
    });

//Recieve targeted note
    router.get("/notes/:id", function(req, res) {
        let chosen = req.params.note;
        console.log(chosen);
    });

//Making notes using post
    router.post("/notes", function(req, res) {
        noteData.push(req.body);
        res.json(true);
        });

//Supposed to deleted targeted notes
    router.delete("/notes/:id", function(req, res) {
        
//Used splice & map to remove specific array
        let removeIndex = noteData.map(function(item) { return item.id; }).indexOf(req.params.id);
        noteData.splice(removeIndex, 1);
        res.json(true);
    });

    module.exports = router;