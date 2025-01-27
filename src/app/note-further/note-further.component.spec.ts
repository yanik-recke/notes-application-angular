import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteFurtherComponent } from './note-further.component';

describe('NoteFurtherComponent', () => {
  let component: NoteFurtherComponent;
  let fixture: ComponentFixture<NoteFurtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteFurtherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteFurtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
