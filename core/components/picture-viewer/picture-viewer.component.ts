import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  ElementRef,
  Renderer,
  animate,
  style,
  transition,
  trigger,
  state,
  HostListener,
  OnDestroy,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-picture-viewer',
  templateUrl: './picture-viewer.component.html',
  styleUrls: ['./picture-viewer.component.scss'],
  animations: [
    trigger('imgMove', [
      /** 不显示 */
      state('off', style({ 'display': 'none', 'z-index': '0', 'transform': 'translateX(0)' })),
      /** 上一张图片 */
      state('prev', style({
        'z-index': '1',
        'transform': 'translateX(-100%)'
      })),
      /** 下一张图片 */
      state('next', style({ 'z-index': '2', 'transform': 'translateX(100%)' })),
      /** 当前图片 */
      state('on', style({ 'z-index': '3', 'transform': 'translateX(0)' })),
      transition('prev=>on', [
        animate('0.3s ease-in')
      ]),
      transition('next=>on', [
        animate('0.3s ease-in')
      ]),
      transition('on=>prev', [
        animate('0.3s ease-in')
      ]),
      transition('on=>next', [
        animate('0.3s ease-in')
      ])
    ])
  ]
})
export class PictureViewerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() pictureList: any = [];
  @Output() update = new EventEmitter<{ status: boolean }>();
  // @Input() current: number = 0;
  @ViewChild('img') imgBox: ElementRef;  // 图片父节点
  @ViewChild('imgContent') imgContent: ElementRef; // 容器元素
  // 设置容器的默认宽高，可适配 可配置属性
  @Input() maxWidth: number = 800;
  @Input() maxHeight: number = 600;
  @Input() jdbShowType: number = 1; // 是浮层还是嵌入组件，默认为1，作为浮层，若为2，则表示是嵌入组件

  _jdbMaster = true; // 是否需要master遮罩，默认需要遮罩层
  _jdbClear = true;// 是否需要按钮叉，默认需要
  dragStatus = false;
  current = 0; // 展示图片下标，默认为0

  elem: any;

  imgOperate = {
    num: 1,
    degnum: 0
  };


  @Input()
  set jdbMaster(value: boolean) {
    this._jdbMaster = this.toBoolean(value);
  }

  get jdbMaster(): boolean {
    return this._jdbMaster;
  }

  @Input()
  set jdbClear(value: boolean) {
    this._jdbClear = this.toBoolean(value);
  }

  get jdbClear(): boolean {
    return this._jdbClear;
  }

  @Input()
  set jdbCurrent(value: number) {
    if (value > this.pictureList.length || value < 0) {
      this.current = 0;
      return;
    }
    this.current = value;
  }

  get jdbCurrent(): number {
    return this.current;
  }

  constructor(private renderer: Renderer) {

  }

  ngOnInit() {
    this.elem = this.imgBox.nativeElement.children;  // 所有的li
  }

  ngOnChanges() {
    if (this.pictureList) {
      this.pictureList.forEach((element, index) => {
        this.resetPosition(index);
      });
    }
  }

  // 设置元素样式
  ngAfterViewInit() {
    const imgContent = this.imgContent.nativeElement;
    this.renderer.setElementStyle(imgContent, 'height', this.maxHeight + 'px');
    this.renderer.setElementStyle(imgContent, 'width', this.maxWidth + 'px');

    if (this.jdbShowType == 1) {
      this.renderer.setElementStyle(imgContent, 'margin-left', - this.maxWidth / 2 + 'px');
      this.renderer.setElementStyle(imgContent, 'margin-top', - this.maxHeight / 2 + 'px');
    }
  }

  // 重置图片位置
  resetPosition(index) {
    const image = new Image();
    image.onload = () => {
      // 获取当前加载图片宽高
      let w = image.width;
      let h = image.height;
      let hRatio;
      let wRatio;
      // 设置默认比例以及容器宽高
      const imgRate = w / h; // 图片宽高比
      // const maxWidth = 800;
      // const maxHeight = 600;
      wRatio = this.maxWidth / w;
      hRatio = this.maxHeight / h;

      if (wRatio > 1 && hRatio > 1) {
        // 两者比例均大于1表示图为小图，宽高未达到800*600,则取原图大小
        w = w;
        h = h;
      } else if (wRatio < 1 && hRatio < 1) {
        // 两者比例均小于1表示图为大图，宽高达到800*600,则取容器大小
        if (imgRate > 1) {
          // 宽图
          w = this.maxWidth;
          h = w / imgRate;
        } else if (imgRate < 1) {
          // 长图
          h = this.maxHeight;
          w = h * imgRate;
        }

      } else if (wRatio > 1 && hRatio < 1) {
        // 表示为长图片，则高为600，宽等比例缩放取值
        h = this.maxHeight;
        w = w * hRatio;
      } else if (wRatio < 1 && hRatio > 1) {
        // 表示为宽图片，则宽为800，高等比例缩放取值
        h = h * wRatio;
        w = this.maxWidth;
      }

      // 设置图片展示宽高
      this.renderer.setElementStyle(this.elem[index].children[0], 'height', h + 'px');
      this.renderer.setElementStyle(this.elem[index].children[0], 'width', w + 'px');

      if (w === this.maxWidth && h === this.maxHeight) {
        // 设置图片位置使其垂直水平居中
        this.renderer.setElementStyle(this.elem[index].children[0], 'top', '0px');
        this.renderer.setElementStyle(this.elem[index].children[0], 'left', '0px');
      } else {
        // 设置图片位置使其垂直水平居中
        this.renderer.setElementStyle(this.elem[index].children[0], 'top', (this.maxHeight - h) / 2 + 'px');
        this.renderer.setElementStyle(this.elem[index].children[0], 'left', (this.maxWidth - w) / 2 + 'px');
      }

    };
    image.src = this.pictureList[index].imgUrl;
  }

  // 切换动画
  ImgState(index) {
    if (this.pictureList && this.pictureList.length) {
      if (this.current === 0) {
        return index === 0 ? 'on' :
          index === 1 ? 'next' :
            index === this.pictureList.length - 1 ? 'prev' :
              'off';
      } else if (this.current === this.pictureList.length - 1) {
        return index === this.pictureList.length - 1 ? 'on' :
          index === this.pictureList.length - 2 ? 'prev' :
            index === 0 ? 'next' :
              'off';
      }
      switch (index - this.current) {
        case 0:
          return 'on';
        case 1:
          return 'next';
        case -1:
          return 'prev';
        default:
          return 'off';
      }
    } else {
      return 'off';
    }
  }

  // 下一张图
  Next() {
    this.resetImgData();
    this.current = (this.current + 1) % this.pictureList.length;
    this.resetPosition(this.current - 1);
    // 修改状态，使拖动图片回到原来位置
    // this.dragStatus = true;
  }

  // 上一张图
  Prev() {
    this.resetImgData();
    this.current = this.current - 1 < 0 ? this.pictureList.length - 1 : this.current - 1;
    this.resetPosition(this.current + 1);
    // 修改状态，使拖动图片回到原来位置
    // this.dragStatus = true;
  }

  // 关闭图片查看器 __关闭弹框后再次打开所有拖拽后的位置都会自动归为，因为触发了onChanges方法
  closeModel() {
    this.resetImgData();
    this.update.emit({ status: false });
  }

  // 放大 50% 100% 200% 400%
  scaleBig() {
    this.imgOperate.num = this.imgOperate.num * 2;
    if (this.imgOperate.num > 4) {
      this.imgOperate.num = 4;
    }
    const rate = 'scale(' + 1 * this.imgOperate.num + ',' + 1 * this.imgOperate.num + ') rotate(' + (-this.imgOperate.degnum * 90) + 'deg)';
    this.renderer.setElementStyle(this.elem[this.current].children[0], 'transform', rate);
  }

  // 缩小
  scaleSmall() {
    this.imgOperate.num = this.imgOperate.num / 2;
    if (this.imgOperate.num < 1) {
      this.imgOperate.num = 0.5;
    }
    const rate = 'scale(' + 1 * this.imgOperate.num + ',' + 1 * this.imgOperate.num + ') rotate(' + (-this.imgOperate.degnum * 90) + 'deg)';
    this.renderer.setElementStyle(this.elem[this.current].children[0], 'transform', rate);
  }

  // 逆时针旋转
  routateNi() {
    this.imgOperate.degnum++;
    const rate = 'scale(' + 1 * this.imgOperate.num + ',' + 1 * this.imgOperate.num + ') rotate(' + (-this.imgOperate.degnum * 90) + 'deg)';

    this.renderer.setElementStyle(this.elem[this.current].children[0], 'transform', rate);
  }

  // 顺时针旋转
  routateShun() {
    this.imgOperate.degnum--;

    const rate = 'scale(' + 1 * this.imgOperate.num + ',' + 1 * this.imgOperate.num + ') rotate(' + (-this.imgOperate.degnum * 90) + 'deg)';

    this.renderer.setElementStyle(this.elem[this.current].children[0], 'transform', rate);
  }

  // 重置图片数据
  resetImgData() {
    this.imgOperate = {
      num: 1,
      degnum: 0
    };
    const rate = 'scale(1,1) rotate(0deg)';
    this.renderer.setElementStyle(this.elem[this.current].children[0], 'transition', 'transform 0.2s linear 0.4s');
    this.renderer.setElementStyle(this.elem[this.current].children[0], 'transform', rate);
  }

  // 转换为boolean,即实现有这个字段就认为为true,没有即为false
  toBoolean(value: boolean | string): boolean {
    return value === '' || (value && value !== 'false');
  }

  ngOnDestroy() {
    this.pictureList = null;
    this.imgBox = null;
    this.imgContent = null;
    this.current = null;
  }
}
