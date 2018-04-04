import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JdbPlgPaginationComponent } from './jdb-plg-pagination.component';

describe('JdbPlgPaginationComponent', () => {
  let component: JdbPlgPaginationComponent;
  let fixture: ComponentFixture<JdbPlgPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdbPlgPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdbPlgPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
