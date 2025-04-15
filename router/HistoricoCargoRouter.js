const express = require('express');
const HistoricoCargoControl = require('../control/historicoCargoController');
const HistoricoCargoMiddleware = require('../middleware/HistoricoCargo')
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class HistoricoCargoRouter {

    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._historicoCargoControl = new HistoricoCargoControl();
        this._historicoCargoMiddleware = new HistoricoCargoMiddleware();
    }

    createRoutes() {
        this.router.get('/',
            this.jwtMiddleware.validate,
            this._historicoCargoControl.readAll
        );

        this.router.get('/:idHistoricoCargos',
            this.jwtMiddleware.validate,
            this._historicoCargoControl.readByID
        );

        this.router.post('/',
            this.jwtMiddleware.validate,
            this._historicoCargoMiddleware.validar_IDs,
            this._historicoCargoMiddleware.isNot_HistoricoCargoDuplicado,
            this._historicoCargoControl.create
        );

        this.router.delete('/:idHistoricoCargos',
            this.jwtMiddleware.validate,
            this._historicoCargoControl.delete
        );

        this.router.put('/:idHistoricoCargos',
            this.jwtMiddleware.validate,
            this._historicoCargoControl.update
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


    get _funcionarioMiddleware() {
        return this._funcionarioMiddleware;
    }

    set _funcionarioMiddleware(newFuncionarioMiddleware) {
        this._funcionarioMiddleware = newFuncionarioMiddleware;
    }
}
