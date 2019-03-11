import { Injectable } from '@angular/core';
import { ISession } from '../shared/event.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  deleteVoter(session: ISession,voterName: string){
    session.voters = session.voters.filter(voter => voter !== voterName);
  }

  addVoter(session: ISession,voterName: string){
    session.voters.push(voterName);
    // let options = { headers: new HttpHeaders({ 'content-Type':'application/json'})};
    // const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    // this.http.post(url, {}, options)
    //          .pipe(catchError(this.handleError('addVoter')))
    //          .subscribe();
  }

  userHasVoted(session: ISession,voterName: string){
    return session.voters.some(voter => voter !== voterName);
  }
}
