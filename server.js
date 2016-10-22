//console.log("It works");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var quotes = [];



var htmlStringStart,
	htmlToInsert,
	htmlStringEnd;

	htmlStringStart = "

<!DOCTYPE html>
<html lang='en'>
<head>
	<meta charset='UTF-8'>
	<title>FirstDocument</title>
</head>
<body>
	Hello again!
	<form action='/quotes' method='POST'>
		<input type='text' name='name' placeholder='name'>
		<input type='text' name='quote' placeholder='quote'>
		<button type='submit'>Submit</button>
	</form>
";

	htmlToInsert = ' ';

	htmlStringEnd = '

</body>
</html>

';




var fs = require('fs');
fs.writeFile(__dirname + "/tmp/test", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function() {
    console.log('listening on 3000')
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
	//console.log(req.body);
	var tmp = req.body;
	tmp.color = randomColor();
	quotes.push(tmp);
	console.log(tmp.name, tmp.quote, tmp.color);
	console.log(quotes);
	//console.log(req.body);
	refreshHTML();
	res.redirect('/');
})

function randomDigit(){
	var floatRandom = 155+ Math.random()*100;
	//it should be quite bright, thatswhy 155+
	var intRandom = Math.round(floatRandom);
	var string16 = intRandom.toString(16);
	return string16;
}

function randomColor(){
	var red = randomDigit();
	var green = randomDigit();
	var blue = randomDigit();
	return ("#"+red+green+blue)
}

function refreshHTML(){
	for (var i = 0; i < quotes.length; i++){
		addItemtoHTML(i);
	}
}

function addItemToHTML(i){
	htmlToInsert = htmlToInsert.concat(wrap(i));
}

function wrap(i){
	var str = '
		<div class="quote" background-color="'+quotes[i].color+'">
			'quotes[i].name'<br>
			'quotes[i].quote'
		</div>
	';

	return 
}

