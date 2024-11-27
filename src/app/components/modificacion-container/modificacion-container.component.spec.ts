import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionContainerComponent } from './modificacion-container.component';

describe('ModificacionContainerComponent', () => {
  let component: ModificacionContainerComponent;
  let fixture: ComponentFixture<ModificacionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificacionContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificacionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
