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
import * as go from "gojs";
///<reference path="go.d.ts"/>
// declare let go:any;
// create a make type from go namespace and assign it to MAKE
var MAKE = go.GraphObject.make;
// Define a bunch of small Shapes that can be used as values for Shape.pathPattern
var PathPatterns = new go.Map('string', go.Shape);
export var SimuladorComponent = (function () {
    function SimuladorComponent(simulacionesService) {
        this.simulacionesService = simulacionesService;
        this.simulacionSeleccionada = {
            model: null,
            fecha: null,
            usuario: null,
            nombre: null
        };
        this.coloresFrecuencias = [
            {
                'color': 'Red',
                'frecuencia': [400, 470]
            }, {
                'color': 'DarkOrange',
                'frecuencia': [470, 520]
            }, {
                'color': 'Gold',
                'frecuencia': [520, 590]
            }, {
                'color': 'Green',
                'frecuencia': [590, 650]
            }, {
                'color': 'Blue',
                'frecuencia': [650, 700]
            }, {
                'color': 'SlateBlue',
                'frecuencia': [700, 760]
            }, {
                'color': 'Purple',
                'frecuencia': [760, 800]
            }
        ];
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
    SimuladorComponent.prototype.elementoSeleccionado = function (part) {
        var _this = this;
        var key = part.data.key;
        for (var _i = 0, _a = this.diagrama.model.nodeDataArray; _i < _a.length; _i++) {
            var node = _a[_i];
            this.diagrama.model.setDataProperty(node, "highlight", false);
        }
        var data = this.diagrama.model.findNodeDataForKey(key);
        this.diagrama.model.setDataProperty(data, "highlight", true);
        this.verTemaTutorial = data.category;
        switch (data.category) {
            case "emisor":
                break;
            case "receptor":
                break;
            case "repetidor":
                break;
        }
        part.findLinksConnected("Salida").each(function (l) {
            _this.dataLinkSelected = l.data;
        });
        /*
         part.linksConnected.each((l)=>{
           debugger;
             this.dataLinkSelected = l.data;
             this.diagrama.model.setDataProperty(l.data, "patron", "BigZigzagR");
         });
         */
    };
    SimuladorComponent.prototype.agregarNodo = function (tipo) {
        var nombre = '';
        var imagen = '';
        switch (tipo) {
            case 'repetidor':
                nombre = 'Amplificador';
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
    SimuladorComponent.prototype.actualizarLink = function (patron, modoLabel) {
        if (patron === void 0) { patron = null; }
        if (modoLabel === void 0) { modoLabel = null; }
        if (patron) {
            this.diagrama.model.setDataProperty(this.dataLinkSelected, "patron", patron);
        }
        if (modoLabel) {
            this.diagrama.model.setDataProperty(this.dataLinkSelected, "text", modoLabel);
        }
    };
    SimuladorComponent.prototype.seleccionarFuente = function (fuente) {
        this.tipoFuenteSeleccionada = fuente;
        switch (fuente) {
            case 'led':
                break;
        }
    };
    SimuladorComponent.prototype.seleccionarNumeroModos = function () {
        switch (this.numeroModos.toString()) {
            case '1':
                this.tamanioNucleo = 10;
                this.tamanioRevestimiento = 120;
                this.actualizarLink(null, 'Monomodo');
                break;
            default:
                this.tamanioNucleo = 100;
                this.tamanioRevestimiento = 150;
                this.actualizarLink(null, 'Multimodo');
        }
    };
    SimuladorComponent.prototype.seleccionarFrecuenciaTransmicion = function () {
        var patron;
        for (var _i = 0, _a = this.coloresFrecuencias; _i < _a.length; _i++) {
            var frecuencia = _a[_i];
            if (this.frecuenciaTransmicion) {
                // usamos el color de esta frecuencia
                if (this.frecuenciaTransmicion > frecuencia.frecuencia[0] &&
                    this.frecuenciaTransmicion <= frecuencia.frecuencia[1]) {
                    if (this.numeroModos == 1) {
                        patron = 'Zigzag' + frecuencia.color;
                    }
                    else if (this.numeroModos > 1) {
                        patron = 'DoubleZigzag' + frecuencia.color;
                    }
                }
            }
        }
        if (patron) {
            this.actualizarLink(patron);
        }
    };
    SimuladorComponent.prototype.recalcularAperturaNumerica = function () {
        var aperturaNumerica = Math.sqrt(Math.pow(this.indiceNucleo, 2) - Math.pow(this.indiceRevestimiento, 2));
        this.aperturaNumerica = parseFloat(aperturaNumerica.toFixed(4));
    };
    SimuladorComponent.prototype.iniciar = function (simulacion) {
        // this.temaTutorial = ``;
        if (simulacion === void 0) { simulacion = null; }
        this.verTemaTutorial = 'inicio';
        var MAKE = go.GraphObject.make;
        var nodeDataArray = [
            {
                key: "1",
                name: "Repetidor",
                category: "repetidor",
                source: "/fibras/assets/img/repetidor.png",
                esElementoRed: true //conector, receptor, repetidor
            },
            {
                key: "2",
                //parent: "1",
                name: "Emisor de luz",
                category: "emisor",
                source: "/fibras/assets/img/emisor.png",
            },
            {
                key: "3",
                //parent: "1",
                name: "Receptor de luz",
                category: "receptor",
                source: "/fibras/assets/img/receptor.png",
            }
        ];
        var linkDataArray = [
            {
                from: "1",
                to: "2",
                text: "Monomodo",
                fromPort: 'Salida',
                toPort: 'Entrada',
                stroke: "red",
                // patron : 'BigZigzagR'
                patron: 'ZigzagGreen'
            },
            {
                from: "2",
                to: "3",
                text: "Multimodo",
                fromPort: 'Salida',
                toPort: 'Entrada',
                stroke: "red",
                patron: 'DoubleZigzagGold'
            }
        ];
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
            layout: MAKE(go.LayeredDigraphLayout, {
                columnSpacing: 10,
                layerSpacing: 150
            })
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
            MAKE(go.Link, go.Link.Bezier, {
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpGap,
                reshapable: true,
                resegmentable: true,
                // corner: 5,
                cursor: "pointer",
                click: function (e, obj) {
                    //window.open("https://en.wikipedia.org/w/index.php?search=" + encodeURIComponent(obj.part.data.text));
                }
            }, MAKE(go.Shape, { strokeWidth: 12, stroke: "transparent" }, 
            // new go.Binding("stroke", "stroke"),
            new go.Binding("pathPattern", "patron", function (name) { return PathPatterns.getValue(name); })), MAKE(go.Shape, { toArrow: "Standard" }), // this is an arrowhead
            MAKE(go.TextBlock, { stroke: 'black' }, { segmentOffset: new go.Point(-20, -40) }, { segmentOffset: new go.Point(-20, -40) }, new go.Binding("text", "text"))); // the link shape
        this.diagrama.addModelChangedListener(function (evt) {
            if (evt.diagram)
                console.log("Cambio el diagrama");
            if (evt.object) {
                console.log("Cambio un objeto", evt.propertyName, evt.oldValue, evt.newValue);
            }
        });
        // se ejecuta cuando se hace click en un nodo o un link
        this.diagrama.addDiagramListener("ObjectSingleClicked", function (e) {
            var part = e.subject.part;
            if (part instanceof go.Link) {
                part.isSelected = false;
                _this.dataLinkSelected = part.data;
            }
            else {
                _this.elementoSeleccionado(part);
            }
        });
        //new go.GraphLinksModel(nodeDataArray, linkDataArray);
        //let modeloGuardado = sessionStorage.getItem("diagrama");
        //if(modeloGuardado)
        //else
        this.definirTiposLinksNodos();
    };
    SimuladorComponent.prototype.definirTiposLinksNodos = function () {
        for (var _i = 0, _a = this.coloresFrecuencias; _i < _a.length; _i++) {
            var divisionFrecuencia = _a[_i];
            this.definePathPattern("Zigzag" + divisionFrecuencia.color, "M0 4 L2 0 6 8 8 4", divisionFrecuencia.color);
            this.definePathPattern("DoubleZigzag" + divisionFrecuencia.color, "M0 3 L1 0 3 6 4 3 M0 9 L1 6 3 12 4 9", divisionFrecuencia.color);
        }
    };
    /*
    quitarNodo(){
      this.diagrama.commandHandler.deleteSelection();
    }
    */
    SimuladorComponent.prototype.definePathPattern = function (name, geostr, color, width, cap) {
        if (width === void 0) { width = null; }
        if (cap === void 0) { cap = null; }
        if (typeof name !== 'string' || typeof geostr !== 'string')
            throw new Error("invalid name or geometry string argument: " + name + " " + geostr);
        if (color === undefined)
            color = "black";
        if (width === undefined)
            width = 1;
        if (cap === undefined)
            cap = "square";
        PathPatterns.add(name, MAKE(go.Shape, {
            geometryString: geostr,
            fill: "transparent",
            stroke: color,
            strokeWidth: 1.5
        }));
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