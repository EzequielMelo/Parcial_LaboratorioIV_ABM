import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaContainerComponent } from './alta-container.component';

describe('AltaContainerComponent', () => {
  let component: AltaContainerComponent;
  let fixture: ComponentFixture<AltaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
