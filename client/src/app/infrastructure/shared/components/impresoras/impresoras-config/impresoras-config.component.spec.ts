import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpresorasConfigComponent } from './impresoras-config.component';

describe('ImpresorasConfigComponent', () => {
  let component: ImpresorasConfigComponent;
  let fixture: ComponentFixture<ImpresorasConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpresorasConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpresorasConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
