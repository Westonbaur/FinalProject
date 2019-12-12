import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Vibration } from '@ionic-native/vibration/ngx';



@Injectable()
export class NotesServiceService {
  
  notes: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>

  baseURL = "http://127.0.0.1:8080";


  constructor(public http: HttpClient, private vibration: Vibration) { 
    console.log('Hello Reminder Provider')

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();

  }

 getnotes(): Observable<object []> {
    return this.http.get(this.baseURL + '/api/reminder').pipe(
      map(this.extractData.bind(this),
      catchError(this.handleError)
      ));
  }


private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  
private handleError(error: Response | any) {
  let errMsg = String;
  if (error instanceof Response) {
    const err = error || '';
    //errMsg = '${error.status} - ${error.statusText || ''} ${err}';
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}

  async removenote(id) {
    console.log("### Remove note - id = ", id);
    this.http.delete(this.baseURL + "api/reminder/" + id).subscribe(res => {
      this.notes = res;
      this.dataChangeSubject.next(true);
      this.vibration.vibrate([2000,1000,2000]);
    });
  }

  addnote(note) {
   this.http.post(this.baseURL + "/api/reminder", note).subscribe(res => {
     this.notes = res;
     this.dataChangeSubject.next(true);
     this.vibration.vibrate([2000,1000,2000]);
   });
  }

  editnote(note, index){
    console.log("Editing note = ", note);
    this.http.put(this.baseURL + "api/reminder/" + note.id, note).subscribe(res => {
      this.notes = res;
      this.dataChangeSubject.next(true);
    });
  }

}
