/**
 * Componente encargado de renderizar una simulacion
 * Los datos de esta simulacion se tienen que mandar
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { DataService } from "../data.service";
export var SimuladorComponent = (function () {
    function SimuladorComponent(simulacionesService) {
        this.simulacionesService = simulacionesService;
        this.simulacionSeleccionada = {
            model: null,
            fecha: null,
            usuario: null,
            nombre: null
        };
    }
    SimuladorComponent.prototype.getFecha = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var newDay = dd.toString();
        if (dd < 10) {
            newDay = '0' + dd;
        }
        var newMonth = mm.toString();
        if (mm < 10) {
            newMonth = '0' + mm;
        }
        return newMonth + '/' + newDay + '/' + yyyy;
    };
    SimuladorComponent.prototype.guardar = function () {
        var _this = this;
        this.simulacionesService.setResource('simulaciones');
        if (this.simulacionSeleccionada.id) {
            var data = {
                model: this.diagrama.model.toJson(),
            };
            this.simulacionesService.update(this.simulacionSeleccionada.id, data)
                .subscribe(function (response) {
                alert("Se guardo correctamente");
            });
        }
        else {
            var data_1 = {
                model: this.diagrama.model.toJson(),
                fecha: this.getFecha(),
                usuario: 'Yo',
                nombre: this.simulacionSeleccionada.nombre
            };
            this.simulacionesService.post(data_1)
                .subscribe(function (response) {
                alert("Se guardo correctamente");
                _this.simulaciones.push(data_1);
            });
        }
    };
    SimuladorComponent.prototype.elementoSeleccionado = function (key) {
        for (var _i = 0, _a = this.diagrama.model.nodeDataArray; _i < _a.length; _i++) {
            var node = _a[_i];
            this.diagrama.model.setDataProperty(node, "highlight", false);
        }
        var data = this.diagrama.model.findNodeDataForKey(key);
        this.diagrama.model.setDataProperty(data, "highlight", true);
        switch (data.category) {
            case "emisor":
                this.temaTutorial = "Emisores opticos\n\n        Entre los emisores opticos tenemos a los diodos led y los diodos laser.\n\n        Diodos LED\n\n        Son fuentes de luz con emisi\u00F3n espont\u00E1nea o natural (no coherente), son diodos semiconductores de uni\u00F3n p-n que para emitir luz se polarizan directamente.\n        La energ\u00EDa luminosa emitida por el LED es proporcional al nivel de corriente de la polarizaci\u00F3n del diodo.\n        \n        Existen dos tipos de LED:\n\n        LED de superficie que emite la luz a trav\u00E9s de la superficie de la zona activa.\n        LED de perfil que emite a trav\u00E9s de la secci\u00F3n transversal (este tipo es mas direccional\n\n        Diodos LASER (LD)\n\n        Son fuentes de luz coherente de emisi\u00F3n estimulada con espejos semireflejantes formando una cavidad resonante, la cual sirve para realizar la retroalimentaci\u00F3n \u00F3ptica, as\u00ED como el elemento de selectividad (igual fase y frecuencia).\n        La emisi\u00F3n del LD es siempre de perfil, estos tienen una corriente de umbral y a niveles de corriente arriba del umbral la luz emitida es coherente, y a niveles menores al umbral el LD emite luz incoherente como un LED.\n        La figura muestra una comparaci\u00F3n de los espectros emitidos por un LED y un LD.\n        ";
                break;
            case "receptor":
                this.temaTutorial = "Fotodetector\n\n        Convierte la potencia \u00F3ptica incidente en corriente el\u00E9ctrica, esta corriente es muy d\u00E9bil por lo que debe amplificarse. Las caracter\u00EDsticas principales que debe tener son:\n\n        Sensibilidad alta a la longitud de onda de operaci\u00F3n\n        Contribuci\u00F3n m\u00EDnima al ruido total del receptor\n        Ancho de banda grande (respuesta r\u00E1pida)\n\n        Fotodetectores PIN\n\n        Genera un solo par electr\u00F3n-hueco por fot\u00F3n absorbido. Son los m\u00E1s comunes y est\u00E1n formados por una capa de material semiconductor ligeramente contaminado (regi\u00F3n intr\u00EDnseca), la cual se coloca entre dos capas de material semiconductor, una tipo N y otra tipo P. Cuando se le aplica una polarizaci\u00F3n inversa al fotodetector, se crea una zona des\u00E9rtica (libre de portadores) en la regi\u00F3n intr\u00EDnseca en la cual se forma un campo el\u00E9ctrico. Donde un fot\u00F3n en la zona des\u00E9rtica con mayor energ\u00EDa o igual a la del material semiconductor, puede perder su energ\u00EDa y excitar a un electr\u00F3n que se encuentra en la banda de valencia para que pase a la banda de conducci\u00F3n. Este proceso genera pares electr\u00F3n \u2013 hueco que se les llama fotoportadores.\n\n        Fotodetectores de Avalancha APD\n\n        Presenta ganancia interna y genera mas de un par electr\u00F3n-hueco, debido al proceso de ionizaci\u00F3n de impacto llamado ganancia de avalancha. Cuando a un fotodetector se le aumenta el voltaje de polarizaci\u00F3n, llega un momento en que la corriente crece por el fen\u00F3meno de avalancha, si en esta regi\u00F3n se controla el fen\u00F3meno de avalancha limitando la corriente (antes de la destrucci\u00F3n del dispositivo), la sensibilidad del fotodetector se incrementa.\n        ";
                break;
            case "repetidor":
                this.temaTutorial = "Empalmes y conexion de fibras opticas\n\n        Para la instalaci\u00F3n de sistemas de fibra \u00F3ptica es necesario utilizar t\u00E9cnicas y dispositivos de interconexi\u00F3n como empalmes y conectores.\n\n        Los conectores son dispositivos mec\u00E1nicos utilizados para recoger la mayor cantidad de luz. Realizan la conexi\u00F3n del emisor y receptor \u00F3ptico.\n\n        En caso de que los n\u00FAcleos no se empalmen perfecta y uniformemente, una parte de la luz que sale de un n\u00FAcleo no incide en el otro n\u00FAcleo y se pierde. Por tanto las perdidas que se introducen por esta causa pueden constituir un factor muy importante en el dise\u00F1o de sistemas de transmisi\u00F3n, particularmente en enlaces de telecomunicaciones de gran distancia.\n\n        Las p\u00E9rdidas de uni\u00F3n son causadas frecuente\u00ADmente por una mala alineaci\u00F3n lateral, mala alineaci\u00F3n de separaci\u00F3n, mala alineaci\u00F3n angular, acabados de superficie imperfectos y diferencias ya sea entre n\u00FAcleos o diferencia de \u00EDndices.\n\n        Empalme por fusi\u00F3n\n\n        Se realiza fundiendo el n\u00FAcleo, siguiendo las etapas de:\n\n        preparaci\u00F3n y corte de los extremos\n        alineamiento de las fibras\n        soldadura por fusi\u00F3n\n        protecci\u00F3n del empalme\n\n        Empalme mec\u00E1nico\n\n        Este tipo de empalme se usa en el lugar de la instalaci\u00F3n donde el desmontaje es frecuente, es importante que las caras del n\u00FAcleo de la fibra \u00F3ptica coincidan exactamente. Consta de un elemento de auto alineamiento y sujeci\u00F3n de las fibras y de un adhesivo adaptador de \u00EDndice que fija los extremos de las fibras permanentemente.\n\n        Despu\u00E9s de realizado el empalme de la fibra \u00F3ptica se debe proteger con:\n\n        manguitos met\u00E1licos\n        manguitos termoretr\u00E1ctiles\n        manguitos pl\u00E1sticos.\n\n        En todos los casos para el sellado del manguito se utiliza adhesivo o resina de secado r\u00E1pido.\n\n        ";
                break;
        }
    };
    SimuladorComponent.prototype.agregarNodo = function (tipo) {
        var nombre = '';
        var imagen = '';
        switch (tipo) {
            case 'repetidor':
                nombre = 'Repetidor';
                imagen = "/tesis3/assets/img/repetidor.png";
                break;
            case 'emisor':
                nombre = 'Emisor de luz';
                imagen = "/tesis3/assets/img/emisor.png";
                break;
            case 'receptor':
                nombre = 'Receptor de luz';
                imagen = "/tesis3/assets/img/receptor.png";
                break;
        }
        this.diagrama.model.addNodeData({
            key: +new Date(),
            name: nombre,
            category: tipo,
            source: imagen
        });
    };
    SimuladorComponent.prototype.eliminarLinkSeleccionado = function () {
        this.diagrama.model.removeLinkData(this.dataLinkSelected);
    };
    SimuladorComponent.prototype.eliminarSimulacion = function () {
        var _this = this;
        if (confirm("Eliminar simulacion?")) {
            this.simulacionesService.delete(parseInt(this.simulacionSeleccionada.id))
                .subscribe(function (response) {
                alert("Eliminada correctamente");
                _this.simulaciones.splice(_this.simulaciones.indexOf(_this.simulacionSeleccionada), 1);
                _this.mostrarSimulador = false;
            });
        }
    };
    SimuladorComponent.prototype.actualizarLink = function () {
        this.diagrama.model.setDataProperty(this.dataLinkSelected, "stroke", "red");
    };
    SimuladorComponent.prototype.iniciar = function (simulacion) {
        if (simulacion === void 0) { simulacion = null; }
        this.temaTutorial = "Para transmitir informaci\u00F3n mediante se\u00F1ales luminosas a trav\u00E9s de un conductor (fibra \u00F3ptica) se requiere que en el punto emisor y receptor existan elementos para convertir las se\u00F1ales el\u00E9ctricas en \u00F3pticas y viceversa.\n    En el extremo emisor la intensidad de una fuente luminosa se modula mediante una se\u00F1al el\u00E9ctrica y en el extremo receptor, la se\u00F1al \u00F3ptica se convierte en una se\u00F1al el\u00E9ctrica.";
        var MAKE = go.GraphObject.make;
        var nodeDataArray = [];
        var linkDataArray = [];
        if (simulacion)
            this.diagrama.model = go.Model.fromJson(JSON.parse(simulacion.model));
        else
            this.diagrama.model = MAKE(go.GraphLinksModel, { linkFromPortIdProperty: "fromPort",
                linkToPortIdProperty: "toPort",
                nodeDataArray: nodeDataArray,
                linkDataArray: linkDataArray });
    };
    SimuladorComponent.prototype.verSimulacion = function (simulacion) {
        this.iniciar(simulacion);
        this.mostrarSimulador = true;
        this.simulacionSeleccionada = simulacion;
    };
    SimuladorComponent.prototype.nuevaSimulacion = function () {
        var nombreNuevaSimulacion;
        if (nombreNuevaSimulacion = prompt("Nombre de la simulacion?")) {
            this.iniciar();
            this.mostrarSimulador = true;
            this.simulacionSeleccionada = {
                model: null,
                fecha: null,
                usuario: null,
                nombre: nombreNuevaSimulacion
            };
        }
    };
    SimuladorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.prepararSimulador();
        this.mensaje = "Listo";
        this.simulacionesService.setResource('simulaciones');
        this.simulacionesService.list()
            .subscribe(function (response) {
            _this.simulaciones = response;
            console.log("Simulaciones Cargadas", _this.simulaciones);
        });
    };
    SimuladorComponent.prototype.prepararSimulador = function () {
        var _this = this;
        // create a make type from go namespace and assign it to MAKE
        var MAKE = go.GraphObject.make;
        // get the div in the HTML file
        var diagramDiv = this.div.nativeElement;
        //let layoutDiagram = MAKE(go.TreeLayout,{ angle: 90, layerSpacing: 35 });
        var configuracionInicial = {
            initialContentAlignment: go.Spot.Center,
            "undoManager.isEnabled": true,
            layout: MAKE(go.LayeredDigraphLayout, { columnSpacing: 10 })
        };
        // instatiate MAKE with Diagram type and the diagramDiv
        this.diagrama = MAKE(go.Diagram, diagramDiv, configuracionInicial);
        var repetidorTemplate = MAKE(go.Node, "Vertical", MAKE(go.Panel, "Auto", MAKE(go.Shape, {
            figure: "RoundedRectangle",
            isPanelMain: true,
            fill: "transparent",
            stroke: "transparent"
        }), MAKE(go.Panel, "Table", MAKE(go.Shape, "Rectangle", { width: 10, height: 10, fill: "#5d5d5d", stroke: null,
            portId: "Entrada",
            fromSpot: go.Spot.Left,
            toLinkable: true,
            toMaxLinks: 1,
            row: 0,
            column: 0
        }), MAKE(go.Panel, "Auto", {
            row: 0,
            column: 1
        }, MAKE(go.Shape, {
            figure: "RoundedRectangle",
            strokeWidth: 3,
            isPanelMain: true,
            fill: 'white'
        }, new go.Binding("fill", "highlight", function (v) { return v ? "silver" : 'white'; })), MAKE(go.Panel, "Vertical", MAKE(go.Picture, { width: 50, height: 50 }, new go.Binding("source")), MAKE(go.TextBlock, { margin: 5 }, new go.Binding("text", "name")))), MAKE(go.Shape, "Rectangle", { width: 10, height: 10, fill: "#5d5d5d", stroke: null,
            portId: "Salida",
            toSpot: go.Spot.Right,
            row: 0,
            column: 2,
            fromLinkable: true,
            toMaxLinks: 1
        }))));
        var emisorTemplate = MAKE(go.Node, "Vertical", MAKE(go.Panel, "Auto", MAKE(go.Shape, {
            figure: "RoundedRectangle",
            isPanelMain: true,
            fill: "transparent",
            stroke: "transparent"
        }), MAKE(go.Panel, "Table", MAKE(go.Panel, "Auto", {
            row: 0,
            column: 0
        }, MAKE(go.Shape, {
            figure: "RoundedRectangle",
            strokeWidth: 3,
            isPanelMain: true,
            fill: 'white'
        }, new go.Binding("fill", "highlight", function (v) { return v ? "silver" : 'white'; })), MAKE(go.Panel, "Vertical", MAKE(go.Picture, { width: 50, height: 50 }, new go.Binding("source")), MAKE(go.TextBlock, { margin: 5 }, new go.Binding("text", "name")))), MAKE(go.Shape, "Rectangle", { width: 10, height: 10, fill: "#5d5d5d", stroke: null,
            portId: "Salida",
            toSpot: go.Spot.Right,
            row: 0,
            column: 1,
            fromLinkable: true,
            toMaxLinks: 1
        }))));
        var receptorTemplate = MAKE(go.Node, "Vertical", MAKE(go.Panel, "Auto", MAKE(go.Shape, {
            figure: "RoundedRectangle",
            isPanelMain: true,
            fill: "transparent",
            stroke: "transparent"
        }), MAKE(go.Panel, "Table", MAKE(go.Shape, "Rectangle", { width: 10, height: 10, fill: "#5d5d5d", stroke: null,
            portId: "Entrada",
            fromSpot: go.Spot.Left,
            toLinkable: true,
            toMaxLinks: 1,
            row: 0,
            column: 0
        }), MAKE(go.Panel, "Auto", {
            row: 0,
            column: 1
        }, MAKE(go.Shape, {
            figure: "RoundedRectangle",
            strokeWidth: 3,
            isPanelMain: true,
            fill: 'white'
        }, new go.Binding("fill", "highlight", function (v) { return v ? "silver" : 'white'; })), MAKE(go.Panel, "Vertical", MAKE(go.Picture, { width: 50, height: 50 }, new go.Binding("source")), MAKE(go.TextBlock, { margin: 5 }, new go.Binding("text", "name")))))));
        // the template we defined earlier
        this.diagrama.nodeTemplateMap.add("repetidor", repetidorTemplate);
        this.diagrama.nodeTemplateMap.add("emisor", emisorTemplate);
        this.diagrama.nodeTemplateMap.add("receptor", receptorTemplate);
        // define a Link template that routes orthogonally, with no arrowhead
        this.diagrama.linkTemplate =
            MAKE(go.Link, {
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpGap,
                reshapable: true,
                resegmentable: true,
                corner: 5,
                cursor: "pointer",
                click: function (e, obj) {
                    //window.open("https://en.wikipedia.org/w/index.php?search=" + encodeURIComponent(obj.part.data.text));
                }
            }, MAKE(go.Shape, { strokeWidth: 3, stroke: "#555" }, new go.Binding("stroke", "stroke")), MAKE(go.Shape, { toArrow: "Standard" }), // this is an arrowhead
            MAKE(go.TextBlock, { segmentOffset: new go.Point(-20, -40) }, { segmentOffset: new go.Point(-20, -40) }, new go.Binding("text", "text"))); // the link shape
        this.diagrama.addModelChangedListener(function (evt) {
            if (evt.diagram)
                console.log("Cambio el diagrama");
            if (evt.object) {
                console.log("Cambio un objeto", evt.propertyName, evt.oldValue, evt.newValue);
            }
        });
        this.diagrama.addDiagramListener("ObjectSingleClicked", function (e) {
            var part = e.subject.part;
            if (part instanceof go.Link) {
                part.isSelected = false;
                _this.dataLinkSelected = part.data;
            }
            else
                _this.elementoSeleccionado(part.data.key);
        });
        //new go.GraphLinksModel(nodeDataArray, linkDataArray);
        //let modeloGuardado = sessionStorage.getItem("diagrama");
        //if(modeloGuardado)
        //else
    };
    __decorate([
        ViewChild('myDiagramDiv2'), 
        __metadata('design:type', Object)
    ], SimuladorComponent.prototype, "div", void 0);
    SimuladorComponent = __decorate([
        Component({
            //moduleId: module.id,
            selector: 'app-simulador',
            templateUrl: './simulador.component.html',
            styleUrls: ['./simulador.component.css']
        }), 
        __metadata('design:paramtypes', [DataService])
    ], SimuladorComponent);
    return SimuladorComponent;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/simulador/simulador.component.js.map