'use strict';

window.Site = function () {
    /// <summary>
    /// Classe principal de controle do sistema inteiro.
    /// </summary>
    /// <returns type="object">Instancia.</returns>

    //Singleton
    if (!Site._instancia) { Site._instancia = this; } else { return Site._instancia; }

    //Referência a this quando este não for acessível.
    var _this = this;

    //Instância classe que controle o aplicativo.
    //Usado nesta classe para manter padronização nas chamadas de função.
    _this.Site = _this;

    //##################################################
    //##################################################
    //##################################################
    //##################################################
    //##################################################
    //Código específico a partir daqui.

    //Veja o comentário relativo a cada classe abaixo nos seus respectivos arquivos.
    //Cada classe é instanciada por cima dela mesma para desalocar o DOM. (se é que é possível)
    _this.Util = window.Util = new Util(_this);
    _this.Cordova = window.Cordova = new Cordova(_this);
    _this.Comportamento = window.Comportamento = new Comportamento(_this);
    _this.Angular = window.Angular = new Angular(_this);
    _this.Site.Monetizar = window.Monetizar = new Monetizar(_this);

    _this.Site.Cordova.AtribuirEventos();
    _this.Angular.Inicializar();
    _this.Site.Comportamento.Splash(false);
    _this.Site.Monetizar.ConfigurarAdMob();

};
