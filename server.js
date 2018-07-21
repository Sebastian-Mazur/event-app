const express = require('express')
const path = require('path');
const app = express()

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});
