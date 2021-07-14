const db = require('../db');
const moment = require("moment");

//----------------------------------------------POST function to create candidate profile---------------------------------//
async function postForm(request, response) {
    console.log(request.body);
    var first_name = request.body.first_name;
    var last_name = request.body.last_name;
    var email = request.body.email;
    var job_title = request.body.job_title;
    var created_at = moment().format("YYYY-MM-DD HH:mm:ss+00");;
    var cv_id;

    var myFile = request.files.files;


    try {
        const addCV = await db.query(
            'INSERT INTO cv (filename, attachment, created_at) VALUES ($1, $2, $3) RETURNING id',
            [myFile.name, myFile.data, created_at]
        );
        if (addCV.rowCount === 1) {
            cv_id = addCV.rows[0].id;
        } else {
            //console.log("file has not added");
            return res.json({
                message:
                    "An error occured by adding file.",
                output: "failed",
            });
        }
    } catch (err) {
        console.error(err.stack);
        return "error";
    }

    //Insert into candidate
    let candidateInfo;
    try {
        candidateInfo = await db.query(
            'INSERT INTO candidate (first_name, last_name, email, job_title, created_at, cv_id) VALUES ($1, $2, $3, $4, $5, $6)',
            [
                first_name,
                last_name,
                email,
                job_title,
                created_at,
                cv_id
            ]
        );
        if (candidateInfo.rowCount === 1) {
            return response.json({ message: "Candidate profile created", output: "success" });
        } else {
            return response.json({
                message:
                    "An error occured by creating profile",
                output: "failed",
            });
        }
    } catch (err) {
        console.error(err.stack);
        return "error";
    }

}

//----------------------------------------------get candidate info--------------------------------------------------//
async function viewCandidatesDetails(request, response) {
    var id;
    var first_name;
    var last_name;
    var email;
    var job_title;
    var created_at;
    var cv_id;

    db.query('SELECT * FROM candidate', async (err, res) => {
        if (err) {
            console.error(err);
            response.json({ message: "Error: Details not found.", "output": "failed" });
            return;
        }
        if (res.rows.length === 1 || res.rows.length > 1) {
            var data = [];
            for (var i = 0; i < res.rows.length; i++) {
                id = res.rows[i].id;
                first_name = res.rows[i].first_name;
                last_name = res.rows[i].last_name;
                email = res.rows[i].email;
                job_title = res.rows[i].job_title;
                created_at = res.rows[i].created_at;
                cv_id = res.rows[i].cv_id;

                var cvName = await getCvName(cv_id);
                if (cvName.rowCount >= 1) {
                    var filename = cvName.rows[0].filename;
                }
                // push the request to the final response object called data
                var resultObject = { "id": id, "first_name": first_name, "last_name": last_name, "email": email, "job_title": job_title, "created_at": created_at, "cv_id": cv_id, "filename": filename };
                data.push(resultObject);
            }
            response.json({ 'message': data, 'output': 'success' });
            return;
        } else {
            response.json({ "output": "failed", "message": "No requests found." });
            return;
        }
    });

}
//---------------------------------get cv name function------------------------------------------------//
async function getCvName(cv_id) {
    let queryattachment;
    try {
      queryattachment = await db.query(
        "SELECT filename FROM cv where id = $1",
        [cv_id]
      );
      return queryattachment;
    } catch (err) {
      console.error(err.stack);
    }
  }
//---------------------------------get cv api------------------------------------------------//
async function getCv(request, response) {
    var cv_id = request.query.id;
    try {
        db.query('SELECT * FROM cv where id = $1',[cv_id], async (err, res) => {
            if (err) {
                console.error(err);
                response.json({ message: "Error: Details not found.", "output": "failed" });
                return;
            }
            if (res.rows.length === 1 || res.rows.length > 1) {
                var filename = res.rows[0].filename;
                var attachment = res.rows[0].attachment.toString("base64");

                var attachObject = { filename: filename, attachment: attachment };
                response.json({ 'message': attachObject, 'output': 'success' });
                return;
            } else {
                response.json({ "output": "failed", "message": "No requests found." });
                return;
            }
        });

    } catch (err) {
        console.error(err.stack);
    }
}

module.exports = {
    postForm,
    viewCandidatesDetails,
    getCv,
};