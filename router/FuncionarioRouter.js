const express = require('express');
const FuncionariosControl = require('../control/funcionarioController');
const FuncionariosMiddleware = require('../middleware/FuncionarioMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class FuncionariosRouter {

    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._funcionariosControl = new FuncionariosControl();
        this._funcionariosMiddleware = new FuncionariosMiddleware();
    }

    createRoutes() {
        this.router.get('/',
            this.jwtMiddleware.validate,
            this.funcionariosControl.readAll
        );

        this.router.get('/:idFuncionario',
            this.jwtMiddleware.validate,
            this.funcionariosControl.readByID
        );

        this.router.post('/',
            this.funcionariosMiddleware.validar_EmailFuncionario,
            this.funcionariosMiddleware.validar_CPF,
            this.funcionariosMiddleware.validar_NomeFuncionario,
            this.funcionariosMiddleware.isNot_funcionarioByEmail,
            this.funcionariosControl.create
        );

        this.router.delete('/:idFuncionario',
            this.jwtMiddleware.validate,
            this.funcionariosControl.delete
        );

        this.router.put('/:idFuncionario',
            this.jwtMiddleware.validate,
            this.funcionariosControl.update
        );

        return this.router;
    }

    get router() {
        return this._router;
    }

    set router(newRouter) {
        this._router = newRouter;
    }

    get jwtMiddleware() {
        return this._jwtMiddleware;
    }

    set jwtMiddleware(newJwtMiddleware) {
        this._jwtMiddleware = newJwtMiddleware;
    }

    get funcionariosControl() {
        return this._funcionariosControl;
    }

    set funcionariosControl(newFuncionariosControl) {
        this._funcionariosControl = newFuncionariosControl;
    }

    get funcionariosMiddleware() {
        return this._funcionariosMiddleware;
    }

    set funcionariosMiddleware(newFuncionariosMiddleware) {
        this._funcionariosMiddleware = newFuncionariosMiddleware;
    }
}
