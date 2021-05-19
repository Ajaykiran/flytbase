import { Component, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface boxId {
  id: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isKeyboardEnabled: boolean = true;
  boxes: boxId[] = [];
  activeBox: number = -1;

  onCreateBox(box: boxId) {
    if (box) {
      this.boxes.push(box);
    }
    // this.sample = box;
    // console.log("this.sample ==>>  " + this.sample);
  }

  onBoxSelect(box: boxId) {
    this.activeBox = box.id
  }

  onDelete(index: number) {
    this.boxes.splice(index, 1);
  }

  onKeyboardControlChange(e: Event) {
    const isChecked = (e.target as HTMLInputElement).checked
    this.isKeyboardEnabled = isChecked;
  }


}


