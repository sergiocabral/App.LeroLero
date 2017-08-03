﻿var $scope = Site.Angular.ConteudoControllerContext.$scope;
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
$rootScope.partesSelecionadas = ($rootScope.partesSelecionadas || []).slice(0, $scope.grupo);

$scope.fraseVisibility = $scope.grupo == 0 ? 'hidden' : 'visible';

$scope.fraseAtual = function (e) {
    var frase = "";
    for (var i = 0; i < $rootScope.partesSelecionadas.length; i++) {
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
    $rootScope.partesSelecionadas.push(index);
    $window.location.href = "#!/embromation#" + ($scope.grupo + 2);
}