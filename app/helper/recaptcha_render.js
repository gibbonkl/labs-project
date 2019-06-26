var Recaptcha = require('express-recaptcha').RecaptchaV2;
var recaptcha = new Recaptcha('6LcneqgUAAAAANgWtxI4eN1Gh6Jl2Jxw5dgK9tEB', '6LcneqgUAAAAAPxTTRQzAdMYBN1hf3ebdVjWAK6L');

module.exports = recaptcha.middleware.render;