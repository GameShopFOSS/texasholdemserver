
var crypto = require('crypto'),
  //algorithm = 'aes-256-gcm',
  algorithm = 'aes-256-cbc',
  password = 'ABCDEFGHJKLMNOPQRSTUVWXYZABCDEFG',
  // do not use a global iv for production, 
  // generate a new one for each encryption
  iv = 'ABCDEFGHIJKLMNOP'

class EncryptionService{

constructor() {

}
 encrypt(text) {
  var cipher = crypto.createCipheriv(algorithm, password, iv)
  var encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  var tag = cipher.getAuthTag();
  return {
    content: encrypted,
    tag: tag
  };
}

 decrypt(encrypted) {
  //var key = crypto.createHash('sha256').update(String(password)).digest('base64').substr(0, 32);
  var decipher = crypto.createDecipheriv(algorithm, password, iv);
  //decipher.setAuthTag(encrypted.tag);
//     var cipher = crypto.createCipheriv(algorithm, password, iv);
// var encryptedC = cipher.update(, 'utf8', 'hex');
//   encryptedC += cipher.final('hex');
  //var tag = cipher.getAuthTag();
  //decipher.setAuthTag(tag);

  var dec = decipher.update(encrypted, 'hex', 'utf8');//.encrypted.content
  dec += decipher.final('utf8');
  return dec;
}
}

module.exports = {EncryptionService};
//var hw = encrypt("hello world")
// outputs hello world
//console.log(decrypt(hw));