import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaContainerComponent } from './baja-container.component';

describe('BajaContainerComponent', () => {
  let component: BajaContainerComponent;
  let fixture: ComponentFixture<BajaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BajaContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
