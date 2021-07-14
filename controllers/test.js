const db = require('../db');
async function viewTestDetails(request, response){
    var id;
    var type;
    var color;

    db.query('SELECT * FROM test', async (err, res) => {
        if (err) {
            console.error(err);
            response.json({message:"Error: Details not found.","output":"failed"});
            return;
        }
        if(res.rows.length === 1 || res.rows.length > 1){
            var data = [];
            for(var i=0;i<res.rows.length;i++){
                var id = res.rows[i].id;
                var type = res.rows[i].type;
                var color = res.rows[i].color;

                // push the request to the final response object called data
        		var resultObject = {"id":id, "type":type, "color": color};
        		data.push(resultObject);
            }
            response.json({'message':data,'output':'success'});
			return;
        }else{
            response.json({"output":"failed","message": "No requests found."});
            return;
        }
    });

}
module.exports = {
    viewTestDetails,
};