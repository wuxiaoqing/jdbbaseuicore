import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JdbPlgButtonComponent } from './jdb-plg-button.component';

describe('JdbPlgButtonComponent', () => {
  let component: JdbPlgButtonComponent;
  let fixture: ComponentFixture<JdbPlgButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdbPlgButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdbPlgButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
