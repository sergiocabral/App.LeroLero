'use strict';

window.SocialShare = function (site) {
    /// <summary>
    /// Funcionalidades para monetização do aplicativo.
    /// </summary>
    /// <returns type="object">Instancia.</returns>

    //Singleton
    if (!SocialShare._instancia) { SocialShare._instancia = this; } else { return SocialShare._instancia; }

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

    _this.Compartilhar = function (rede, texto, imagem) {
        /// <summary>
        /// Compartilha um texto e imagem para uma rede social.
        /// </summary>
        /// <param name="rede" type="string">Rede social</param>
        /// <param name="texto" type="string">Texto</param>
        /// <param name="img" type="string">Caminho da imagem</param>

        imagem = imagem ? imagem : null;

        switch (rede) {
            case "whatsapp":
                _this.Whatsapp(texto, imagem);
                break;
            case "facebook":
                _this.Facebook(texto, imagem);
                break;
            case "instagram":
                _this.Instagram(texto, imagem);
                break;
            case "twitter":
                _this.Twitter(texto, imagem);
                break;
            default:
                _this.Generico(texto, imagem);
        }
    }

    _this.Whatsapp = function (texto, imagem) {
        /// <summary>
        /// Compartilha para o Whatsapp
        /// </summary>
        /// <param name="texto" type="string">Texto</param>
        /// <param name="imagem" type="string">Caminho da imagem</param>

        if (!window.plugins || !window.plugins.socialsharing) { return; }

        window.plugins.socialsharing.shareViaWhatsApp(
            texto,
            imagem,
            null /* url */,
            function () { console.log('share ok'); },
            function (errormsg) {
                _this.Site.Comportamento.Alerta("Eu acho que você não tem o Whatsapp instalado. Não posso fazer nada.");
            });
    }

    _this.Facebook = function (texto, imagem) {
        /// <summary>
        /// Compartilha para o Facebook
        /// </summary>
        /// <param name="texto" type="string">Texto</param>
        /// <param name="imagem" type="string">Caminho da imagem</param>

        if (!window.plugins || !window.plugins.socialsharing) { return; }

        window.plugins.socialsharing.shareViaFacebook(
            texto,
            imagem,
            null /* url */,
            function () { console.log('share ok'); },
            function (errormsg) {
                _this.Site.Comportamento.Alerta("Você tem o Facebook instalado? Acho que não.");
            });
    }

    _this.Instagram = function (texto, imagem) {
        /// <summary>
        /// Compartilha para o Instagram
        /// </summary>
        /// <param name="texto" type="string">Texto</param>
        /// <param name="imagem" type="string">Caminho da imagem</param>

        if (!window.plugins || !window.plugins.socialsharing) { return; }

        window.plugins.socialsharing.shareViaInstagram(
            texto,
            imagem,
            function () { console.log('share ok'); },
            function (errormsg) {
                _this.Site.Comportamento.Alerta("Pra compartilhar pro Instagram tem que instalar ele primeiro né?!");
            });
    }

    _this.Twitter = function (texto, imagem) {
        /// <summary>
        /// Compartilha para o Whatsapp
        /// </summary>
        /// <param name="texto" type="string">Texto</param>

        if (!window.plugins || !window.plugins.socialsharing) { return; }

        window.plugins.socialsharing.shareViaTwitter(
            texto,
            imagem,
            null /* url */,
            function () { console.log('share ok'); },
            function (errormsg) {
                _this.Site.Comportamento.Alerta("Você nem tem o Twitter instalado. Não posso ajudar dessa vez.");
            });
    }

    _this.Generico = function (texto, imagem) {
        /// <summary>
        /// Compartilha como texto para o android
        /// </summary>
        /// <param name="texto" type="string">Texto</param>

        if (!window.plugins || !window.plugins.socialsharing) { return; }

        window.plugins.socialsharing.share(
            texto,
            null /* subject */,
            imagem,
            null /* url */,
            function () { console.log('share ok'); },
            function (errormsg) {
                _this.Site.Comportamento.Alerta("Ops! Alguma coisa deu errado. Não consegui compartilhar.");
            });
    }

};
