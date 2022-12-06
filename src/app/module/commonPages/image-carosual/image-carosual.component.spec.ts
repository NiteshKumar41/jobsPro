import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCarosualComponent } from './image-carosual.component';

describe('ImageCarosualComponent', () => {
  let component: ImageCarosualComponent;
  let fixture: ComponentFixture<ImageCarosualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCarosualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCarosualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
