import {
  Component,
  ViewEncapsulation,
  Input,
  TemplateRef,
  Output,
  Renderer2,
  EventEmitter,
  AfterViewInit,
  ChangeDetectorRef,
  ContentChild,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  ConnectionPositionPair,
  ConnectedOverlayDirective
} from '../../overlay/index';
import { POSITION_MAP, DEFAULT_4_POSITIONS } from '../../overlay/overlay-position-map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { JdbPlgTooltipDirective } from '../../directive/jdb-plg-tooltip.directive';

@Component({
  selector: 'app-jdb-plg-tooltip',
  templateUrl: './jdb-plg-tooltip.component.html',
  styleUrls: ['./jdb-plg-tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JdbPlgTooltipComponent implements AfterViewInit {
  demo = true;
  _jdbTitle: string;  // 浮层文案内容
  _jdbVisible: boolean; // 浮层是否显示
  _placement = 'top';
  _positions: ConnectionPositionPair[] = [...DEFAULT_4_POSITIONS];
  _classMap = {};
  _trigger = 'hover';
  // 自定义类名
  @Input() jdbOverlayClassName = '';

  // 自定义浮层背景，若为dark,则表示未深色，默认为白色
  @Input() jdbDialog = '';

  // 浮层内文案
  @Input()
  set jdbTitle(value: string) {
    this._jdbTitle = value;
  }

  get jdbTitle(): string {
    return this._jdbTitle;
  }

  // 浮层是否显示
  @Input()
  set jdbVisible(value) {
    const visible = this.toBoolean(value);
    // 若是传入值和当前值不一样，则取下一个值
    if (this.visibleSource.value !== visible) {
      this.visibleSource.next(visible);
    }
  };

  get jdbVisible() {
    return this.visibleSource.value;
  }
  
  // 浮层位置
  @Input()
  get jdbPlacement() {
    return this._placement;
  }

  set jdbPlacement(value) {
    if (value !== this._placement) {
      this._placement = value;
      this._positions.unshift(POSITION_MAP[this.jdbPlacement] as ConnectionPositionPair);
    }
  }
  
  // 触发行为
  @Input()
  set jdbTrigger(value) {
    this._trigger = value;
  } 

  get jdbTrigger() {
    return this._trigger;
  }

  visibleSource = new BehaviorSubject<boolean>(false);  // 定义一个BehaviorSubject对象，传递最新的数据
  visible$ = this.visibleSource.asObservable();

  @ContentChild('jdbTemplate') jdbTemplate: TemplateRef<any>;
  @ContentChild(JdbPlgTooltipDirective) jdbOrigin;
  @ViewChild('overlay') overlay: ConnectedOverlayDirective;

  constructor(private _renderer: Renderer2, private _cdr: ChangeDetectorRef) { }

  show(): void {
    this.jdbVisible = true;
  }

  hide(): void {
    this.jdbVisible = false;
  }

  // 当滑上元素之后位置的设置
  onPositionChange($event) {
    for (const key in POSITION_MAP) {
      if (JSON.stringify($event.connectionPair) === JSON.stringify(POSITION_MAP[key])) {
        this.jdbPlacement = key;
        break;
      }
    }

    this.setClassMap();
    // 调用变更
    this._cdr.detectChanges();
  }

  // 自定义类名以及不同位置类名设置
  setClassMap(): void {
    this._classMap = {
      [`jdb-tooltip-${this._placement}`]: true,
      [this.jdbOverlayClassName]: true,
      ['jdb-dark-bg']:this.jdbDialog==='dark'
    };
  }

  // 强制更新位置未生效 ————在元素上滑动的时候浮层位置不变
  updatePosition() {
    if (this.overlay && this.overlay.overlayRef) {
      this.overlay.overlayRef.updatePosition();
    }
  }

  ngAfterViewInit() {
    if (this._trigger === 'hover') {
      this._renderer.listen(this.jdbOrigin.elementRef.nativeElement, 'mouseenter', () => this.show());
      this._renderer.listen(this.jdbOrigin.elementRef.nativeElement, 'mouseleave', () => this.hide());
    } else if (this._trigger === 'focus') {
      this._renderer.listen(this.jdbOrigin.elementRef.nativeElement, 'focus', () => this.show());
      this._renderer.listen(this.jdbOrigin.elementRef.nativeElement, 'blur', () => this.hide());
    } else if (this._trigger === 'click') {
      // 若有浮层，则点击后浮层消失，若无浮层，则点击出现浮层；
      this._renderer.listen(this.jdbOrigin.elementRef.nativeElement, 'click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        this.jdbVisible = !this.jdbVisible ;
      });

      this._renderer.listen(document, 'click', (e) => {
        this.jdbVisible = false;
      });
    }
  }

  // 转换为boolean,即实现有这个字段就认为为true,没有即为false
  toBoolean(value: boolean | string): boolean {
    return value === '' || (value && value !== 'false');
  }
}
