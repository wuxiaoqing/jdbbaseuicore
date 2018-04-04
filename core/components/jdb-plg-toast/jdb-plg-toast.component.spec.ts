import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JdbPlgToastComponent } from './jdb-plg-toast.component';

describe('JdbPlgToastComponent', () => {
  let component: JdbPlgToastComponent;
  let fixture: ComponentFixture<JdbPlgToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdbPlgToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdbPlgToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
