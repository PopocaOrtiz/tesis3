There are three basic kinds of events that GoJS generates: DiagramEvents, InputEvents, and ChangedEvents
They are multicast events, so you can call Model.addChangedListener and Diagram.addChangedListener
    ChangedEvent.diagram.
    ChangedEvent.model
El diagrama esta suscrito a cambios en el modelo
El plugin de desacer esta suscrito a cambios en el modelo y el diagrama
Model.setDataProperty lanza un evento de cambio para los escuchas
Caundo se cambia una propiedad se incluyen los 
     ChangedEvent.object that was modified
     ChangedEvent.propertyName
     ChangedEvent.oldValue
     ChangedEvent.newValue
Si se cambio la estructura del modelo se activa el ChangedEvent.modelChange con diferentes valores
    cuando se agregar quitan nodos/links o cuando se modifican sus propiedades
    
dependiendo del tipo de cambio algunos parametros vendran setados y otros no

Quitar nodo/link llama a
    "nodeDataArray", due to a call to Model.addNodeData or Model.removeNodeData
    "linkDataArray", due to a call to GraphLinksModel.addLinkData or GraphLinksModel.removeLinkData
    "linkLabelKeys", due to a call to GraphLinksModel.addLabelKeyForLinkData or GraphLinksModel.removeLabelKeyForLinkData

Los eventos de cambio pueden estar dentro de una transaccion y esta puede tener estados

Puertos
    Para decir que un elemento es un puerto setear GraphObject.portId 