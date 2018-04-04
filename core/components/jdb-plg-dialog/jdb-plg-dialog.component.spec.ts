import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JdbPlgDialogComponent } from './jdb-plg-dialog.component';

describe('JdbPlgDialogComponent', () => {
  let component: JdbPlgDialogComponent;
  let fixture: ComponentFixture<JdbPlgDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdbPlgDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdbPlgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
