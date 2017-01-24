export interface IOpcionRespuesta{
  texto : string
}

export interface IPregunta{
  id : number,
  titulo : string,
  contenido : string
  tipo? : number
  opciones? : string[],
  inputOpciones? : string //se usa para mostrar como texto opciones, no se guarda
}
