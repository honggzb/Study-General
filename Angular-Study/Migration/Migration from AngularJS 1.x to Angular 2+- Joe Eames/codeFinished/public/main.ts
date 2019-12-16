
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule } from '@angular/upgrade/static';
import './app/rxjsOpertions';
import { AppModule } from "./app/app.module";

import { downgradeItems } from './downgrades';
import { setUpLocationSync} from '@angular/router/upgrade';

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  // downgrades, load when need
  downgradeItems();

  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.documentElement, ['app']);
    //must after bootstrap
  setUpLocationSync(upgrade);
  console.log('hybrid app bootstrapped');
})