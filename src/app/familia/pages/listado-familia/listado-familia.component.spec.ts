import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFamiliaComponent } from './listado-familia.component';

describe('ListadoFamiliaComponent', () => {
  let component: ListadoFamiliaComponent;
  let fixture: ComponentFixture<ListadoFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoFamiliaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
