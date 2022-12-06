import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  valueArray = [99, 98, 46, 42, 36, 35, 34, 33, 30, 29, 27, 26, 24, 23, 17, 14]
  isInComponentShow = new BehaviorSubject<number>(0);
  isInComponentShowObservable: Observable<number>

  constructor() {
    this.isInComponentShowObservable = this.isInComponentShow.asObservable()
  }

  ngOnInit() {

  }

  showComponent(item: number) {
    this.isInComponentShow.next(item)
  }

}
