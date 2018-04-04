import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-show-picture',
  templateUrl: './show-picture.component.html',
  styleUrls: ['./show-picture.component.scss']
})
export class ShowPictureComponent implements OnInit {
  @Input() pictureUrl: string;
  @Output() update = new EventEmitter<{status: boolean}>();
  constructor() { }

  ngOnInit() {

  }
  closeModel(){
    this.update.emit({status: false})
  }
}
