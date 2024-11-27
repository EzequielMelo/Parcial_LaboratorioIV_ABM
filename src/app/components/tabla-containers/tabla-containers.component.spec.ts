import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaContainersComponent } from './tabla-containers.component';

describe('TablaContainersComponent', () => {
  let component: TablaContainersComponent;
  let fixture: ComponentFixture<TablaContainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaContainersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
