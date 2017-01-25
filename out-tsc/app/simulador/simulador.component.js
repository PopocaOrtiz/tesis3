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
    function SimuladorComponent(dataService) {
        this.dataService = dataService;
    }
    SimuladorComponent.prototype.guardar = function () {
        this.dataService.list()
            .subscribe(function (response) {
            var diagramas = response.json();
            sessionStorage.setItem("diagrama", diagramas[0]['model']);
        });
    };
    SimuladorComponent.prototype.elementoSeleccionado = function (key) {
        this.temaTutorial = "Prueba de contenido de mensaje";
        for (var _i = 0, _a = this.diagrama.model.nodeDataArray; _i < _a.length; _i++) {
            var node = _a[_i];
            this.diagrama.model.setDataProperty(node, "highlight", false);
        }
        var data = this.diagrama.model.findNodeDataForKey(key);
        this.diagrama.model.setDataProperty(data, "highlight", true);
    };
    SimuladorComponent.prototype.agregarNodo = function (tipo) {
        var nombre = '';
        var imagen = '';
        switch (tipo) {
            case 'repetidor':
                nombre = 'Repetidor';
                imagen = "/fibras/assets/img/repetidor.png";
                break;
            case 'emisor':
                nombre = 'Emisor de luz';
                imagen = "/fibras/assets/img/emisor.png";
                break;
            case 'receptor':
                nombre = 'Receptor de luz';
                imagen = "/fibras/assets/img/receptor.png";
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
    SimuladorComponent.prototype.actualizarLink = function () {
        this.diagrama.model.setDataProperty(this.dataLinkSelected, "stroke", "red");
    };
    SimuladorComponent.prototype.iniciar = function () {
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
                source: "../assets/img/emisor.png",
            },
            {
                key: "2",
                //parent: "1",
                name: "Receptor de luz",
                category: "receptor",
                source: "../assets/img/receptor.png",
            }
        ];
        var linkDataArray = [];
        //new go.GraphLinksModel(nodeDataArray, linkDataArray);
        var modeloGuardado = sessionStorage.getItem("diagrama");
        if (modeloGuardado)
            this.diagrama.model = go.Model.fromJson(JSON.parse(modeloGuardado));
        else
            this.diagrama.model = MAKE(go.GraphLinksModel, { linkFromPortIdProperty: "fromPort",
                linkToPortIdProperty: "toPort",
                nodeDataArray: nodeDataArray,
                linkDataArray: linkDataArray });
    };
    SimuladorComponent.prototype.ngOnInit = function () {
        this.mensaje = "Listo";
        this.dataService.setResource('/simulaciones');
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
//# sourceMappingURL=C:/Users/user/Documents/GitHub/fibras/src/app/simulador/simulador.component.js.map