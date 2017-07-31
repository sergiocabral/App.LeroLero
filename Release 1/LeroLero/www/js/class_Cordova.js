﻿'use strict';

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

        alert("_backbuttonFunction");

        if (e) { e.preventDefault(); }
        return false;
    };

    _this._menubuttonFunction = function (e) {
        /// <summary>
        /// Evento do telefone menubutton
        /// </summary>
        /// <param name="e" type="event">Dados do evento.</param>
        /// <returns type="boolean">Quando ==false interrompe o evento.</returns>
        
        alert("_menubuttonFunction");

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

    //Código específico termina daqui.
    //##################################################
    //##################################################
    //##################################################
    //##################################################
    //##################################################
    //Abaixo, apenas chamadas de inicialização (construtor)

    return;
};
