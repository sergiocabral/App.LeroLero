﻿var $scope = Site.Angular.ConteudoControllerContext.$scope;
var $location = Site.Angular.ConteudoControllerContext.$location;
var $rootScope = Site.Angular.ConteudoControllerContext.$rootScope;
var $window = Site.Angular.ConteudoControllerContext.$window;

$scope.assuntos = [
    {
        titulo: "Business",
        descricao: "Reunião de negócios na empresa com pessoal em altos cargos.",
        arquivo: "/frases/negocios.js"
    },
    {
        titulo: "Informática",
        descricao: "Departamento de informática, incluindo desenvolvimento, apoio ao usuário, infraestrutura, etc.",
        arquivo: "/frases/informatica.js"
    }
];

$(document).ready(function () { emoji(); });

$scope.selecionar = function (index) {
    $rootScope.assunto = $scope.assuntos[index];
    Site.Util.CarregarArquivos($rootScope.assunto.arquivo, function () {
        $rootScope.frases = window.frases;
        $window.location.href = "#!/embromation";
    });
};