import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFamiliaComponent } from './modal-familia.component';

describe('ModalFamiliaComponent', () => {
  let component: ModalFamiliaComponent;
  let fixture: ComponentFixture<ModalFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFamiliaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
