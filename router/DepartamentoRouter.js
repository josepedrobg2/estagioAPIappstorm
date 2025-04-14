const express = require('express');
const DepartamentoControl = require('../control/departamentoController');
const DepartamentoMiddleware = require('../middleware/DepartamentosMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class DepartamentoRouter {

    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._departamentoControl = new DepartamentoControl();
        this._departamentoMiddleware = new DepartamentoMiddleware();
    }

    createRoutes() {
        this.router.get('/',
            this.jwtMiddleware.validate,
            this.departamentoControl.readAll
        );

        this.router.get('/:idDepartamento',
            this.jwtMiddleware.validate,
            this.departamentoControl.readByID
        );

        this.router.post('/',
            this.departamentoMiddleware.validar_NomeDepartamento,
            this.departamentoMiddleware.isNot_departamentoByNomeDepartamento,
            this.departamentoControl.create
        );

        this.router.delete('/:idDepartamento',
            this.jwtMiddleware.validate,
            this.departamentoControl.delete
        );

        this.router.put('/:idDepartamento',
            this.jwtMiddleware.validate,
            this.departamentoControl.update
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

    get departamentoControl() {
        return this._departamentoControl;
    }

    set departamentoControl(newDepartamentoControl) {
        this._departamentoControl = newDepartamentoControl;
    }

    get departamentoMiddleware() {
        return this._departamentoMiddleware;
    }

    set departamentoMiddleware(newDepartamentoMiddleware) {
        this._departamentoMiddleware = newDepartamentoMiddleware;
    }
}
