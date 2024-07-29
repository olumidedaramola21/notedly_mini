const express = require('express')
const app = express()
// const port = process.env.PORT || 4000

app.get("/", (req, res) => res.send("My name is Big Olu!"))
app.listen(4000, () => console.log("Listening on port 4000"))
