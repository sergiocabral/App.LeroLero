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

            var timeout = _this.Site.Cordova.Ativo() ? 3000 : 1000;
            $(document).ready(function () { setTimeout(function () { fSplash(modo); }, timeout); });
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

        return _this.Site.Angular.ExibirMenuLateral(modo);
    }

    _this.Alerta = function (texto, titulo, botao, config) {
        /// <summary>
        /// Mensagem de alerta
        /// </summary>
        /// <param name="texto" type="string">Mensagem</param>
        /// <param name="titulo" type="string">Título</param>
        /// <param name="botao" type="string">Texto do botão de fechar</param>
        /// <param name="config" type="json">Parâmetros</param>

        _this.Site.Angular.ExibirDialogo("alertar", $.extend(config || {}, {
            text: texto,
            title: titulo,
            ok: botao
        }));
    }

    _this.Confirma = function (texto, titulo, funcaoSim, funcaoNao, botaoSim, botaoNao, config) {
        /// <summary>
        /// Obter comfirmação do usuário.
        /// </summary>
        /// <param name="texto" type="string">Mensagem</param>
        /// <param name="titulo" type="string">Título</param>
        /// <param name="funcaoSim" type="function">Função para botão Sim</param>
        /// <param name="funcaoNao" type="function">Função para botão Não</param>
        /// <param name="botaoSim" type="string">Texto do botão Sim</param>
        /// <param name="botaoNao" type="string">Texto do botão Não</param>
        /// <param name="config" type="json">Parâmetros</param>

        _this.Site.Angular.ExibirDialogo("confirmar", $.extend(config || {}, {
            text: texto,
            title: titulo,
            then1: funcaoSim,
            then2: funcaoNao,
            ok: botaoSim,
            cancel: botaoNao
        }));
    }

    _this.FecharAplicativo = function () {
        /// <summary>
        /// Fechar aplicativo.
        /// </summary>

        var fFecharNavegador = function () {
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

        var fFechar = function () {
            if (_this.Site.Cordova.Ativo()) {
                _this.Site.Cordova.FecharAplicativo();
            }
            else {
                fFecharNavegador();
            }
        }

        _this.Confirma("Fechar aplicativo?", undefined, fFechar);
    }

    _this._ultimaCorDeFundoAleatoria = "";
    _this.CorDeFundoAleatoria = function () {
        /// <summary>
        /// Retorna uma cor para fndo aleatória.
        /// </summary>

        var cores = [
            '#CCFFCC',
            '#FFFFCC',
            '#CBE5FF',
            '#FFDBDB'];

        if (_this._ultimaCorDeFundoAleatoria) { cores.splice(cores.indexOf(_this._ultimaCorDeFundoAleatoria), 1); }
        var cor = cores[_this.Site.Util.NumeroAleatorio(cores.length - 1)];
        if (_this._ultimaCorDeFundoAleatoria) { cores.push(_this._ultimaCorDeFundoAleatoria); }
        _this._ultimaCorDeFundoAleatoria = cor;

        return cor;
    }

};
