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

    //##################################################
    //##################################################
    //##################################################
    //##################################################
    //##################################################
    //Código específico a partir daqui.


    //Aplicação angular
    _this.App = undefined;

    //Escopo do controller em execução.
    _this.ControllerScope = undefined;

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
        
        var fWhenConfig = function (nome) {
            /// <summary>
            /// Configura os parâmetros para o método When da configuração do Route.
            /// </summary>
            /// <param name="nome" type="string">Nome da rota</param>
            /// <returns type="json">Parâmetros.</returns>

            var arquivoHtml = _this.Site.Util.ArquivoMinificado('html/view_' + nome + '.html');
            var arquivoCss = _this.Site.Util.ArquivoMinificado('css/view_' + nome + '.css');
            var arquivoJs = _this.Site.Util.ArquivoMinificado('js/view_' + nome + '.js');

            return {
                templateUrl: function () {
                    _this.Site.Util.CarregarArquivos(arquivoCss);
                    return arquivoHtml;
                },
                controllerAs: "controller-" + nome,
                controller: ['$scope', '$http', '$location', '$timeout', '$route',
                    function ($scope, $http, $location, $timeout, $route) {
                        $timeout(function () {
                            $http.get(arquivoJs)
                                    .then(function (response) {
                                        _this.ControllerScope = $scope;
                                        eval(response.data);
                                    });
                        });
                    }]
            };
        };

        $routeProvider
			.when('/inicio', fWhenConfig("inicio"))
            .otherwise({ redirectTo: '/inicio' });
    }

};
