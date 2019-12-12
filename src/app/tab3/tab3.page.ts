import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NgZone } from '@angular/core';
import { NotesServiceService } from '../notes-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

 name = "Reminders List";

  notes = [];
  errorMessage: string;


  constructor(public navCtrl: NavController, 
    public toastController: ToastController, 
    public alertController: AlertController,
    private zone: NgZone,
    public dataService: NotesServiceService,
    public InputDialogService: InputDialogServiceService,
    public socialSharing: SocialSharing,
    private vibration: Vibration
    )
    {
      dataService.dataChanged$.subscribe((dataChanged: boolean) => {
        this.loadnotes();
      });
     }

  ionViewDidLoad() {
    this.loadnotes();
  }
  
  loadnotes(){
    this.dataService.getnotes()
      .subscribe(
        notes => notes = notes,
        error => this.errorMessage = <any>error);
  }


  async removenote(note, index) {
    console.log("Removing note - ", note, index);
    const toast = await this.toastController.create({
      message: 'Removing note - ' + note.name + " ...",
      duration: 3000
    });
    toast.present();

    this.dataService.removenote(index);
  }

  addnote() {
    console.log("Attempt to add note");
    this.InputDialogService.showPrompt();
    this.vibration.vibrate([1000,2000,3000]);
  }

  async editnote(note, i) {
    console.log("Editing note - ", note, i);
    const toast = await this.toastController.create({
      message: 'Edited note - ' + note.title + " ...",
      duration: 1000
    });
    toast.present();
    this.InputDialogService.showPrompt(note, i);
  }

  refresh() {
    this.zone.run(() => {
      console.log('force update the screen');
    });
  }

  async sharenote(note, i) {
    console.log("Sharing note - ", note, i);
    const toast = await this.toastController.create({
      message: 'Sharing note - ' + note.name + " ...",
      duration: 3000
    });
    toast.present();

    let message = "Reminder note - Title: " + note.title + " - Quantity: " + note.date;
    this.socialSharing.share(message).then(() => {
        console.log("Shared")
    }).catch((error) => {
      console.error("Error sharing", error);
      this.vibration.vibrate([2000,1000,2000]);
    });

  }

}
