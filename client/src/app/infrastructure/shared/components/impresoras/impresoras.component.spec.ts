import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpresorasComponent } from './impresoras.component';

describe('ImpresorasComponent', () => {
  let component: ImpresorasComponent;
  let fixture: ComponentFixture<ImpresorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpresorasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpresorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
