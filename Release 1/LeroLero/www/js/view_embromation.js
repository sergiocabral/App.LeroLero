var $scope = Site.Angular.ConteudoControllerContext.$scope;
var $location = Site.Angular.ConteudoControllerContext.$location;
var $rootScope = Site.Angular.ConteudoControllerContext.$rootScope;
var $window = Site.Angular.ConteudoControllerContext.$window;

$scope.grupo = parseInt($location.hash());
$scope.grupo = (isNaN($scope.grupo) ? 1 : $scope.grupo) - 1;
$rootScope.partesSelecionadas = $rootScope.partesSelecionadas || [];
$scope.infoDisplay = $scope.grupo != 0 ? 'none' : 'block';
$scope.infoVisibility = $scope.grupo != 0 ? 'hidden' : 'visible';
$scope.fraseClass = $scope.grupo == 4 ? 'md-raised' : '';
$scope.fraseVisibility = $scope.grupo == 0 ? 'hidden' : 'visible';
$scope.finalDisplay = $scope.grupo == 4 ? 'block' : 'none';
$scope.aleatorioClass = $scope.grupo == 4 ? 'btn-aleatorio' : '';

$scope.fraseAtual = function (e) {
    var frase = "";
    for (var i = 0; i < $scope.grupo; i++) {
        frase += " " + $rootScope.frases[i][$rootScope.partesSelecionadas[i]];
    }
    return frase.trim();
}

$scope.partes = function () {
    var partes = $rootScope.frases[$scope.grupo];
    if (partes) {
        $(".ng-enter .md-button.frase").removeClass("large");
    }
    else {
        $(".ng-enter .md-button.frase").addClass("large");
    }
    return partes
}

$scope.selecionar = function (index) {
    $rootScope.partesSelecionadas[$scope.grupo] = index;
    $window.location.href = "#!/embromation#" + ($scope.grupo + 2);
}

$scope.copiar = function () {
    var texto = $(".md-button.frase").text();

    $(".conteudo")
        .append("<input type='text' class='clipboard' style='position: fixed; top: -100px;' />")
        .find("input.clipboard")
        .val(texto)
        .select()
        .focus();
    document.execCommand("copy");
    Site.SocialShare.Compartilhar("instagram", texto); //Funciona como CTRL+C

    $(".conteudo input.clipboard").remove();
    $(".conteudo .final p > span").animate({ "opacity": "1" });
    setTimeout(function () { $(".conteudo .final p > span").animate({ "opacity": "0" }); }, 2000);
}

$scope.randomico = function () {
    for (var i = 0; i < $rootScope.frases.length; i++) {
        $rootScope.partesSelecionadas[i] = Site.Util.NumeroAleatorio($rootScope.frases[i].length - 1);
    }
    $window.location.href = "#!/embromation#5";
}

$scope.compartilhar_processando = false;
$scope.compartilhar = function (rede) {
    if ($scope.compartilhar_processando) { return; }
    $scope.compartilhar_processando = true;
    
    $("body").append($(".md-button.frase")[0].outerHTML.replace("visibility", "z-index: -1000; padding: 5px; text-align: center; background-image: url(img/bla-bla-bla-fundo.png); background-repeat: no-repeat; background-position: center; background-size: cover;" + "visibility"));
    var obj = $("body > .md-button.frase");
    var texto = obj.text();
    if (obj.height() < 300) {
        obj.height(300);
    }
    if (obj.height() < obj.width()) {
        var bkp = obj.width();
        obj.width(obj.height());
        obj.height(bkp);
    }

    var fResize = function () {
        if (obj.height() > obj.width()) {
            obj.height(obj.height() - 10);
            setTimeout(fResize, 1);
        }
        else {
            html2canvas(obj[0], {
                onrendered: function (canvas) {
                    obj.remove();
                    window.canvas2ImagePlugin.saveImageDataToLibrary(
                        function (imagem) {
                            imagem = "file://" + imagem;
                            Site.SocialShare.Compartilhar(rede, texto, imagem);
                        },
                        function (err) {
                            console.log(err);
                        },
                        canvas);
                    $scope.compartilhar_processando = false;
                }
            });
        }
    }
    fResize();
}

var fPiscaAleatorio = function () {
    if (window.intervalfPiscaAleatorio) { return; }

    window.intervalfPiscaAleatorio = setInterval(function () {
        var objs = $("img[src*=1f4a9]:visible");

        if (objs.length > 0) {
            objs.animate({ "opacity": "0.5" }, 250, function () {
                objs.animate({ "opacity": "1" }, 250);
            });
        }
        else {
            clearInterval(window.intervalfPiscaAleatorio);
            window.intervalfPiscaAleatorio = 0;
        }
    }, 1000);
}
fPiscaAleatorio();