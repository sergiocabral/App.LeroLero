'use strict';

window.Monetizar = function (site) {
    /// <summary>
    /// Funcionalidades para monetização do aplicativo.
    /// </summary>
    /// <returns type="object">Instancia.</returns>

    //Singleton
    if (!Monetizar._instancia) { Monetizar._instancia = this; } else { return Monetizar._instancia; }

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

    _this.ConfigurarAdMob = function () {
        /// <summary>
        /// Configuração inicial do AdMob
        /// </summary>

        var fInitAdMob = function () {
            /*
             * ID do aplicativo: ca-app-pub-3448596400517567~3836463344
             * ID do bloco de anúncios: ca-app-pub-3448596400517567/5939882508
             * Modelo de anúncio nativo: M002
             * Largura: 280 a 1200 dp
             * Altura: 132 a 1200 dp
             */
            var admob_key_banner = "ca-app-pub-3448596400517567/5939882508";
            var admob_key_interstitial = "ca-app-pub-3448596400517567/5939882508";
            window.plugins.AdMob.setOptions({
                publisherId: admob_key_banner,
                bannerAtTop: false, // set to true, to put banner at top
                overlap: false, // set to true, to allow banner overlap webview
                offsetTopBar: true, // set to true to avoid ios7 status bar overlap                    
                interstitialAdId: admob_key_interstitial,
                autoShow: true, // autoshow intertitial Ad
                isTesting: true // receiving test ad
            });
        }

        var fShowAdMobBanner = function() {
            window.plugins.AdMob.createBannerView();
        }

        var fShowAdMobInterstitial = function() {
            window.plugins.AdMob.createInterstitialView();
        }

        var fConfigurar = function () {
            if (!window.plugins || !window.plugins.AdMob) {
                alert("AdMob plugin not ready");
                return;
            }

            fInitAdMob();
            fShowAdMobInterstitial();
            fShowAdMobBanner();
        };

        if (_this.Site.Cordova.Ativo()) {
            document.addEventListener("deviceready", fConfigurar, false);
        }
    }

};
