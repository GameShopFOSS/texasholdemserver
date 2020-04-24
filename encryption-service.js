
var crypto = require('crypto'),
  algorithm = 'aes-256-gcm',
  password = 'ABCDEFGHJKLMNOPQRSTUVWXYZABCDEFG',
  // do not use a global iv for production, 
  // generate a new one for each encryption
  iv = 'ABCDEFGHIJKLMNOP'

class EncryptionService{

EncryptionService() {

}
 encrypt(text) {
  var cipher = crypto.createCipheriv(algorithm, password, iv)
  var encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex');
  var tag = cipher.getAuthTag();
  return {
    content: encrypted,
    tag: tag
  };
}

 decrypt(encrypted) {
  var decipher = crypto.createDecipheriv(algorithm, password, iv)
  decipher.setAuthTag(encrypted.tag);
  var dec = decipher.update(encrypted.content, 'hex', 'utf8')
  dec += decipher.final('utf8');
  return dec;
}
}

module.exports = EncryptionService;
//var hw = encrypt("hello world")
// outputs hello world
//console.log(decrypt(hw));