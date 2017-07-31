'use strict';

window.Comportamento = function (site) {
    /// <summary>
    /// Funcionalidades de comportamento JavaScript e visual CSS
    /// </summary>
    /// <returns type="object">Instancia.</returns>

    //Singleton
    if (!Comportamento._instancia) { Comportamento._instancia = this; } else { return Comportamento._instancia; }

    //Referência a this quando este não for acessível.
    var _this = this;

    //Instância classe que controle o aplicativo.
    //Usado nesta classe para manter padronização nas chamadas de função.
    _this.Site = site;

    //Backup do style do html e body para configurar splash carregamento
    _this._backup_html_style = undefined;
    _this._backup_body_style = undefined;

    //##################################################
    //##################################################
    //##################################################
    //##################################################
    //##################################################
    //Código específico a partir daqui.

    _this.Splash = function (modo) {
        /// <summary>
        /// Exibe ou oculta a tela de Carregamento
        /// </summary>
        /// <param name="modo" type="boolean">Ativa ou desativa</param>

        var fSplash = function (modo) {
            if (modo) {
                $("html").attr("style", _this._backup_html_style);
                $("body").attr("style", _this._backup_body_style);
            } else {
                $("html").attr("style", "");
                $("body").attr("style", "");
            }
        }

        if (_this._backup_html_style == undefined) {
            _this._backup_html_style = $("html").attr("style");
            _this._backup_body_style = $("body").attr("style");

            $(document).ready(function () { setTimeout(function () { fSplash(modo); }, 1000); });
        }
        else {
            fSplash(modo);
        }
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
