import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FileManagerService } from './services/file-manager-service';
import { FileManagerConfig } from './models/file-manager-config';
import { FileManagerComponent } from './components/file-manager.component';
import { ItemComponent } from './components/item/item.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';



@NgModule({
  declarations: [FileManagerComponent,ItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  providers:[FileManagerService]})
export class FileManagerModule { 
  static Config(config: FileManagerConfig): ModuleWithProviders {
    return {
      ngModule: FileManagerModule,
      providers: [{
        provide: FileManagerConfig, useValue: config
      }]
    }
  }
}
