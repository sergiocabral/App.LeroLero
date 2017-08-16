var $scope = Site.Angular.ConteudoControllerContext.$scope;
var $location = Site.Angular.ConteudoControllerContext.$location;
var $rootScope = Site.Angular.ConteudoControllerContext.$rootScope;
var $window = Site.Angular.ConteudoControllerContext.$window;

$scope.assuntos = [
    {
        titulo: "Business",
        descricao: "Reunião de negócios na empresa com presença da diretoria, gerentes, coordenadores, etc.",
        arquivo: "frases/negocios.js"
    },
    {
        titulo: "Informática",
        descricao: "Departamento de informática, incluindo desenvolvimento, apoio ao usuário, infraestrutura, etc. Tipo o pessoal do Edinc Macaé.",
        arquivo: "frases/informatica.js"
    },
    {
        titulo: "Bandido",
        descricao: "Pra muita gente ser bandido virou trabalho e o pessoal tem que se especializar na linguagem. Taí a solução pro bandido do dia-a-dia.",
        arquivo: "frases/bandido.js"
    },
];

$(document).ready(function () { emoji(); });

$scope.selecionar = function (index) {
    $rootScope.assunto = $scope.assuntos[index];
    Site.Util.CarregarArquivos($rootScope.assunto.arquivo, function () {
        $rootScope.frases = window.frases;
        $window.location.href = "#!/embromation";
    });
};