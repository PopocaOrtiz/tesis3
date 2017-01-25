/**
 * Componente encargado de renderizar una simulacion
 * Los datos de esta simulacion se tienen que mandar
 */

import { Component, ViewChild, OnInit  } from  '@angular/core'
import {DataService} from "../data.service";

///<reference path="go.d.ts"/>
declare let go:any;

@Component({
  //moduleId: module.id,
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css']
})
export class SimuladorComponent implements OnInit {

  @ViewChild('myDiagramDiv2') div : any;

  diagrama : any;
  mensaje : string;
  temaTutorial : string;
  dataLinkSelected : any;

  constructor(private dataService : DataService) {
  }

  guardar(){
      this.dataService.list()
          .subscribe(response => {
              let diagramas = response.json();
              sessionStorage.setItem("diagrama",diagramas[0]['model']);
          });
  }

  elementoSeleccionado(key : string){

    this.temaTutorial = "Prueba de contenido de mensaje";

    for(let node of this.diagrama.model.nodeDataArray)
      this.diagrama.model.setDataProperty(node, "highlight", false);

    let data = this.diagrama.model.findNodeDataForKey(key);
    this.diagrama.model.setDataProperty(data, "highlight", true);

  }

  agregarNodo(tipo : string){

    let nombre : string = '';
    let imagen : string = '';
    switch (tipo){
      case 'repetidor':
        nombre = 'Repetidor';
        imagen = "../assets/img/repetidor.png";
        break;
      case 'emisor':
        nombre = 'Emisor de luz';
        imagen = "../assets/img/emisor.png";
        break;
      case 'receptor':
        nombre = 'Receptor de luz';
        imagen = "../assets/img/receptor.png";
        break;
    }

    this.diagrama.model.addNodeData({
      key: + new Date(),
      name: nombre,
      category: tipo,
      source: imagen
    });
  }

    eliminarLinkSeleccionado(){
        this.diagrama.model.removeLinkData(this.dataLinkSelected);
    }

    actualizarLink(){
        this.diagrama.model.setDataProperty(this.dataLinkSelected, "stroke", "red");
    }

  iniciar(){
    // create a make type from go namespace and assign it to MAKE
    const MAKE = go.GraphObject.make;

    // get the div in the HTML file
    const diagramDiv = this.div.nativeElement;

    //let layoutDiagram = MAKE(go.TreeLayout,{ angle: 90, layerSpacing: 35 });

    let configuracionInicial = {
      initialContentAlignment: go.Spot.Center, // center Diagram contents
      "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
      layout: MAKE(go.LayeredDigraphLayout, { columnSpacing: 10 })
    };

    // instatiate MAKE with Diagram type and the diagramDiv
    this.diagrama = MAKE(go.Diagram, diagramDiv,configuracionInicial);

    let repetidorTemplate = MAKE(go.Node, "Vertical",
        MAKE(go.Panel, "Auto",
            MAKE(go.Shape,
                {
                  figure: "RoundedRectangle",
                  isPanelMain : true,
                  fill : "transparent",
                  stroke : "transparent"
                }
            ),
            MAKE(go.Panel, "Table",
                MAKE(go.Shape, "Rectangle",
                    { width: 10, height: 10, fill: "#5d5d5d",stroke: null,
                      portId: "Entrada",
                      fromSpot: go.Spot.Left,
                      toLinkable: true,
                      toMaxLinks: 1,
                      row : 0,
                      column : 0
                    }),
                MAKE(go.Panel, "Auto",
                    {
                      row : 0,
                      column : 1
                    },
                    MAKE(go.Shape,
                        {
                          figure: "RoundedRectangle",
                          strokeWidth: 3,
                          isPanelMain : true,
                          fill : 'white'
                        },
                        new go.Binding("fill", "highlight", function(v) { return v ? "silver" : 'white'; })
                    ),
                    MAKE(go.Panel, "Vertical",
                        MAKE(go.Picture,
                            { width: 50, height: 50},
                            new go.Binding("source")),
                        MAKE(go.TextBlock, {margin: 5},
                            new go.Binding("text", "name"))
                    )
                ),
                MAKE(go.Shape, "Rectangle",
                    { width: 10, height: 10, fill: "#5d5d5d",stroke: null,
                      portId: "Salida",
                      toSpot: go.Spot.Right,
                      row: 0,
                      column: 2,
                      fromLinkable: true,
                      toMaxLinks: 1
                    })
            )
        )
    );

    let emisorTemplate = MAKE(go.Node, "Vertical",
        MAKE(go.Panel, "Auto",
            MAKE(go.Shape,
                {
                  figure: "RoundedRectangle",
                  isPanelMain : true,
                  fill : "transparent",
                  stroke : "transparent"
                }
            ),
            MAKE(go.Panel, "Table",
                MAKE(go.Panel, "Auto",
                    {
                      row : 0,
                      column : 0
                    },
                    MAKE(go.Shape,
                        {
                          figure: "RoundedRectangle",
                          strokeWidth: 3,
                          isPanelMain : true,
                          fill : 'white'
                        },
                        new go.Binding("fill", "highlight", function(v) { return v ? "silver" : 'white'; })
                    ),
                    MAKE(go.Panel, "Vertical",
                        MAKE(go.Picture,
                            { width: 50, height: 50},
                            new go.Binding("source")),
                        MAKE(go.TextBlock, {margin: 5},
                            new go.Binding("text", "name"))
                    )
                ),
                MAKE(go.Shape, "Rectangle",
                    { width: 10, height: 10, fill: "#5d5d5d",stroke: null,
                      portId: "Salida",
                      toSpot: go.Spot.Right,
                      row: 0,
                      column: 1,
                      fromLinkable: true,
                      toMaxLinks: 1
                    })
            )
        )
    );

    let receptorTemplate = MAKE(go.Node, "Vertical",
        MAKE(go.Panel, "Auto",
            MAKE(go.Shape,
                {
                  figure: "RoundedRectangle",
                  isPanelMain : true,
                  fill : "transparent",
                  stroke : "transparent"
                }
            ),
            MAKE(go.Panel, "Table",
                MAKE(go.Shape, "Rectangle",
                    { width: 10, height: 10, fill: "#5d5d5d",stroke: null,
                      portId: "Entrada",
                      fromSpot: go.Spot.Left,
                      toLinkable: true,
                      toMaxLinks: 1,
                      row : 0,
                      column : 0
                    }),
                MAKE(go.Panel, "Auto",
                    {
                      row : 0,
                      column : 1
                    },
                    MAKE(go.Shape,
                        {
                          figure: "RoundedRectangle",
                          strokeWidth: 3,
                          isPanelMain : true,
                          fill : 'white'
                        },
                        new go.Binding("fill", "highlight", function(v) { return v ? "silver" : 'white'; })
                    ),
                    MAKE(go.Panel, "Vertical",
                        MAKE(go.Picture,
                            { width: 50, height: 50},
                            new go.Binding("source")),
                        MAKE(go.TextBlock, {margin: 5},
                            new go.Binding("text", "name"))
                    )
                )
            )
        )
    );

    // the template we defined earlier
    this.diagrama.nodeTemplateMap.add("repetidor",repetidorTemplate);
    this.diagrama.nodeTemplateMap.add("emisor",emisorTemplate);
    this.diagrama.nodeTemplateMap.add("receptor",receptorTemplate);

    // define a Link template that routes orthogonally, with no arrowhead
    this.diagrama.linkTemplate =
        MAKE(go.Link,
            {
              routing: go.Link.AvoidsNodes,
              curve: go.Link.JumpGap,
              reshapable: true,
              resegmentable: true,
              corner: 5,
              cursor: "pointer",
              click: function(e, obj) {
                //window.open("https://en.wikipedia.org/w/index.php?search=" + encodeURIComponent(obj.part.data.text));
              }
            },
            MAKE(go.Shape, { strokeWidth: 3, stroke: "#555" },
                new go.Binding("stroke", "stroke")
            ),
            MAKE(go.Shape, { toArrow: "Standard" }),  // this is an arrowhead
            MAKE(go.TextBlock,
                {segmentOffset: new go.Point(-20, -40)},
                {segmentOffset: new go.Point(-20, -40)},
                new go.Binding("text", "text"))
        ); // the link shape

    this.diagrama.addModelChangedListener(function(evt) {
      if (evt.diagram)
        console.log("Cambio el diagrama");
      if (evt.object){
        console.log("Cambio un objeto",evt.propertyName,evt.oldValue,evt.newValue)
      }
    });

      this.diagrama.addDiagramListener("ObjectSingleClicked", (e)=>{
          let part = e.subject.part;
          if (part instanceof go.Link){
              part.isSelected = false;
              this.dataLinkSelected = part.data;
          }
          else
              this.elementoSeleccionado(part.data.key);
      });


    let nodeDataArray = [
          {
            key: "1",
            name: "Repetidor",
            category: "repetidor",
            source: "../assets/img/repetidor.png",
            esElementoRed : true //conector, receptor, repetidor
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

    let linkDataArray = [
        /*
      {
        from: "1",
        to: "2",
        text: "Prueba link",
        fromPort : 'Salida',
        toPort : 'Entrada',
        stroke : "red"
      }
      */
    ];

    //new go.GraphLinksModel(nodeDataArray, linkDataArray);

    let modeloGuardado = sessionStorage.getItem("diagrama");

    if(modeloGuardado)
        this.diagrama.model = go.Model.fromJson(JSON.parse(modeloGuardado));
    else
        this.diagrama.model = MAKE(go.GraphLinksModel,
            { linkFromPortIdProperty: "fromPort",  // required information:
                linkToPortIdProperty: "toPort",      // identifies data property names
                nodeDataArray: nodeDataArray,
                linkDataArray: linkDataArray});

  }
  ngOnInit() : void{
    this.mensaje = "Listo";
    this.dataService.setResource('/simulaciones');
  }

  /*
  quitarNodo(){
    this.diagrama.commandHandler.deleteSelection();
  }
  */
}