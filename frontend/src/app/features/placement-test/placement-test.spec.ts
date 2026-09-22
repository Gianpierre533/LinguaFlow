import { ComponentFixture, TestBed } from '@angular/core/testing';


import { PlacementTest } from './placement-test';

describe('PlacementTest', () => {
  let component: PlacementTest;
  let fixture: ComponentFixture<PlacementTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementTest],
    }).compileComponents();

    fixture = TestBed.createComponent(PlacementTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
