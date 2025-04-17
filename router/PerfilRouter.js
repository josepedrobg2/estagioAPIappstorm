const express = require('express');
const PerfilControl = require('../control/perfilController');
const PerfilMiddleware = require('../middleware/PerfilMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class PerfilRouter {

    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._perfilControl = new PerfilControl();
        this._perfilMiddleware = new PerfilMiddleware();
    }

    createRoutes() {
        this.router.get('/',
            this.jwtMiddleware.validate,
            this.perfilControl.readAll
        );

        this.router.get('/:idPerfil',
            this.jwtMiddleware.validate,
            this.perfilControl.readByID
        );

        this.router.post('/',
            this.perfilMiddleware.isPerfilById, // Se ainda quiser validar ID
            this.perfilMiddleware.validar_NomePerfil,
            this.perfilControl.create
        );
        
        this.router.delete('/:idPerfil',
            this.jwtMiddleware.validate,
            this.perfilControl.delete
        );

        this.router.put('/:idPerfil',
            this.jwtMiddleware.validate,
            this.perfilControl.update
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

    get perfilControl() {
        return this._perfilControl;
    }

    set perfilControl(newPerfilControl) {
        this._perfilControl = newPerfilControl;
    }

    get perfilMiddleware() {
        return this._perfilMiddleware;
    }

    set perfilMiddleware(newPerfilMiddleware) {
        this._perfilMiddleware = newPerfilMiddleware;
    }
}
