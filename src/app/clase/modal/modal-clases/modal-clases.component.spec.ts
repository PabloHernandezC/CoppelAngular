import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClasesComponent } from './modal-clases.component';

describe('ModalClasesComponent', () => {
  let component: ModalClasesComponent;
  let fixture: ComponentFixture<ModalClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalClasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
