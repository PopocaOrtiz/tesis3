/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SimuladorService } from './simulador.service';

describe('SimuladorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimuladorService]
    });
  });

  it('should ...', inject([SimuladorService], (service: SimuladorService) => {
    expect(service).toBeTruthy();
  }));
});
