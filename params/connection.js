var credentials=require('./dbparam');
const mysql=require('mysql');

var mysqlConnection=mysql.createConnection({
    host:credentials.host,
    user:credentials.user,
    password:credentials.password,
    database:credentials.database
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log('Connected');
    }
    else{
        console.log(err);
    }
});

module.exports=mysqlConnection;