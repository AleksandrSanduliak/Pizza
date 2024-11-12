module.exports = class UserDto {
  name;
  email;
  phone;
  dateBrith;
  password;
  isActivated;
  generateActivationLink;
  bonuses;

  constructor (model) {
    this.name = model.name,
    this.email = model.email.toLowerCase(),
    this.phone = model.phone,
    this.dateBrith = model.dateBrith,
    this.password = model.password,
    this.isActivated = false,
    this.generateActivationLink = model.generateActivationLink,
    this.bonuses = 0;
  }
}

