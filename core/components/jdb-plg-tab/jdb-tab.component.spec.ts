import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JdbTabComponent } from './jdb-tab.component';

describe('JdbTabComponent', () => {
  let component: JdbTabComponent;
  let fixture: ComponentFixture<JdbTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdbTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdbTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
