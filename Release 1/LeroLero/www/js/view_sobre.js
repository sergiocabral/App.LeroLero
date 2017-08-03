var $scope = Site.Angular.ConteudoControllerContext.$scope;

$scope.acessarPortalCabral = function () {
    Site.Comportamento.AbrirUrl("http://www.cabral.br.com/");
};

$scope.girar = function (e) {
    var obj = $(e.target);
    obj.attr("girando", obj.attr("girando") != "true");
    obj.attr("angulo", isNaN(obj.attr("angulo")) ? "0" : obj.attr("angulo"));
    obj.attr("direcao", isNaN(obj.attr("direcao")) ? "1" : obj.attr("direcao"));

    var fGirar = function () {
        if (obj.attr("girando") != "true") { return; }

        var angulo = parseInt(obj.attr("angulo")) + 1 * parseInt(obj.attr("direcao"));
        obj.attr("angulo", angulo);
        obj.css("transform", "rotate(" + angulo + "deg)");
        if (obj.is(":visible")) {
            setTimeout(fGirar, 1);
        }
    }

    if (obj.attr("girando") != "true") {
        obj.attr("direcao", parseInt(obj.attr("direcao")) * -1);
    }
    else {
        fGirar();
    }
}