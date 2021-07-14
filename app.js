const Express      = require ( "express" );
const bodyParser   = require ( "body-parser" );
const cors         = require ( 'cors' );
const db      	   = require ( './db' );
const dotenv       = require ( 'dotenv' ).config();
const fileUpload   = require ( 'express-fileupload' );

//import controllers
const test = require ("./controllers/test.js");
const candidate = require ("./controllers/candidate.js");

let app = Express ();

var corsOptions = {
    origin: "http://localhost:8081"
  };

  app.use(cors(corsOptions));
  app.use(fileUpload());
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });
// Application back-end routes
//GET method
app.get("/test", test.viewTestDetails);
app.get("/get_candidate", candidate.viewCandidatesDetails);
app.get("/get_cv", candidate.getCv);

//POST methods
app.post("/add_candidate", candidate.postForm);

  // set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});