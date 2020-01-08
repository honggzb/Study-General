// import { ISession } from './../../../../../event-management/src/app/events/shared/event.model';
// import { VoteService } from './vote.service';
// import { Observable } from 'rxjs/Rx'

// describe('VoteService', () => {
//   let voteService:VoteService;
//   mockHttp;

//   beforeEach(() => {
//     mockHttp = jasmin.createSpyObj('mockHttp', ['delete', 'post']);
//     voteService = new VoteService(mockHttp);
//   });

//   describe('deleteVote', () => {
//     it('should remove the voter from voter list', () => {
//       var session = { id: 6, voters : ["joe", "john"]};
//       mockHttp.delete.and.returnValue(of(false));
//       voteService.deleteVoter(3, <ISession>session, "joe");
//       expect(session.voters.length).toBe(1);
//       expect(session.voters[0]).toBe("joe");
//     });

//     it('should call http.delete with the right URL', () => {
//       var session = { id: 6, voters : ["joe"]};
//       mockHttp.post.and.returnValue(of(false));
//       voteService.deleteVoter(3, <ISession>session, "joe");
//       expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/session/6/voter/joe', {}, jasmine.any(Object));
//     });
//   });

// });
