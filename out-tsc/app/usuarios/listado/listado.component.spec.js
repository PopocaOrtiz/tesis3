import { async, TestBed } from '@angular/core/testing';
import { ListadoComponent } from './listado.component';
describe('ListadoComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ListadoComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ListadoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/usuarios/listado/listado.component.spec.js.map