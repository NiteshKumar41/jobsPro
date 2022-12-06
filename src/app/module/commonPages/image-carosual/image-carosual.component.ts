import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-image-carosual',
  templateUrl: './image-carosual.component.html',
  styleUrls: ['./image-carosual.component.scss'],
})
export class ImageCarosualComponent implements OnInit, OnChanges {
  // url = 'http://159.65.9.6:8080/jh/public/images/services/carousel/';
  imageObject = [];
  @Input() imageData;
  constructor(private userService: UserService) {}
  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'imageData': {
            if (changes['imageData'].currentValue.length > 0) {
              this.imageObject = this.imageData;
            }
          }
        }
      }
    }
  }

  ngOnInit(): void {}
  single(event) {
    console.log(this.imageObject[event]);
  }

}
