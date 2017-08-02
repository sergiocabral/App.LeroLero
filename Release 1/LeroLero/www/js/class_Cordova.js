'use strict';

window.Cordova = function (site) {
    /// <summary>
    /// Funcionalidades do ambiente Cordova, compilado para mobile.
    /// </summary>
    /// <returns type="object">Instancia.</returns>

    //Singleton
    if (!Cordova._instancia) { Cordova._instancia = this; } else { return Cordova._instancia; }

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
        /// Indica se o framework Cordova está ativo. Caso não é apenas um navegador comum.
        /// </summary>
        /// <returns type="boolean">Indica se o Cordova está ativo.</returns>

        try {
            var teste = navigator.app.overrideButton;
            return true;
        } catch (ex) {
            return false;
        }
    }

    _this._backbuttonFunction = function (e) {
        /// <summary>
        /// Evento do telefone backbutton
        /// </summary>
        /// <param name="e" type="event">Dados do evento.</param>
        /// <returns type="boolean">Quando ==false interrompe o evento.</returns>

        if (Site.Angular.Historico.length > 1) {
            _this.Site.Angular.Historico.pop();
            document.location.href = _this.Site.Angular.Historico.pop();
        }
        else {
            _this.Site.Comportamento.FecharAplicativo();
        }

        if (e) { e.preventDefault(); }
        return false;
    };

    _this._menubuttonFunction = function (e) {
        /// <summary>
        /// Evento do telefone menubutton
        /// </summary>
        /// <param name="e" type="event">Dados do evento.</param>
        /// <returns type="boolean">Quando ==false interrompe o evento.</returns>
        
        _this.Site.Comportamento.MenuLateral(!_this.Site.Comportamento.MenuLateral());

        e.preventDefault();
        return false;
    };

    _this.AtribuirEventos = function () {
        /// <summary>
        /// Atribui os eventos do framework Cordova para ajustar o comportamento do telefone.
        /// </summary>

        document.addEventListener("deviceready", function () {
            try {
                //Tentativa de fazer o menubutton funcionar no Android.
                navigator.app.overrideButton("backbutton", true);
            } catch (ex) { }

            //Registra eventos relacionados ao telefone.            
            document.addEventListener("backbutton", _this._backbuttonFunction, false);
            document.addEventListener("menubutton", _this._menubuttonFunction, false);
        }, false);

    }

    _this.FecharAplicativo = function () {
        /// <summary>
        /// Fecha o aplicativo no ambiente Cordova.
        /// </summary>

        navigator.app.exitApp();
    }

    _this.AbrirLinkExternamente = function (url, dados) {
        /// <summary>
        /// Abre um link no navegador do telefone, ao invés de no aplicativo.
        /// </summary>
        /// <param name="url" type="string">Endereço urk</param>
        /// <param name="dados" type="json">Parâmetros.</param>

        dados = $.extend({
            openExternal: true //Indica que o link deve ser aberto pelo navegador do telelfone
        }, dados);

        navigator.app.loadUrl(url, dados);
    }

};
