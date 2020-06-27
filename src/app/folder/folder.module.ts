import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { HomePage } from './home.page';
import { QRCodeModule } from 'angularx-qrcode';
 
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    FolderPageRoutingModule,
  ],
  declarations: [HomePage]
})
export class FolderPageModule {}
