import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface boxId {
  id: number
}

@Component({
  selector: 'app-button-component',
  templateUrl: './button-component.component.html',
  styleUrls: ['./button-component.component.css']
})
export class ButtonComponentComponent implements OnInit {
  @Output() box = new EventEmitter<boxId>();
  lastNumber: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  createBox() {
    this.lastNumber++;
    this.box.emit({ id: this.lastNumber });
  }

}
