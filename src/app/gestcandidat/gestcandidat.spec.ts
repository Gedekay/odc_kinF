import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gestcandidat } from './gestcandidat';

describe('Gestcandidat', () => {
  let component: Gestcandidat;
  let fixture: ComponentFixture<Gestcandidat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gestcandidat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gestcandidat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
