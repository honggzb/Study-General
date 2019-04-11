import { AdminGuard } from './security/admin.guard';
import { NgModule } from "@angular/core";
import { UpgradeModule } from "@angular/upgrade/static";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule, UrlHandlingStrategy, UrlTree } from "@angular/router";

import { AppComponent } from "./app.component";
import { UnreviewedTalkComponent } from './home/unreviewedTalk.component';
import { ProfileComponent } from './profile/profile.component';
import { TalkDuration } from './common/talkDuration.pipe';

import { NameParser } from './admin/nameParser.service';
import { TOASTR_TOKEN, Toastr } from './toastr/toastr.service';
import { NavComponent } from "./nav/nav.component";
import { Sessions } from './sessions/sessions.service';
import { DetailPanelComponent } from "./common/detailPanel.component";
import { ResultsComponent } from './admin/results.component';
import { SessionDetailWithVotesComponent } from './sessions/sessionDetailWithVotes.component';

import { AllSessionsResolver } from './sessions/allSessions.resolver';

let toastr:Toastr = window['toastr'];
//use angularJS service in angular
export function getLocation(i: any) { return i.get('$location') }
export function getCurrentIdentity(i: any) { return i.get('currentIdentity') }
export function getAuth(i:any) { return i.get('auth') }
export function getToastr() { return toastr; }

class Ng1Ng2UrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree): boolean {
    return url.toString().startsWith("/admin/results");
  }
  extract(url:UrlTree):UrlTree {
    return url;
  }
  merge(newUrlPart:UrlTree, rawUrl: UrlTree):UrlTree {
    return newUrlPart;
  }
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UpgradeModule,
    RouterModule.forRoot([
      {
        path: 'admin/results',
        component: ResultsComponent,
        resolve: { sessions: AllSessionsResolver },
        canActivate: [ AdminGuard]
      },
    ], { useHash: false })
  ],
  declarations: [
    AppComponent,
    UnreviewedTalkComponent,
    ProfileComponent,
    TalkDuration,
    NavComponent,
    DetailPanelComponent,
    ResultsComponent,
    SessionDetailWithVotesComponent
  ],
  providers: [
    NameParser,
    //use angularJs service in anguar
    { provide: '$location', useFactory: getLocation, deps: ['$injector']},
    { provide: 'currentIdentity', useFactory: getCurrentIdentity, deps: ['$injector']},
    { provide: 'auth', useFactory: getAuth, deps: ['$injector'] },
    { provide: TOASTR_TOKEN, useFactory: getToastr },
    { provide: UrlHandlingStrategy, useClass: Ng1Ng2UrlHandlingStrategy },
    // for error- No provider for $scope
    { provide: '$scope', useExisting: '$rootScope'},
    Sessions,
    AllSessionsResolver,
    AdminGuard
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    UnreviewedTalkComponent,
    ProfileComponent,
    DetailPanelComponent,
    ResultsComponent
  ]
})
export class AppModule {}