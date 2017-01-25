import { async, TestBed } from '@angular/core/testing';
import { SimuladorComponent } from './simulador.component';
describe('SimuladorComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SimuladorComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SimuladorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/Users/user/Documents/GitHub/fibras/src/app/simulador/simulador.component.spec.js.map