﻿function minificado() {
    /// <summary>
    /// Retorna informação se as bibliotecas estão sendo carregadas minificadas.
    /// </summary>
    /// <returns type="boolean"></returns>

    var verificacao = true;
    try {
        return !eval("verificacao");    
    }
    catch (e) {
        return true;
    }
}

function carregarArquivo(bibliotecas, carregadoFunction, tipoPadrao) {
    /// <summary>
    /// Carrega uma lista de arquivos.
    /// </summary>
    /// <param name="bibliotecas" type="string|array string">Nome do arquivo (ou lista de nomes) para carregar como include JS ou CSS.</param>
    /// <param name="carregadoFunction" type="function">Função executada ao final do carregamento.</param>
    /// <param name="tipoPadrao" type="string">Opcional, porque é detectado pela extensão do arquivo. Deve ser "js" ou "css".</param>

    //Necessário converter para array caso tenha passado um arquivo único.
    if (typeof (bibliotecas) === "string") {
        bibliotecas = [bibliotecas];
    }

    //Determina se um arquivo é de determinado tipo.
    var fExtensaoValida = function (arquivo, extensao) {
        return !!arquivo.match(new RegExp("\\." + extensao + "$", "gi"));
    }

    //Atribui os eventos necessários para quando um arquivo for carregado.
    var fAtribuirEvento = function (tag, funcao, bibliotecas) {
        if (tag.readyState) { //IE
            tag.onreadystatechange = function () {
                if (tag.readyState == "loaded" || tag.readyState == "complete") {
                    tag.onreadystatechange = null;
                    funcao(bibliotecas);
                }
            };
        } else { //Outros
            tag.onload = function () { funcao(bibliotecas); };
        }
    }

    //Carrega os arquivos em ordem sequencial.
    var fCarregar = function (bibliotecas) {
        if (Array.isArray(bibliotecas) && bibliotecas.length) {
            var arquivo = bibliotecas.shift();
            var tipo = fExtensaoValida(arquivo, "js") ? "js" : fExtensaoValida(arquivo, "css") ? "css" : null;
            if (tipo != null) {
                arquivo = !minificado() ? arquivo : arquivo.substr(0, arquivo.length - tipo.length) + "min." + arquivo.substr(arquivo.length - tipo.length);
                arquivo = arquivo.replace(/\.min\.min\.(?=(js|css))/gi, ".min.");
            } else {
                tipo = tipoPadrao;
            }

            var id = arquivo.replace(/[^0-9a-z]/gi, "").toLowerCase();

            var tagJaExistente = document.getElementById(id);
            if (tagJaExistente) {
                //Remove a tag caso já exista.
                tagJaExistente.parentNode.removeChild(tagJaExistente);
            }

            if (tipo === "js") {
                var tagScript = document.createElement("script");
                fAtribuirEvento(tagScript, fCarregar, bibliotecas);
                tagScript.id = id;
                tagScript.type = "text/javascript";
                tagScript.src = arquivo;
                document.getElementsByTagName("head")[0].appendChild(tagScript);
            } else if (tipo === "css") {
                var tagLink = document.createElement("link");
                fAtribuirEvento(tagLink, fCarregar, bibliotecas);
                tagLink.id = id;
                tagLink.rel = 'stylesheet';
                tagLink.type = 'text/css';
                tagLink.media = 'all';
                tagLink.href = arquivo;
                document.getElementsByTagName("head")[0].appendChild(tagLink);
            }
        } else {
            if (typeof (carregadoFunction) === "function") {
                carregadoFunction();
            }
        }
    }
    fCarregar(bibliotecas);
}

carregarArquivo([

    //Intel XDK: Arquivos criados automaticamente no início do projeto.
    "plugins/xdk/init-dev.js",
    "plugins/xdk/init-app.js",

    //Framework: jQuery
    "plugins/jquery/jquery.js",

    //Framework: AngularJS
    "plugins/angular/angular.js",

    //Estilos globais para todo o aplicativo.
    "css/global.css",

    //Classes do sistema.
    "js/class_Site.js",
    "js/class_Util.js",
    "js/class_Cordova.js",
    "js/class_NavegadorComum.js",

], function () {

    //Instância da classe que gerencia o funcionamento do site/aplicativo.
    window.Site = new window.Site();

});