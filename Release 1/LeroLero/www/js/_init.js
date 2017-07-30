/**
 * Retorna informação se as bibliotecas estão sendo carregadas minificadas.
 */
function minificado() {
    var verificacao = true;
    try {
        return !eval("verificacao");    
    }
    catch (e) {
        return true;
    }
}

/**
 * Carrega uma lista de arquivos.
 * @param {array|string}  bibliotecas       Arquivo arquivo JS ou CSS para ser carregado. Aceita Array com lista de arquivos.
 * @param {function}      carregadoFunction Função executada no final do carregamento.
 * @param {string}        tipoPadrao        Tipo padrão dos arquivos. Necessário apenas para referências iniciadas com http://...
 */
function carregarArquivo(bibliotecas, carregadoFunction, tipoPadrao) {
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
    //Intel XDK: normalizes device and document ready events, see README for details
    "plugins/xdk/init-dev.js",
    //Intel XDK: recommended location of your JavaScript code relative to other JS files
    "plugins/xdk/init-app.js",

    //Framework: AngularJS
    "plugins/angular/angular.js",

    //Estilos globais para todo o aplicativo.
    "css/global.css"
], function () {
    //Inicializar aplicativo.
    alert(minificado());
});
