import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JdbPlgSelectComponent } from './jdb-plg-select.component';

describe('JdbPlgSelectComponent', () => {
  let component: JdbPlgSelectComponent;
  let fixture: ComponentFixture<JdbPlgSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdbPlgSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdbPlgSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
