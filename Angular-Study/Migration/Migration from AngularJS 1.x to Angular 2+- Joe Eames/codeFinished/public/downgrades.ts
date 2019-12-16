import { downgradeInjectable, downgradeComponent } from '@angular/upgrade/static';

import { Sessions } from './app/sessions/sessions.service';
import { UnreviewedTalkComponent } from './app/home/unreviewedTalk.component';
import { ProfileComponent } from './app/profile/profile.component';
import { DetailPanelComponent } from './app/common/detailPanel.component';
import { ResultsComponent } from './app/admin/results.component';
import { SessionDetailWithVotesComponent } from './app/sessions/sessionDetailWithVotes.component';
import { LoginComponent } from './app/security/login.component';
import {NameParser} from './app/admin/nameParser.service';
import { CurrentIdentity } from './app/security/currentIdentity.service';

declare var angular: angular.IAngularStatic;

  // downgrades
export function downgradeItems(){
    angular.module('app')
         .factory('nameParser', downgradeInjectable(NameParser))
         .factory('sessions', downgradeInjectable(Sessions))
         .factory('currentIdentity', downgradeInjectable(CurrentIdentity))
         .directive('unreviewedTalk', downgradeComponent({
            component: UnreviewedTalkComponent
          }))
          .directive('profile', downgradeComponent({
            component: ProfileComponent
          }))
          .directive('detailPanel', downgradeComponent({
            component: DetailPanelComponent
          }))
          .directive('results', downgradeComponent({
            component: ResultsComponent
          }))
          .directive('sessionDetailWithVotes', downgradeComponent({
            component: SessionDetailWithVotesComponent
          }))
          .directive('login', downgradeComponent({
            component: LoginComponent
          }));
}