import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EsportsNewsPage } from './esports-news';

@NgModule({
  declarations: [
    EsportsNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(EsportsNewsPage),
  ],
})
export class EsportsNewsPageModule {}
