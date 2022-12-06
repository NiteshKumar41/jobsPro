import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { observable, Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // public socket: Socket;
  public  wssUrl: string = "ws://159.65.9.6:8080/jh/ws/websocket";
  public apiUrl=environment.apiUrl
  public  wsUrl = '159.65.9.6:8080/jh/ws/websocket';
  public url = environment.apiUrl+ `jh/ws/websocket` ;
  socket: any;
  client: any;
  documentClickedTarget: Subject<HTMLElement> = new Subject<HTMLElement>()

  WHEN_CONNECTED_CALLBACK_WAIT_INTERVAL: any = 1000;
  componentOneFn!: Function;
  constructor(private http:HttpClient) {
  }
 
  public chatStart(data):Observable<any>{
    return this.http.put(this.apiUrl + `jh/api/chat/channel`,data)
  }
  public getAllChannels(userId):Observable<any>{
  return this.http.get(this.apiUrl + `jh/api/chat/channelForUser/SERVICES/${userId}?page=0`)
  }
  public getChatByChannel(id,page):Observable<any>{
    return this.http.get(this.apiUrl + `jh/api/chat/channel/${id}?page=${page}`)
  }
  public get() {
    return this.socket;
  }
  public connect() {
    this.socket = new RxStomp();
    this.socket.configure({
      brokerURL: this.wssUrl
    });
    this.socket.activate();
  };
  public disconnect() {
    //this.socket.disconnect();
    this.socket = null;
  };

  public onOpen() {
  };

  public onClose() {
    console.log('You have disconnected, hit "OK" to reload.');
  };

  public isConnected() {
    return (this.socket && this.socket.connected);
  };

  public whenConnected(_do: any) {
    setTimeout(
      () => {
        if (this.isConnected()) {
          if (_do !== null) { _do(); }
          return;
        } else {
          this.whenConnected(_do);
        }

      }, this.WHEN_CONNECTED_CALLBACK_WAIT_INTERVAL);
  };

  
}
