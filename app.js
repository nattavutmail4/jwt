const express = require('express');
const server  = express();
const token_manager = require('./route/token_manager');
const mysql = require('mysql');

const  axios = require('axios').default;
//จำลองข้อมูลยูสเซอร์
let user = [
    {id:"1",username : "thewin",lname :"zaza",password:"555",tel:"888-888" },
    {id:"2",username : "wow",lname :"lnw",password:"777",tel:"333-333" }
];

const db  = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'sood_v1',
    charset:'utf8',
	connectionLimit: 10
});

db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
});



server.use(require('cors')())
server.use(express.urlencoded({extended:true, limit : "50MB"}));
server.use(express.json())


server.get('/',(request,response)=>{
    response.json({
         Message:"Welcom to nodejs"
    });
});


server.post('/login',(request,response)=>{
    let userData = request.body;
    let userLoginData = user.find((value)=>{return(value.username == userData.username && value.password == userData.password)});
    
    if(userLoginData != undefined){
       let accesstoken = token_manager.GenerateAccessToken({"id":userLoginData.id})
       return response.status(200).json({
            accesstoken          
       })
    }else{
        return response.status(404).json({
            message:"ไม่พบ username นี้"
       })
    }
})

server.post('/check_authen',(request,respons)=>{
    let jwtStatus =  token_manager.checkAuthentication(request);
    if(jwtStatus != false){
        return respons.status(200).json({jwtStatus})
    }else{
        return respons.status(404).json({message:"token erro"})
    }
});

server.get('/getsood',(request,response)=>{
     let jwtStatus = token_manager.checkAuthentication(request);
     if(jwtStatus != false){
        return response.status(200).json({
            statusCode:200,
            result:user
        })
     }else{
        return response.status(404).json({message:false})
     }
})

server.listen(3030,()=>{console.log(`Run is port:3030`)})