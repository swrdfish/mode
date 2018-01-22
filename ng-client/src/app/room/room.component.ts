import { RoomService } from './../services/room.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  text: String;
  constructor(private roomService: RoomService) { }

  ngOnInit() {
    //this.roomService.init(this.onMessage);
  }

  setMessage(value) {
    this.text = value;
  }

  send() {
    console.log(this.text);
    //this.roomService.sendMessage(this.text);    
    
  }

  onMessage(value) {
    //console.log(value);
  }

}
