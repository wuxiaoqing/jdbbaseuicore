import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JdbPlgTooltipComponent } from './jdb-plg-tooltip.component';

describe('JdbPlgTooltipComponent', () => {
  let component: JdbPlgTooltipComponent;
  let fixture: ComponentFixture<JdbPlgTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdbPlgTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdbPlgTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
