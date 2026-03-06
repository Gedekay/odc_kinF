import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gestformation } from './gestformation';

describe('Gestformation', () => {
  let component: Gestformation;
  let fixture: ComponentFixture<Gestformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gestformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gestformation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
