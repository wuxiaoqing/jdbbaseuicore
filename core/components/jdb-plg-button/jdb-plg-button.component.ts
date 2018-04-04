import { Component, OnInit, Input, Renderer2, HostListener, ElementRef } from '@angular/core';

export type buttonSize = 'small' | 'large' | 'default';
export type buttonType = 'primary' | 'gray' | 'danger' | 'buleline' | 'white';

@Component({
  selector: '[app-jdb-plg-button]',
  templateUrl: './jdb-plg-button.component.html',
  styleUrls: ['./jdb-plg-button.component.scss']
})

export class JdbPlgButtonComponent implements OnInit {

  _el: HTMLElement;
  nativeElement: HTMLElement;
  _prefixCls = 'jdb-plg-btn';
  size: buttonSize;            // size的值 'small' 、 'large' 、 'default'
  type: buttonType;            // type的值 'primary' 、 'gray' 、 'danger'、'buleline' 、'white'
  loading: boolean;

  @Input()
  get jdbSize() {
    return this.size;
  }
  set jdbSize(value: buttonSize) {
    if (!value) {
      value = 'default';
    }
    this.size = value;
    // this._renderer.addClass(this._el, this.size);
    this._setClassMap();
  }

  @Input()
  get jdbType() {
    return this.type;
  }
  set jdbType(value: buttonType) {
    if (!value) {
      value = 'primary';
    }
    this.type = value;
    // this._renderer.addClass(this._el, this.type);
    this._setClassMap();
  }

  @Input()
  get jdbLoading() {
    return this.loading;
  }

  set jdbLoading(value: boolean | string) {
    value = value === '' || (value && value !== 'false');
    this.loading = value;
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {

    this._el = this._elementRef.nativeElement;

    this.nativeElement = this._elementRef.nativeElement;
    this._renderer.addClass(this._el, this._prefixCls);
  }
  _setClassMap() {
    this._renderer.removeClass(this._el, 'undefined');
    this._renderer.addClass(this._el, this.size);
    this._renderer.addClass(this._el, this.type);
  }

  ngOnInit() {
  }

}
