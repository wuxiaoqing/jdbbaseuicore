import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, Inject, Renderer2, AfterViewInit } from '@angular/core';
import { AutoCompleteResult } from './autocomplete.result';
import { keyCode } from './keycode';
@Component({
  selector: 'app-jdb-plg-autocomplete',
  templateUrl: './jdb-plg-autocomplete.component.html',
  styleUrls: ['./jdb-plg-autocomplete.component.scss']
})
export class JdbPlgAutocompleteComponent implements OnInit, AfterViewInit {

  _searchParam = 'key';
  _serverApi = '/';
  _searchWord = '';
  items: AutoCompleteResult[] = [];
  _listShow = false;
  activeIndex = 0;
  @Input() jdbPlaceHolder = '';
  @Input() width = '300px';
  @Output() onSelected: EventEmitter<AutoCompleteResult> = new EventEmitter();

  constructor(private el: ElementRef,
    @Inject('jdbPlgBaseApi') private jdbPlgBaseApi,
    private render: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.render.listen(this.el.nativeElement, 'input', this.debounce(() => {
      if (this._searchWord) {
        this.popupList();
      }
    }, 500, false));
  }
  // 监听document的click事件
  @HostListener('document:click', ['$event.target']) OnClick(el: HTMLElement) {
    if ( el.className.indexOf('input') !== -1 && this.items.length > 0) {
       this._listShow = true;
    }else {
      this._listShow = false;
    }
  }
  // 键盘事件
  @HostListener('keydown', ['$event']) OnKeyDown(event: KeyboardEvent) {
    switch (event.which) {
      case keyCode.UP:
                this.activeIndex--;
                if (this.activeIndex < 0 ) {
                  this.activeIndex = this.items.length - 1;
                }
                this.setSearchWord();
                break;
     case keyCode.DOWN:
          this.activeIndex++;
          if (this.activeIndex >= this.items.length) {
            this.activeIndex = 0;
          }
          this.setSearchWord();
          break;
     case keyCode.ENTER:
          const item = <AutoCompleteResult>this.items[this.activeIndex];
          this.selectedItem(item, this.activeIndex);
          break;
    default:
            this.activeIndex = 0;
    }

  }
  // 粘贴事件
  @HostListener('paste', ['$event']) OnPaste(event: Event) {
    if (this._searchWord) {
      this.popupList();
    }
  }
  // 设置选中样式
  setSelectClass(obj) {
    if (obj) {
     return  this._searchWord === obj.value;
    }
    return;
  }
  // 设置文本框选中内容
  setSearchWord() {
    const item = <AutoCompleteResult>this.items[this.activeIndex];
    this._searchWord = item.value;
  }
  // 选中单个条目
  selectedItem(item, index) {
    this.activeIndex = index;
    this._searchWord = item.value;
    this._listShow = false;
    this.onSelected.emit(item);
  }

  // 查询接口
  popupList() {
    this.items = [];
    this.jdbPlgBaseApi.post(this._serverApi,
    {[this._searchParam]: this._searchWord}, false).subscribe(
            (res) => {
        if ( +res.error.returnCode === 0) {
          this.items = <AutoCompleteResult[]>res.data;
            this._listShow = true;
          }
    });
  }
  // 函数防抖
  debounce(fn, wait, immediate) {
    let timeout,
        args,
        context,
        timestamp,
        result;

    const later = function() {
        const last = new Date().getTime() - timestamp;

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = fn.apply(context, args);

                if (!timeout) {
                    context = args = null;
                }
            }
        }
    };

    return function() {
        context = this;
        args = arguments;
        timestamp = new Date().getTime();
        const callNow = immediate && !timeout;

        if (!timeout) {
            timeout = setTimeout(later, wait);
        }

        if (callNow) {
            result = fn.apply(context, args);
            context = args = null;
        }
        return result;
    }
  }
  @Input()
  set jdbSearchParam(val){
    this._searchParam = val;
  }
  get jdbSearchParam(){
    return this._searchParam;
  }

  @Input()
  set jdbServerApi(val){
    this._serverApi = val;
  }
  get jdbServerApi(){
    return this._serverApi;
  }
@Input()
  set jdbSearchWord(val){
    this._searchWord = val;
  }
  get jdbSearchWord(){
    return this._searchWord;
  }
}
