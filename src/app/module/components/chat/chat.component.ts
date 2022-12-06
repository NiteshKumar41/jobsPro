import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChatService } from '../../Services/chat/chat.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {
  public roomId: string
  public messageText: string
  public messageArray: { user: string, message: string }[] = [];
  public phone: string;
  public currentUser;
  public selectedUser;
  public chatChannelList;
  public storageArray: any = []
  public userList = [];
  messages: any = null;
  showMessage: boolean = false;
  channelUuid: any = '';
  chatWebSocket: any = '';
  activeChannel: any = {
    channelUuid: ''
  };
  authorImage:any=[];
  recipientImage:any=[]
  subscribedChannelList: any = [];
  loading_history: boolean = false;
  totalElements1: any = null;
  totalPages: any = [];
  totalPages1: any = [];
  pageNumber1: any = [];
  currentMessage: any = '';
  userId;
  query;
  uid: any = null;
  initChannel: any = null;
  ser: boolean = false;
  shwww: boolean = false;
  constructor(private chatService: ChatService, private route: ActivatedRoute, private userService: UserService) {
    
    this.userId = localStorage.getItem('userId')
  }

  ngOnInit(): void {
    this.chatService.connect();
    this.getAllChannel();

    this.userService.currentChatData.subscribe(res => {
      console.log(res);
    })
    this.route.queryParams.subscribe(
      params => {
        this.initChannel = params['request'];
        this.uid = params['uid'];
        this.ser = params['ser'];
      }
    );
    if (this.ser === true) {
      this.shwww = false;
    } else {
      this.shwww = true;
    }
  }

  sendMessage(): void {
    if (!this.currentMessage || this.currentMessage.trim() === '')
      return;
    this.chatWebSocket.publish({
      destination: "/app/chat/" + this.channelUuid, body: JSON.stringify({
        fromUserId: this.userId,
        toUserId: this.activeChannel.userOneId,
        contents: this.currentMessage
      })
    });
    this.currentMessage = null;
  }
  change() {
    this.userService.updateCurrentChatData({
      "userIdOne": 502,
      "userIdTwo": 488,
      "type": "SERVICES",
      "jobId": 235
    });
    // this.ngOnInit();
  }
  getAllChannel() {
    let id = localStorage.getItem('userId');
    this.chatService.getAllChannels(id).subscribe(res => {
      this.chatChannelList = res?.data.elements;
      console.log(this.chatChannelList);
    })
  }
  startChat(channelDetailsPayload: any) {
    this.messages = null;
    this.showMessage = true;
    var id = btoa(channelDetailsPayload.userTwoId);
    this.channelUuid = channelDetailsPayload.channelUuid;
    var channelUuid = channelDetailsPayload.channelUuid;
    this.chatWebSocket = this.chatService.get();
    this.activeChannel = channelDetailsPayload;
    if (this.subscribedChannelList.indexOf(channelUuid) === -1) {
      this.chatWebSocket.watch('/topic/chat/' + channelUuid).subscribe(this.onMessage, { 'id': channelUuid });
      this.subscribedChannelList.push(channelUuid);
    } else {
      console.log("channel is running already running");
    }
    this.loadMessage(channelUuid, 0);
  }
  onMessage: any = (response: any) => {
    if (this.messages == null) {
      this.messages = [JSON.parse(response.body as string)];
    } else {
      this.messages.push(JSON.parse(response.body as string));
    }
    // this.scrollToBottom();
  };
  loadMessage(channelUuid: any, page: any) {
    this.loading_history = true;
    this.chatService.getChatByChannel(channelUuid, 0).subscribe(res => {
      if (this.messages === null) {
        this.messages = res.data.elements
      } else {
        this.messages.reverse();
        this.messages = this.messages.concat(res.data.elements)
      }
      this.totalElements1 = res.data.totalElements;
      this.totalPages1 = res.data.totalPages;
      this.pageNumber1 = res.data.pageNumber;
      this.messages.reverse();
      this.loading_history = false;
    })
  }
  getNextElement(e: any) {
    console.log(e.keyCode);

    if (e.keyCode == 13) {
      if (e.shiftKey) {
        return true;
      }
      else {
        this.sendMessage();
      }
    }
    return false;
  }
}
