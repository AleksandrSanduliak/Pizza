module.exports = class TokenDto {
  id;
  email;
  
  constructor(id, email) {
    this.id = id;
    this.email = email;
  }
}