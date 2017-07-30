﻿window.Util = function (site) {
    /// <summary>
    /// Classe principal de controle do sistema inteiro.
    /// </summary>
    /// <returns type="object">Instancia.</returns>

    //Singleton
    if (!Util._instancia) { Util._instancia = this; } else { return Util._instancia; }

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

    _this.CarregarArquivos = function (bibliotecas, carregadoFunction, tipoPadrao) {
        /// <summary>
        /// Carrega uma lista de arquivos.
        /// </summary>
        /// <param name="bibliotecas" type="string|array string">Nome do arquivo (ou lista de nomes) para carregar como include JS ou CSS.</param>
        /// <param name="carregadoFunction" type="function">Função executada ao final do carregamento.</param>
        /// <param name="tipoPadrao" type="string">Opcional, porque é detectado pela extensão do arquivo. Deve ser "js" ou "css".</param>

        return window.carregarArquivo(bibliotecas, carregadoFunction, tipoPadrao);
    };

    _this.Minificado = function () {
        /// <summary>
        /// Retorna informação se as bibliotecas estão sendo carregadas minificadas.
        /// </summary>
        /// <returns type="boolean"></returns>

        return window.minificado();
    };

    _this.ToString = function (obj) {
        /// <summary>
        /// Converte um objeto em string.
        /// </summary>
        /// <param name="obj" type="object">Qualquer coisa.</param>

        clearTimeout(window.ToStringTimeout);

        var result;
        var ident = arguments.length >= 2 ? arguments[1] : undefined;

        if (obj == null) {
            result = String(obj);
        }

        if (!result) {
            window.ToStringRecursive = window.ToStringRecursive ? window.ToStringRecursive : [];
            if (ToStringRecursive.indexOf(obj) >= 0) {
                result = obj ? (typeof (obj) == "string" ? "\"" + obj + "\"" : obj.toString()) : obj;
            } else {
                ToStringRecursive.push(obj);
            }
            if (!result) {
                switch (typeof obj) {
                    case "string":
                        result = '"' + obj + '"';
                        break;
                    case "function":
                        result = obj.name || obj.toString();
                        break;
                    case "object":
                        var indent = Array(ident || 1).join('\t'),
                            isArray = Array.isArray(obj);
                        result = '{['[+isArray] + Object.keys(obj).map(
                            function (key) {
                                return '\n\t' + indent + key + ': ' + _this.ToString(obj[key], (ident || 1) + 1);
                            }).join(',') + '\n' + indent + '}]'[+isArray];
                        break;
                    default:
                        result = obj.toString();
                        break;
                }
            }
        }

        window.ToStringTimeout = setTimeout(function () {
            delete window.ToStringTimeout;
            delete window.ToStringRecursive;
        }, 100);

        return result;
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