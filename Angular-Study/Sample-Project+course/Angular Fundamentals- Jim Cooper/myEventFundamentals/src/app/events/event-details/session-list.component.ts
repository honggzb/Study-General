import { VoteService } from './vote.service';
import { AuthService } from './../../user/auth.service';

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ISession } from './../shared/event.model';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styles: []
})
export class SessionListComponent implements OnChanges {

  @Input() sessions:ISession[]
  @Input() filterBy: string
  @Input() sortBy: string
  visibleSessions: ISession[] = []

  constructor(private auth: AuthService, private voteService: VoteService) { }

  ngOnChanges() {
    if(this.sessions){
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  toggleVoted(session:ISession){
    if(this.userHasVoted(session)) {
      this.voteService.deleteVoter(session, this.auth.currentUser.userName);
    }else{
      this.voteService.addVoter(session, this.auth.currentUser.userName);
    }
    if(this.sortBy === 'votes'){
      this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  userHasVoted(session: ISession){
    return this.voteService.userHasVoted(session, this.auth.currentUser.userName);
  }

  filterSessions(filter){
    if(filter === 'all'){
      //slice() will create a new array, splice() will modify original array directly
      //clone by slice method to make visibleSession unique
      this.visibleSessions = this.sessions.slice(0);
    }else{
      this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }

}

function sortByNameAsc(s1: ISession, s2: ISession){
  if(s1.name > s2.name) return 1
  else if(s1.name === s2.name) return 0
  else return -1
}

function sortByVotesDesc(s1: ISession, s2: ISession){
  return s2.voters.length - s1.voters.length;
}
