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

    //##################################################
    //##################################################
    //##################################################
    //##################################################
    //##################################################
    //Código específico a partir daqui.

    //Backup do style do html e body para configurar splash carregamento
    _this._backup_html_style = undefined;
    _this._backup_body_style = undefined;

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

    _this.MenuLateral = function (modo) {
        /// <summary>
        /// Exibe ou esconde menu lateral.
        /// </summary>
        /// <param name="modo" type="boolean">Exibe ou esconde menu.</param>
        /// <returns type="boolean">Resposta se menu está exibido.</returns>

        return _this.Site.Angular.MenuLateral(modo);
    }

    _this.FecharAplicativo = function () {
        /// <summary>
        /// Fechar aplicativo.
        /// </summary>

        if (_this.Site.Cordova.Ativo()) {
            _this.Site.Cordova.FecharAplicativo();
            return;
        }

        var browserName = navigator.appName;
        var browserVer = parseInt(navigator.appVersion);

        if (browserName == "Microsoft Internet Explorer") {
            var ie7 = (document.all && !window.opera && window.XMLHttpRequest) ? true : false;
            if (ie7) {
                //Para fechar sem confirmação no IE7 e versões superiores.
                window.open('', '_parent', '');
                window.close();
            } else {
                //Para fechar sem confirmação no IE6
                this.focus();
                self.opener = this;
                self.close();
            }
        } else {
            //Para outros navegadores diferentes do IE
            //Exceto Firefoxque não suporta auto fechamento.
            try {
                this.focus();
                self.opener = this;
                self.close();
            } catch (e) {

            }

            try {
                window.open('', '_self', '');
                window.close();
            } catch (e) {

            }
        }

        //no que tudo o mais falhar, direciona para tela em branco.
        document.location.href = "about:blank";
    }

};
