import { Component, OnInit, AfterViewInit,Input } from '@angular/core';

@Component({
  selector: 'app-jdb-plg-toast',
  templateUrl: './jdb-plg-toast.component.html',
  styleUrls: ['./jdb-plg-toast.component.scss']
})
export class JdbPlgToastComponent implements OnInit {

  @Input() msg:string = "";
  constructor() {
   }

  ngOnInit() {
  }
}



