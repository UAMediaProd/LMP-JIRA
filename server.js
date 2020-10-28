// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});


//JIRA REST API FOR MEDIA PRODUCTION

var summary, description;

app.post('/jira-rest', (req, res) => {
    console.log('Got body:', req);
  
    //build the description for the ticket
    let temp_desc = "";
    temp_desc += "Faculty: " + req.body.faculty + "\n\n"
    temp_desc += "School: " + req.body.school + "\n\n"
    temp_desc += "Email: " + req.body.email + "\n\n"
    temp_desc += "Name: " + req.body.given_names_first_and_last_ + "\n\n"
    temp_desc += "Ideally I'd like this by: " + req.body.ideally_i_d_like_to_use_this_by + "\n\n"
    temp_desc += req.body.description
  
    description = temp_desc;
    summary = req.body.course_title;
    console.log(summary);
    console.log(description);
  

var issue = {
    "fields": {
        "project": {
            "key": "LVP"
        },
        "summary": summary,
        "description": description,
        "issuetype": {
            "name": "Story"
        }
    }
};

var param = JSON.stringify(issue);
console.log(param);

const send = {
  url: 'https://adelaide.atlassian.net/rest/api/2/issue/',
  method: 'POST',
  body: param,
  headers: {
    'Accept':'application/json',
    'Authorization':'Basic YWFyb24uc2hhbm5vbi1ob25zb25AYWRlbGFpZGUuZWR1LmF1OmVYNGo0MUVOMW1NRTFKOVdUc2ZlNEJCQg==',
    'Access-Control-Allow-Origin':'*',
    'Content-Type':'application/json'
  },
}


// request.get(options, function(err, resp, body){
//   let json = JSON.parse(body);
//   console.log(json);
// });

request.post(send, function(err, resp, body){
  console.log(resp);
});
  
    res.sendStatus(200);
});



// Add in a new endpoint here for the changelog, can use the same deets as above


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});






