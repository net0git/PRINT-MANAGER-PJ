import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetCuentaComponent } from './reset-cuenta.component';

describe('ResetCuentaComponent', () => {
  let component: ResetCuentaComponent;
  let fixture: ComponentFixture<ResetCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetCuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
