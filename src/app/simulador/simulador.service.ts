/**
 * @deprecated
 */

import { Injectable } from '@angular/core';
import {DataService} from "../data.service";

@Injectable()
export class SimuladorService{

    constructor() {
    }

    list() {
    }

    save(stringModel : string){

        let data = {
            model : stringModel,
            nombre : "nombre",
            fecha : "ayer",
            usuario : "prueba"
        };
    }
}
