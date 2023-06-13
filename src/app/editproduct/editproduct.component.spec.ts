import { ComponentFixture, TestBed } from '@angular/core/testing';
import { editproductComponent } from './editproduct.component';

describe('EditproductComponent', () => {
  let component: editproductComponent;
  let fixture: ComponentFixture<editproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ editproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(editproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
