import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingMarketComponent } from './trending-market.component';

describe('TrendingMarketComponent', () => {
  let component: TrendingMarketComponent;
  let fixture: ComponentFixture<TrendingMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingMarketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrendingMarketComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
