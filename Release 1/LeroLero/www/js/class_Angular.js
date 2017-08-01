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

        _this.App.config(['$routeProvider', _this.Routes]);

        angular.bootstrap(document, ['app-mobile']);
    }

    _this.Routes = function($routeProvider) {
        /// <summary>
        /// Configura as rotas do Angular.
        /// </summary>
        /// <param name="$routeProvider" type="object">Provider</param>
        
        var fWhenConfig = function (nome, fController) {
            /// <summary>
            /// Configura os parâmetros para o método When da configuração do Route.
            /// </summary>
            /// <param name="nome" type="string">Nome da rota</param>
            /// <param name="fController" type="function">Controller</param>
            /// <returns type="json">Parâmetros.</returns>

            var min = _this.Site.Util.Minificado();

            return {
                templateUrl: function () {                    
                    _this.Site.Util.CarregarArquivos("css/view_" + nome + ".css");
                    return 'html/view_' + nome + (min ? ".min" : "") + '.html';
                },
                controller: ['$scope', fController],
                controllerAs: 'controller-' + nome
            };
        };

        $routeProvider
			.when('/', fWhenConfig("entrada", _this.ControllerEntrada))
            .when('/opcao1', fWhenConfig("teste1", _this.ControllerTeste1))
            .when('/opcao2', fWhenConfig("teste2", _this.ControllerTeste1));
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
