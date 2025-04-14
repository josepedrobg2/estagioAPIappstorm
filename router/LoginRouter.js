
const express = require('express');
const LoginControl = require('../control/loginController');


module.exports = class LoginRouter {
  
    constructor() {
        this._router = express.Router();
        this._loginControl =  new LoginControl();
    }

    createRoutes() {

        this._router.post('/',
            this._loginControl.login
        );

        return this._router;
    }
}
