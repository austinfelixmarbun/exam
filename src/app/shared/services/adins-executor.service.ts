import { ExecutorService } from '@adins/uctemplate';
import { Injectable } from '@angular/core';
import { AssetSchemeService } from 'app/shared/services/asset-scheme.service';

@Injectable({
  providedIn: 'root'
})
export class AdinsExecutorService extends ExecutorService {

  constructor(private assetScheme: AssetSchemeService) {
    super();

    this.setExecutor('assetScheme', assetScheme);
   }
}
