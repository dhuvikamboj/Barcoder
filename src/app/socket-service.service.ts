import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {


  constructor(private socket: Socket) { }
 
  sendMessage(type:string,msg: string){
      this.socket.emit(type, msg);
  }
   getMessage(type:string) {
      return this.socket
          .fromEvent(type)
          .pipe(map( (data:any) => data ));
  }
}
