
import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import './app/rxjsOpertions';

import { AppModule } from "./app/app.module";
import { downgradeItems } from './downgrades';
import { setUpLocationSync} from '@angular/router/upgrade';
// this file did not exist in the disk, app.module.ngfactory is created dynamically during the aot build
import { AppModuleNgFactory } from './app/app.module.ngfactory';

//just run one time
enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory).then(platformRef => {
  // downgrades, load when need
  downgradeItems();

  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.documentElement, ['app']);
  //must after bootstrap
  setUpLocationSync(upgrade);
  console.log('hybrid app bootstrapped');
})