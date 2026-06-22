import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingMarket } from './trending-market';

describe('TrendingMarket', () => {
  let component: TrendingMarket;
  let fixture: ComponentFixture<TrendingMarket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingMarket],
    }).compileComponents();

    fixture = TestBed.createComponent(TrendingMarket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
