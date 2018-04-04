
import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  ViewChild,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-jdb-plg-pagination',
  templateUrl: './jdb-plg-pagination.component.html',
  styleUrls: ['./jdb-plg-pagination.component.scss']
})
export class JdbPlgPaginationComponent {
  _total: number; // 总条数
  _current = 1; // 当前页码默认为1
  _pageSize = 10; // 默认条数
  _firstIndex = 1;  // 首页默认为1
  _lastIndex = Infinity;  // 尾页默认为无穷
  _showTotal = false;  // 是否展示总数，默认不展示
  _showPageSize = false; // 是否展示页码切换，默认不展示
  _showQuickJump = false; // 是否展示快速跳转，默认不展示
  pages = [];  // 页码数组
  // _options = [10, 20, 30, 40, 50]; // select默认数组
  _options = [
    { value: 10, text: '10条/页' },
    { value: 20, text: '20条/页' },
    { value: 30, text: '30条/页' },
    { value: 40, text: '40条/页' },
    { value: 50, text: '50条/页' }
  ]; // select默认数组

  quickJumpPage: any; // 快速跳转页码
  hisQicukPage: any;  // 历史快速跳转页码
  _jdbSimple = false; // 是否为简单分页，默认为基本分页

  @Output() jdbPageSizeChange: EventEmitter<number> = new EventEmitter();  // 条数切换  命名与属性相关
  @Output() jdbPageIndexChange: EventEmitter<number> = new EventEmitter();  // 页码切换

  @ViewChild('inputJump') private inputJump: ElementRef;
  constructor(
    private el: ElementRef,
    private renderer2: Renderer2
  ) { }

  // 是否展示总数标签
  @Input()
  set jdbShowTotal(value: boolean) {
    this._showTotal = this.toBoolean(value);
    console.log(this._showTotal);
  }

  get jdbShowTotal(): boolean {
    return this._showTotal;
  }

  // 数据总数
  @Input()
  set jdbTotal(value: number) {
    // 若传入值和当前total一致，则不触发操作
    if (value === this._total) {
      return;
    }
    this._total = value;
    this.setPageNo();
  }

  get jdbTotal(): number {
    return this._total;
  }

  // jdbPageIndex与_current关联，表示页码
  @Input()
  set jdbPageIndex(value: number) {
    if (this._current === value) {
      return;
    }
    if (value > this._lastIndex || value < this._firstIndex) {
      return;
    }
    this._current = Number(value);
    this.setPageNo();
  }

  get jdbPageIndex(): number {
    return this._current;
  }

  // 是否展示切换条数select
  @Input()
  set jdbShowPageSize(value: boolean) {
    this._showPageSize = this.toBoolean(value);
  }

  get jdbShowPageSize(): boolean {
    return this._showPageSize;
  }

  // 默认条数
  @Input()
  set jdbPageSize(value: number) {
    if (value === this._pageSize) {
      return;
    }
    this._pageSize = value;
    this.setPageNo();
  }

  get jdbPageSize(): number {
    return this._pageSize;
  }

  // 默认下拉选择条数数组
  @Input()
  set jdbSizeOptions(value) {
    // 若传入值和当前total一致，则不触发操作
    if (value === this._options) {
      return;
    }
    let optionsArr = [];
    value.forEach(elem => {
      let obj = {
        value: elem,
        text: elem + '条/页'
      }
      optionsArr.push(obj);
    });

    this._options = optionsArr;
  }

  get jdbSizeOptions() {
    return this._options;
  }

  // 是否展示快速跳转页面
  @Input()
  set jdbShowQuickJump(value: boolean) {
    this._showQuickJump = this.toBoolean(value);
  }

  get jdbShowQuickJump(): boolean {
    return this._showQuickJump;
  }

  // 分页样式
  @Input()
  set jdbSimple(value: boolean) {
    this._jdbSimple = this.toBoolean(value);
  }

  get jdbSimple(): boolean {
    return this.jdbSimple;
  }

  // 创建页码
  setPageNo() {
    // 向上取整
    this._lastIndex = Math.ceil(this._total / this._pageSize);
    // 如果当前页码大于尾页，则等于尾页
    if (this._current > this._lastIndex) {
      this.jdbPageIndex = this._lastIndex;
      this.jdbPageIndexChange.emit(this.jdbPageIndex);
    }

    const tmpPages = [];

    if (this._lastIndex <= 9) {
      // 若总页数不超过9，则全部展示在页面上
      for (let i = 2; i <= this._lastIndex - 1; i++) {
        tmpPages.push({
          index: i
        });
      }
    } else {
      const current = +this._current;
      let left = Math.max(2, current - 2);
      let right = Math.min(current + 2, this._lastIndex - 1);

      // 特殊处理正数第五个数和倒数第五个数
      if (current === 5) {
        left = 2;
      } else if (current === this._lastIndex - 4) {
        right = this._lastIndex - 1;
      }

      if (current - 1 <= 3) {
        right = 7;
      }

      if (this._lastIndex - current <= 3) {
        left = this._lastIndex - 6;
      }

      for (let i = left; i <= right; i++) {
        tmpPages.push({ index: i });
      }
    }

    this.pages = tmpPages;
  }

  // status为true表示页码切换，num表示页码，false表示条数切换，num表示条数
  dataChange(status: boolean, num: number): void {
    if (status) {
      if (num === this._firstIndex - 1 || num === this._lastIndex + 1) {
        return;
      }

      // 清空输入框内容
      this.quickJumpPage = '';
      this.jdbPageIndex = num;
      this.jdbPageIndexChange.emit(this.jdbPageIndex);
    } else {
      // 清空输入框内容
      this.quickJumpPage = '';
      this.jdbPageSize = num;
      this.jdbPageSizeChange.emit(num);
      // 切换页数之后需要将页码重置为1
      this.jdbPageIndex = 1;
      this.jdbPageIndexChange.emit(this.jdbPageIndex);
    }

    this.setPageNo();

  }

  // 点击跳转按钮快速跳转
  quickJump() {
    // 若是输入的页码大于最后一页页码，即超出范围不存在，则清空页码，并使输入框获取焦点
    if (this.quickJumpPage > this._lastIndex) {
      this.inputJump.nativeElement.focus();
      this.quickJumpPage = '';
      return;
    }

    // 若输入为空，则不能跳转
    if (!this.quickJumpPage) {
      return;
    }

    this.jdbPageIndex = this.quickJumpPage;
    this.jdbPageIndexChange.emit(this.jdbPageIndex);
  }

  // 点击左箭头(为什么使用条数除以2呢)
  jumpBefore(pageSize) {
    this.dataChange(true, this._current - Math.round(pageSize / 2));
  }

  // 点击右箭头
  jumpAfter(pageSize) {
    this.dataChange(true, this._current + Math.round(pageSize / 2));
  }

  // 转换为boolean,即实现有这个字段就认为为true,没有即为false
  toBoolean(value: boolean | string): boolean {
    return value === '' || (value && value !== 'false');
  }

  // 校验是否为纯数字
  isNumber(obj) {
    const reg = /^[0-9]*$/;
    return reg.test(obj);
  }

}

