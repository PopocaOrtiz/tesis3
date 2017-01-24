function iniciar() {
}

function save() {
  myDiagram.model.toJson();
}
function load() {
  myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
}
