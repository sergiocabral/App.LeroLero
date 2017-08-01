'use strict';

window.Angular = function (site) {
    /// <summary>
    /// Classe principal de controle do sistema inteiro.
    /// </summary>
    /// <returns type="object">Instancia.</returns>

    //Singleton
    if (!Angular._instancia) { Angular._instancia = this; } else { return Angular._instancia; }

    //Referência a this quando este não for acessível.
    var _this = this;

    //Instância classe que controle o aplicativo.
    //Usado nesta classe para manter padronização nas chamadas de função.
    _this.Site = site;

    //Aplicação angular
    _this.App = undefined;

    //##################################################
    //##################################################
    //##################################################
    //##################################################
    //##################################################
    //Código específico a partir daqui.

    _this.Inicializar = function () {
        /// <summary>
        /// Inicializa o framework AngularJS
        /// </summary>

        _this.App = angular.module('app-mobile', ['ngRoute']);

        _this.App.config(_this.Routes);

        _this.App.controller("controller-entrada", _this.ControllerEntrada);
        _this.App.controller("controller-teste1", _this.ControllerTeste1);
        _this.App.controller("controller-teste2", _this.ControllerTeste2);

        angular.bootstrap(document, ['app-mobile']);
    }

    _this.Routes = function ($routeProvider) {
        $routeProvider
			.when('/', {
			    templateUrl: 'views/entrada.html',
			    controller: 'controller-entrada'
			})
			.when('/opcao1', {
			    templateUrl: 'views/teste1.html',
			    controller: 'controller-teste1'
			})
			.when('/opcao2', {
			    templateUrl: 'views/teste2.html',
			    controller: 'controller-teste2'
			});
    }

    _this.ControllerEntrada = function ($scope) {
        $scope.quem = "entrada";
    }

    _this.ControllerTeste1 = function ($scope) {
        $scope.quem = "teste 1";
    }

    _this.ControllerTeste2 = function ($scope) {
        $scope.quem = "teste 2";
    }

    //Código específico termina daqui.
    //##################################################
    //##################################################
    //##################################################
    //##################################################
    //##################################################
    //Abaixo, apenas chamadas de inicialização (construtor)

    return;
};
