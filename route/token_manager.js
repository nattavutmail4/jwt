const jwt  = require('jsonwebtoken');
const tokenData = require('./token_data.json')
// สร้างคราสชื่อ tokenManger
class TokenManager{
    // ภายในคราส tokenManager จะเป็นการสร้าง token ขึ้นมา
    static GenerateAccessToken(payload){ //รับ payload เช่นพวก username password เป็นต้น
        // ส่งค่า jwt ที่ generateToken ออก 
        //ตัวอย่าง jwt.sin(payload,"secretที่randomมา" ,{"expiresIn":"เวลาที่tokenมีอายุ"})
        return jwt.sign(payload,tokenData["secret_key"],{"expiresIn":60*60})
    }
    // คราสนี้เป็นการเช็ค tokenที่ได้มากจากการ log
    static checkAuthentication(request){
         try{
            let accessToken = request.headers.authorization.split(" ")[1];
            let jwtResponse = jwt.verify(String(accessToken),tokenData["secret_key"]);
            return jwtResponse
         }catch(error){
            return false;
         }
    }
    // ฟังกชัน random secret
    static getSecret(){
        return require("crypto").randomBytes(64).toString("hex");
    }
}

module.exports = TokenManager