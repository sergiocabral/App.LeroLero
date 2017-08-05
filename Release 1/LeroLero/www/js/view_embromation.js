var $scope = Site.Angular.ConteudoControllerContext.$scope;
var $location = Site.Angular.ConteudoControllerContext.$location;
var $rootScope = Site.Angular.ConteudoControllerContext.$rootScope;
var $window = Site.Angular.ConteudoControllerContext.$window;

$scope.frases = [
    [
        'Caros colegas,',
        'Por outro lado,',
        'Não podemos esquecer que',
        'Do mesmo modo,',
        'A prática mostra que',
        'Nunca é demais insistir que',
        'A experiência mostra que',
        'É fundamental ressaltar que',
        'O incentivo ao avanço tecnológico, assim como',
        'Assim como'
    ],
    [
        'a execução deste projeto',
        'a complexidade dos estudos efetuados',
        'a atual estrutura de organização',
        'o novo modelo estrutural aqui preconizado',
        'o desenvolvimento de formas distintas de atuação',
        'a constante divulgação das informações',
        'a consolidação das estruturas',
        'a análise dos diversos resultados',
        'o início do programa de formação de atitudes',
        'a expansão de nossa atividade'
    ],
    [
        'nos obriga à análise',
        'cumpre um papel essencial na formulação',
        'auxilia a preparação e a estruturação',
        'contribui para a correta determinação',
        'assume importantes posições na definição',
        'facilita a definição',
        'prejudica a percepção da importância',
        'oferece uma boa oportunidade de verificação',
        'acarreta um processo de reformulação',
        'exige precisão e definição'
    ],
    [
        'das nossas opções de desenvolvimento futuro.',
        'das nossas metas financeiras e administrativas.',
        'das atitudes e das atribuições da diretoria.',
        'das novas proposições.',
        'das opções básicas para o sucesso do programa.',
        'do nosso sistema de formação de quadros.',
        'das condições apropriadas para os negócios.',
        'dos índices pretendidos.',
        'das formas de ação.',
        'dos conceitos de participação geral.'
    ],
];

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
        frase += " " + $scope.frases[i][$rootScope.partesSelecionadas[i]];
    }
    return frase.trim();
}

$scope.partes = function () {
    var partes = $scope.frases[$scope.grupo];
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
    for (var i = 0; i < $scope.frases.length; i++) {
        $rootScope.partesSelecionadas[i] = Site.Util.NumeroAleatorio($scope.frases[i].length - 1);
    }
    $window.location.href = "#!/embromation#5";
}

$scope.compartilhar_processando = false;
$scope.compartilhar = function (rede) {
    if ($scope.compartilhar_processando) { return; }
    $scope.compartilhar_processando = true;

    $("body").append($(".md-button.frase")[0].outerHTML.replace("visibility", "z-index: -1000; padding: 5px; text-align: center;" + "visibility"));
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
                        function (file) {
                            file = "file://" + file;
                            alert(rede);
                            alert(texto);
                            alert(imagem);
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