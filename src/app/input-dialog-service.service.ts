import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NotesServiceService } from './notes-service.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';


@Injectable({
  providedIn: 'root'
})

export class InputDialogServiceService {

  constructor(public dataService: NotesServiceService, public alertController: AlertController, private datePicker: DatePicker) { }

  async showPrompt(note? , index?) {
    const alert = await this.alertController.create({
     header: note? 'Edit your note' : 'Add note',
     message: note? "Edit exsisting note": "Please Enter note",
     
     inputs: [
       {
         name: 'title',
         placeholder: 'title',
         value:note ?  note.title : null
       },
       {
         name: 'data',
         placeholder: 'date',
         value: note? note.showDatePicker() : null,
         type: 'date'
       },
       {
        name: 'content',
        placeholder: 'content',
        value: note? note.content : null
      }
     ],
     buttons: [
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Confirm Cancel');
         }
       }, 
       {
         text: 'Save',
         handler: note => {
           console.log('Confirmed Save', note)
           if (index !== undefined) {
             this.dataService.editnote(note, index);
           }
           else{
             this.dataService.addnote(note);
           }
         }
       }
     ]
   });
  await alert.present();

 }  

 showDatePicker(){
  this.datePicker.show({
    date: new Date(),
    mode: 'date',
  }).then(
    date => console.log('Date uploaded: ', date),
    error => console.log('Issue getting Date: ', error)
  );
 }


}
