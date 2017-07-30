'use strict';

window.NavegadorComum = function (site) {
    /// <summary>
    /// Classe principal de controle do sistema inteiro.
    /// </summary>
    /// <returns type="object">Instancia.</returns>

    //Singleton
    if (!NavegadorComum._instancia) { NavegadorComum._instancia = this; } else { return NavegadorComum._instancia; }

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

    _this.Ativo = function () {
        /// <summary>
        /// Indica se o navegador atual é um navegador comum de computador. A resposta é inversa a presença do Cordova.
        /// </summary>
        /// <returns type="boolean">Quando ==true é navegador comum.</returns>

        return !_this.Site.Cordova.Ativo();
    }

    _this.AtribuirEventos = function () {
        /// <summary>
        /// Atribui os eventos do framework Cordova para ajustar o comportamento do telefone.
        /// </summary>

        //Se o Cordova está presente não processa script relacionado a navegador comuns.
        if (_this.Site.Cordova.Ativo()) {
            return;
        }

        $(document).ready(function () {
            //Alguns navegadores incluem objetos no DOM como os plugins da empresa GAS Tecnologia
            setTimeout(function () { $("object[type*='gas']").remove(); }, 1000)

            //Captura evento do botão voltar do navegador.
            if (window.history && window.history.pushState) {
                $(window).on('popstate', function () {
                    var hashLocation = location.hash;
                    var hashSplit = hashLocation.split("#!/");
                    var hashName = hashSplit[1];

                    if (hashName !== '') {
                        var hash = window.location.hash;
                        if (hash === '') {
                            window.history.pushState('forward', null, './#');

                            //Usa o evento que processa o comportamento do botão voltar.
                            _this.Site.Cordova._backbuttonFunction();
                        }
                    }
                });
                window.history.pushState('forward', null, './#');
            }
        });
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
