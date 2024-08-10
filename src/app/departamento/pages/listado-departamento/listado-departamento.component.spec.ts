import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDepartamentoComponent } from './listado-departamento.component';

describe('ListadoDepartamentoComponent', () => {
  let component: ListadoDepartamentoComponent;
  let fixture: ComponentFixture<ListadoDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoDepartamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
