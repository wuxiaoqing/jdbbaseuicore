import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  ViewChild,
  Output,
  Input,
  SimpleChanges,
  OnDestroy,
  Inject,
  ElementRef,
  HostListener,
  ViewEncapsulation,
  TemplateRef,
  EventEmitter,
  ViewContainerRef,
  Type,
  ComponentFactory,
  ComponentFactoryResolver
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-jdb-plg-dialog',
  templateUrl: './jdb-plg-dialog.component.html',
  styleUrls: ['./jdb-plg-dialog.component.scss'],
  animations: [
    trigger('optionsState', [
      state('showM', style({
        transform: 'translate(-50%, -50%)',
        opacity: '1',
        // display: 'block',
      })),
      state('hideM', style({
        transform: 'translate(-50%, -80%)',
        opacity: '0',
        // display: 'none',
      })),
      transition('showM <=> hideM', animate('200ms ease-out'))
    ])]
})
export class JdbPlgDialogComponent implements OnInit, AfterViewInit, OnChanges {
  _customClass = '';
  _maskClass = '';
  _bodyStyleMap;
  modalId: number;
  _visible = false;
  _title = '';
  _closeable = true;
  _titleTpl: TemplateRef<void>;
  _content: string | Type<any>;
  _contentTpl: TemplateRef<void>;
  _animationStatus = '11';
  _bodyClass: string;
  _width = '400px';
  _footerHide = false;
  _isConfirm = false;
  _okText = '';
  _cancelText = '';
  _RogerText = '';
  _state = 'hideM';
  @ViewChild('modal_content') contentEl: ElementRef;
  @ViewChild('modal_component', { read: ViewContainerRef }) bodyEl: ViewContainerRef;
  @Output() MvisibileChange: EventEmitter<boolean> = new EventEmitter();
  @Output() MOnOk: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() MOnCancel: EventEmitter<MouseEvent | KeyboardEvent> = new EventEmitter();
  // 弹框显隐
  @Input()
  set Mvisible(value: boolean) {
    const visible = this.toBoolean(value);
    if (this._visible === visible) {
      return;
    }

    this._visible = visible;
    this.MvisibileChange.emit(this._visible);
  }
  get Mvisible(): boolean {
    return this._visible;
  }
  // 隐藏footer
  @Input()
  set MfooterHiden(value: boolean) {
    const visible = this.toBoolean(value);
    if (this._visible === visible) {
      return;
    }
    this._footerHide = visible;
  }
  get MfooterHiden(): boolean {
    return this._footerHide;
  }
  // 标题
  @Input()
  set Mtitle(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this._titleTpl = value;
    } else {
      this._title = value;
    }
  }
  @Input()
  set Mcontent(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this._contentTpl = value;
    } else {
      this._content = value;
    }
    //  else if (this.isComponent(this.Mcontent)) {
    //   this.createDynamicComponent(this.Mcontent as Type<any>);
    // }
  }

  // 自定义宽度
  @Input()
  set Mwidth(value: string | number) {
    this._width = typeof value === 'number' ? value + 'px' : value;
  }

  // 定位modal位置和样式
  setStyle() {
    const el = this.contentEl.nativeElement;
    this._bodyStyleMap = {
      ...{ width: this._width }
    };
    // const transformOrigin = origh

  }

  // private isComponent(value: {}): boolean {
  //   return value instanceof Type;
  // }

  @HostListener('keydown.esc', ['$event'])
  onEsc(e: KeyboardEvent): void {
    // console.log('退出了');
    this.clickCancel(e);
  }

  // 自定义样式
  @Input()
  set Mclass(value: string) {
    this._customClass = value;
  }

  @Input()
  set MOkText(value: string) {
    this._okText = value;
  }
  @Input()
  set McancelText(value: string) {
    this._cancelText = value;
  }
  @Input()
  set MRogerText(value: string) {
    this._isConfirm = true;
    this._RogerText = value;
  }

  constructor(private resolver: ComponentFactoryResolver) { }
  ngOnInit() {
    this.setStyle();
    // if (this.isComponent(this.Mcontent)) {
    //   this.createDynamicComponent(this.Mcontent as Type<any>);
    // }
  }
  createDynamicComponent(component: Type<any>) {
    const factory = this.resolver.resolveComponentFactory(this._content as Type<any>);
    this.bodyEl.createComponent(factory);
    console.log('coooo');
  }
  ngAfterViewInit() {
    // if (this._state === 'showM') {
    //   this.contentEl.nativeElement.parentNode.focus();
    // }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this._visible) {
      this._state = 'showM';
      setTimeout(() => {
        this.contentEl.nativeElement.parentNode.focus();
      }, 200);
    } else {
      this._state = 'hideM';
    }
  }
  clickCancel(e): void {
    this._visible = false;
    this._state = 'hideM';
    this.MOnCancel.emit(e);
    // console.log('点击取消');
  }
  clickOk(e): void {
    if (this.MOnOk) {
      this.MOnOk.emit(e);
    } else {
      this._visible = false;
      this._state = 'hideM';
    }
    // console.log('点击确认');
  }
  closeModal(e): void {
    if ((e.target as HTMLElement).getAttribute('role') === 'dialog') {
      this.clickCancel(e);
      this._state = 'hideM';
    }
  }
  toBoolean(value: boolean | string): boolean {
    return value === '' || (value && value !== false);
  }
}
