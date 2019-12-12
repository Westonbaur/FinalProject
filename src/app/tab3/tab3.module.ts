import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NotesServiceService } from '../notes-service.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page],

  providers: [
    StatusBar,
    SplashScreen,
    NotesServiceService,
    SocialSharing
  ],
})
export class Tab3PageModule {}
