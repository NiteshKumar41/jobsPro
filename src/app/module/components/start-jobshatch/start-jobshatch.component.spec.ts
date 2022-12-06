import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartJobshatchComponent } from './start-jobshatch.component';

describe('StartJobshatchComponent', () => {
  let component: StartJobshatchComponent;
  let fixture: ComponentFixture<StartJobshatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartJobshatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartJobshatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
