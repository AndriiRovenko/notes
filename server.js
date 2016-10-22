//console.log("It works");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var quotes = [];

var fs = require('fs');
//-----------------------blocks of code----------------------
var html = ``,
	style = ``,
	htmlToInsert = ``;

function initialize(){
	html = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="style.css">
	<style>
		.quote {
  border: 1px solid #000000;
  margin: 5px;
  padding: 5px;
  width: 200px;
  height: 100px;
  float: left;
  overflow: scroll;
}
${style}
	</style>
	<title>FirstDocument</title>
</head>
<body>
	Hello again!
	<form action="/quotes" method="POST">
		<input type="text" name="name" placeholder="name">
		<input type="text" name="quote" placeholder="quote">
		<button type="submit">Submit</button>
	</form>
	${htmlToInsert}
</body>
</html>

	`//-------------------------endHTML
}

/*
	htmlStringStart = `

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="style.css">
	<style>
		.quote {
  border: 1px solid #000000;
  margin: 5px;
  padding: 5px;
  width: 200px;
  height: 100px;
  float: left;
  overflow: scroll;
}
${style}
	</style>
	<title>FirstDocument</title>
</head>
<body>
	Hello again!
	<form action="/quotes" method="POST">
		<input type="text" name="name" placeholder="name">
		<input type="text" name="quote" placeholder="quote">
		<button type="submit">Submit</button>
	</form>
`;

	htmlToInsert = ` `;

	htmlStringEnd = `

</body>
</html>

`;
*/
//-----------------------writing files in FS----------------------
/*
var fs = require('fs');
fs.writeFile(__dirname + "/tmp/test", "go away", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
*/
//----------------------express
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
	//style = addStyle();//------------------Not here
	refreshHTML();
	res.redirect('/');
})
//---------------------colorize---------------------------
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
//---------------------adding changes to HTML--------------
function refreshHTML(){
	htmlToInsert = ``;
	style = ``;
	for (var i = 0; i < quotes.length; i++){
		addItemToHTML(i);
	}
	initialize();
	//var finalHTML = htmlStringStart+htmlToInsert+htmlStringEnd;

	fs.writeFile(__dirname + "/index.html", html, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
}

function addItemToHTML(i){
	htmlToInsert = htmlToInsert.concat(wrap(i));
	style = style.concat(addStyle(i));
}

function wrap(i){
	var str = `
		<div class="quote" id="_${i}">
			${quotes[i].name}<br>
			${quotes[i].quote}
		</div>
	`;

	return str;
}

function addStyle(i){
	var str = `
		#_${i}{
			background-color: ${quotes[i].color};
		}
	`
	return str;
}

