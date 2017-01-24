export class ISeccion {
  id: number;
  titulo: string;
  contenido : string;
  seccion_padre?: number;
  subSecciones?:ISeccion[]
}
