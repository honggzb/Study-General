import { CollapsibleCardComponent } from './../../common/collapsible-card.component';

import { By } from '@angular/platform-browser';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { VoteService } from './vote.service';
import { SessionListComponent } from './session-list.component';
import { ISession } from '../shared/event.model';
import { componentFactoryName } from '@angular/compiler';
import { UpvoteComponent } from './upvote.component';
import { DurationPipe } from '../shared/duration.pipe';


describe('SessionListComponent', () => {
  let fixture: ComponentFixture<SessionListComponent>,
      component: SessionListComponent,
      element: HTMLElement,
      debugEl: DebugElement;

  beforeEach(async(() => {
    let mockAuthService = {
      isAuhtenticated: () => true,
      currentUser: { username: 'Joe'}
    };
    let mockVoteService = {
      userHasVoted: () => true
    };
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SessionListComponent,
        //UpvoteComponent,
        DurationPipe,
        //CollapsibleCardComponent
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: VoteService, useValue: mockVoteService }
      ],
      schemas: [ NO_ERRORS_SCHEMA]   //careful using
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  });

  describe('initial Display', () => {
    it('should have the correct session title', () => {
      component.sessions = <ISession[]>[
        {id: 3, name: 'session 1', presenter: 'Joe', duration: 1, level:'intermediate', abstract: 'abstract', voters: ['john','bob']}
      ];
      component.sortBy = 'name';
      component.filterBy = 'all';

      component.ngOnChanges();
      fixture.detectChanges();

     //expect(element.querySelector('[card-title]').textContent).toContain('session 1');
     expect(debugEl.query(By.css('[card-title]')).nativeElement.textContent).toContain('session 1');
    });

  });

});
