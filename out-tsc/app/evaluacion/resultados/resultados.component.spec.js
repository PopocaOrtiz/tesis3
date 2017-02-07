import { async, TestBed } from '@angular/core/testing';
import { ResultadosComponent } from './resultados.component';
describe('ResultadosComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ResultadosComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ResultadosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/evaluacion/resultados/resultados.component.spec.js.map