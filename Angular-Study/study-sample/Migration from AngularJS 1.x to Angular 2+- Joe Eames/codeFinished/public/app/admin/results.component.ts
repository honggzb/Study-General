import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'results',
  templateUrl: '/results.component.html'
})
export class ResultsComponent implements OnInit {
  // 1) add constuctor
  constructor(private route: ActivatedRoute){}

  @Input() sessionsByVoteDesc: any;

  ngOnInit() {
     // 2) catch data from router
    this.route.data.forEach( data => {
      this.sessionsByVoteDesc = data.sessions;
    })
    this.sessionsByVoteDesc.sort(function(session1, session2) {
      // reverse order
      return session2.voteCount - session1.voteCount;
    })
  }
}
