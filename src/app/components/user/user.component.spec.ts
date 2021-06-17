import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EventBrokerService } from 'src/app/services/event-broker.service';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  const formBuilder: FormBuilder = new FormBuilder();



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [EventBrokerService, { provide: FormBuilder, useValue: formBuilder }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.userForm = formBuilder.group({
      chain: ['chain', Validators.required],
      ip: [
        '',
        Validators.required
      ],
      action: ['action', Validators.required]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect form is invalid', () => {
    fixture.nativeElement.querySelector('button').click();
    expect(component.userForm.valid).toBe(false);
  })

});
