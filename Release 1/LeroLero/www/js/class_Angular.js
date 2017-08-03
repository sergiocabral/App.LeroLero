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
    _this.TelaModule = undefined;
    _this.ConteudoModule = undefined;
    _this.ConteudoControllerScope = undefined;
    _this.TelaDialogo = undefined;

    //Função para abrir ou fechar o menu lateral.
    _this.ExibirMenuLateral = function () { };

    //Função para exibir uma caixa de diálogo.
    _this.ExibirDialogo = function () { };

    //Histórico de páginas visitadas.
    _this.Historico = [];
    
    _this.Inicializar = function () {
        /// <summary>
        /// Inicializa o framework AngularJS
        /// </summary>

        _this.TelaModule = angular
            .module('tela-module', ['ngMaterial'])
            .config(['$mdThemingProvider', _this.TelaTheming])
            .controller('tela-controller', ['$scope', '$mdSidenav', '$location', '$mdColors', _this.TelaController]);

        _this.ConteudoModule = angular
            .module('conteudo-module', ['ngRoute', 'ngAnimate', 'ngMaterial'])
            .config(['$routeProvider', _this.ConteudoRoutes]);

        _this.DialogoModule = angular
            .module('dialogo-module', ['ngMaterial'])
            .controller('dialogo-controller', ['$scope', '$mdDialog', _this.DialogoController]);
        
        angular.bootstrap(angular.element('.tela'), ['tela-module', 'conteudo-module', 'dialogo-module']);
    };

    _this.TelaTheming = function ($mdThemingProvider) {
        /// <summary>
        /// Configuração do tema do tela.
        /// </summary>
        /// <param name="$mdThemingProvider" type="object">Provider de tema</param>

        $mdThemingProvider
            .theme('default')
            .primaryPalette('amber')
            .accentPalette('deep-orange')
            .warnPalette('red');
    };

    _this.DialogoController = function ($scope, $mdDialog) {
        /// <summary>
        /// Controller da caixa de dialogo.
        /// </summary>
        /// <param name="$scope" type="object">Escopo do controller.</param>
        /// <param name="$mdDialog" type="object">Provider da caixa de diálogo.</param>

        if (_this.ExibirDialogo() === undefined) {
            _this.ExibirDialogo = function (tipo, config) {
                config = config || {};
                var dialogo = $mdDialog;

                if ($scope.dialogOpen) {                    
                    dialogo.cancel();
                    return false;
                }
                else {
                    var fNulo = function () { };

                    switch (tipo) {
                        case "alertar":
                            config = $.extend(config, {
                                parent: angular.element(document.querySelector(config.parent != undefined ? config.parent : 'body')),
                                openFrom: config.openFrom != undefined ? config.openFrom : '.menu',
                                closeTo: config.closeTo != undefined ? config.closeTo : 'body',
                                targetEvent: config.ev != undefined ? config.ev : undefined,
                                clickOutsideToClose: config.clickOutsideToClose != undefined ? config.clickOutsideToClose : true,
                                ariaLabel: config.ariaLabel != undefined ? config.ariaLabel : 'Altera ao usuário',
                                title: config.title != undefined ? config.title : '',
                                textContent: config.text != undefined ? config.text : 'Ops...',
                                ok: config.ok != undefined ? config.ok : 'Fechar'
                            });
                            dialogo.show(dialogo.alert(config)).then(
                                config.then1 != undefined ? config.then1 : fNulo,
                                config.then2 != undefined ? config.then2 : fNulo
                            ).finally(function () {
                                $scope.dialogOpen = false;
                            });;
                            break;
                        case "confirmar":
                            config = $.extend(config, {
                                parent: angular.element(document.querySelector(config.parent != undefined ? config.parent : 'body')),
                                openFrom: config.openFrom != undefined ? config.openFrom : '.menu',
                                closeTo: config.closeTo != undefined ? config.closeTo : 'body',
                                targetEvent: config.ev != undefined ? config.ev : undefined,
                                clickOutsideToClose: config.clickOutsideToClose != undefined ? config.clickOutsideToClose : true,
                                ariaLabel: config.ariaLabel != undefined ? config.ariaLabel : 'Esperando confirmação do usuário',
                                title: config.title != undefined ? config.title : '',
                                textContent: config.text != undefined ? config.text : 'O quê?',
                                ok: config.ok != undefined ? config.ok : 'Sim',
                                cancel: config.cancel != undefined ? config.cancel : 'Não'
                            });
                            dialogo.show(dialogo.confirm(config)).then(
                                config.then1 != undefined ? config.then1 : fNulo,
                                config.then2 != undefined ? config.then2 : fNulo
                            ).finally(function () {
                                $scope.dialogOpen = false;
                            });
                            break;
                        default:
                            return false;
                    }
                    $scope.dialogOpen = true;
                    return true;
                }
            }
        }
    }

    _this.TelaController = function ($scope, $mdSidenav, $location, $mdColors) {
        /// <summary>
        /// Controller do tela principal
        /// </summary>
        /// <param name="$scope" type="object">Escopo do controller.</param>
        /// <param name="$mdSidenav" type="object">Provider do tela.</param>

        if (_this.ExibirMenuLateral() === undefined) {
            _this.ExibirMenuLateral = function (modo) {
                var menu = $mdSidenav('menu-principal');
                if (modo !== undefined) {
                    if (modo) {
                        menu.open();
                    } else {
                        menu.close();
                    }
                }
                return menu.isOpen();
            }
        }

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
        
        $scope.fechar = function () {
            _this.Site.Comportamento.FecharAplicativo();
        }

        $scope.backgroundColor = function (path) {
            return $scope.menuAtivo(path) ? $mdColors.getThemeColor('default-primary-200') : 'auto';
        }

        $scope.textColor = function (path) {
            return $scope.menuAtivo(path) ? $mdColors.getThemeColor('default-primary-900') : 'auto';
        }
    };

    //Último nome de conteudo carregado.
    _this._ultimoConteudo = "";

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
                                        _this.Historico.push($location.$$absUrl);

                                        _this.ConteudoControllerScope = $scope;

                                        $(".conteudo.ng-enter").css("background", "linear-gradient(white," + _this.Site.Comportamento.CorDeFundoAleatoria() + " 80%)");

                                        $(".conteudo").removeClass(_this._ultimoConteudo);
                                        $(".conteudo").addClass(nome);
                                        _this._ultimoConteudo = nome;
                                        
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
