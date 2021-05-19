import { Component, OnInit, Input, Renderer2, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-box-component',
  templateUrl: './box-component.component.html',
  styleUrls: ['./box-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BoxComponentComponent implements OnInit, OnDestroy {
  _keyboardEvents: boolean = false;

  @Output() onDelete: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input('id') boxId: number | undefined;
  @Input('active') active: boolean | undefined;

  @Input('enableKeyboardEvents') set keyboardEvents(val: boolean) {
    this._keyboardEvents = !!val;

    if (val) this.listenToKeyboardEvent();
    else this.removeListener();
  }

  get keyboardEvents() {
    return this._keyboardEvents
  }

  left: number = 0;
  top: number = 0;

  subs: Function | undefined;

  max = { x: 0, y: 0 }

  constructor(private renderer: Renderer2, private ref: ChangeDetectorRef, private el: ElementRef) {
  }

  ngOnInit() {
    let parent = { x: 0, y: 0 }, child = { x: 0, y: 0 };
    parent.x = (this.el.nativeElement).parentElement.clientWidth;
    parent.y = (this.el.nativeElement).parentElement.clientHeight;

    child.x = this.el.nativeElement.firstElementChild.offsetWidth;
    child.y = this.el.nativeElement.firstElementChild.offsetHeight;

    this.max.x = parent.x - child.x;
    this.max.y = parent.y - child.y;
  }

  listenToKeyboardEvent() {
    this.removeListener();
    this.subs = this.renderer.listen('document', 'keydown', e => {
      window.requestAnimationFrame(() => {
        this.onKeyPress(e);
        this.ref.detectChanges()
      })
    })
  }

  private onKeyPress(e: { code: any; }) {
    switch (e.code) {
      case "KeyW":
        this.top <= 0 ? 0 : this.top--;
        break;
      case "KeyA":
        this.left <= 0 ? 0 : this.left--;
        break;
      case "KeyS":
        this.top >= this.max.y ? this.max.y : this.top++;
        break;
      case "KeyD":
        this.left >= this.max.x ? this.max.x : this.left++;
        break;
      case "Delete":
        this.onDelete.emit(true);
        break;
    }
  }

  private removeListener() {
    if (this.subs)
      this.subs();
  }

  ngOnDestroy() {
    this.removeListener();
  }

}
