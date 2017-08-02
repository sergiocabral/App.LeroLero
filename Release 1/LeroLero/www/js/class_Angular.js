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


    //Objetos instanciados do angular.
    _this.ConteudoModule = undefined;
    _this.ConteudoControllerScope = undefined;
    _this.MenuModule = undefined;
    
    _this.Inicializar = function () {
        /// <summary>
        /// Inicializa o framework AngularJS
        /// </summary>

        _this.ConteudoModule = angular
            .module('conteudo-module', ['ngRoute', 'ngAnimate', 'ngMaterial'])
            .config(['$routeProvider', _this.ConteudoRoutes]);

        _this.MenuModule = angular
            .module('menu-module', ['ngMaterial'])
            .config(['$mdThemingProvider', _this.MenuTheming])
            .controller('menu-controller', ['$scope', '$mdSidenav', '$location', '$mdColors', _this.MenuController]);

        angular.bootstrap(angular.element('.tela'), ['menu-module', 'conteudo-module']);
    };

    _this.MenuTheming = function ($mdThemingProvider) {
        /// <summary>
        /// Configuração do tema do menu.
        /// </summary>
        /// <param name="$mdThemingProvider" type="object">Provider de tema</param>

        $mdThemingProvider
            .theme('default')
            .primaryPalette('amber')
            .accentPalette('deep-orange')
            .warnPalette('red');
    };

    _this.MenuController = function ($scope, $mdSidenav, $location, $mdColors) {
        /// <summary>
        /// Controller do menu principal
        /// </summary>
        /// <param name="$scope" type="object">Escopo do controller.</param>
        /// <param name="$mdSidenav" type="object">Provider do menu.</param>

        $scope.menuAtivo = function (path) {
            return path && $location.path().substr(0, path.length) === path;
        }
        
        $scope.menu = function (path) {
            if ($scope.menuAtivo(path)) { return; }
            var menu = $mdSidenav('menu-principal');
            if (menu.isOpen()) {
                setTimeout(function () { menu.toggle(); }, 100);
            } else {
                menu.toggle();
            }
        };
        
        $scope.backgroundColor = function (path) {
            return $scope.menuAtivo(path) ? $mdColors.getThemeColor('default-primary-200') : 'auto';
        }

        $scope.textColor = function (path) {
            return $scope.menuAtivo(path) ? $mdColors.getThemeColor('default-primary-900') : 'auto';
        }

        $scope.onSwipe = function (ev) {
            alert('You swiped left!!');
        };
    };

    _this.ConteudoRoutes = function ($routeProvider) {
        /// <summary>
        /// Configura as rotas para o conteúdo.
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
                controllerAs: nome + "-controller",
                controller: ['$scope', '$http', '$location', '$timeout', '$route',
                    function ($scope, $http, $location, $timeout, $route) {
                        $timeout(function () {
                            $http.get(arquivoJs)
                                    .then(function (response) {
                                        _this.ConteudoControllerScope = $scope;
                                        eval(response.data);
                                    });
                        });
                    }]
            };
        };

        $routeProvider
			.when('/inicio', fWhenConfig("inicio"))
			.when('/sobre', fWhenConfig("sobre"))
            .otherwise({ redirectTo: '/inicio' });
    };

};
