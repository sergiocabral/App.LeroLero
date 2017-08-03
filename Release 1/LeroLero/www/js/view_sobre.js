var $scope = Site.Angular.ConteudoControllerScope;

$scope.acessarPortalCabral = function () {
    Site.Comportamento.AbrirUrl("http://www.cabral.br.com/");
};

$scope.girar = function (e) {
    var girando = Boolean($scope.girando);
    var obj = $(e.target);
    var tempo = 3;
    var fGirar = function () {
        if (!obj.hasClass("girar")) { return; }
        if (String(obj.css("animation")).indexOf("girar") >= 0) {
            obj.css("animation", "");
            setTimeout(fGirar, 100);
        }
        else {
            var direcao = obj.attr("animation") != "girar-horario" ? "girar-horario" : "girar-antihorario";
            obj.attr("animation", direcao);
            obj.css("animation", direcao + " " + tempo + "s both ease-in");
            setTimeout(fGirar, tempo * 1000);
        }
    }

    obj.toggleClass("girar");    
    if (obj.hasClass("girar")) {
        fGirar();
    }
}