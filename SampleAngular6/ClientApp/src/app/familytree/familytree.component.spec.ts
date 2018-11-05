import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilytreeComponent } from './familytree.component';

describe('FamilytreeComponent', () => {
  let component: FamilytreeComponent;
  let fixture: ComponentFixture<FamilytreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilytreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilytreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
