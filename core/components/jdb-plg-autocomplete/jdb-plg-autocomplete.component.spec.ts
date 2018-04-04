import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JdbPlgAutocompleteComponent } from './jdb-plg-autocomplete.component';

describe('JdbPlgAutocompleteComponent', () => {
  let component: JdbPlgAutocompleteComponent;
  let fixture: ComponentFixture<JdbPlgAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdbPlgAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdbPlgAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
