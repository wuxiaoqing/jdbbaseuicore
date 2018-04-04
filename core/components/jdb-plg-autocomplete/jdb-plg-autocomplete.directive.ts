import { Directive, Input, EventEmitter, Output, HostListener, ElementRef, ViewChild, Inject, Renderer2, OnInit} from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AutoCompleteResult } from './autocomplete.result';
@Directive({
  selector: '[appJdbPlgAutocomplete]'
})
export class JdbPlgAutocompleteDirective implements OnInit{
  
  @Input('searchParam') searchParam: string='';
  @Input('serverApi') serverApi: string = "/";
  @Input('searchWord')  searchWord: string='';
  @Output('dataReady') dataReady: EventEmitter<AutoCompleteResult[]> = new EventEmitter(); 

  constructor(private el: ElementRef,
    @Inject('jdbPlgBaseApi') private jdbPlgBaseApi,
    private render: Renderer2) { }

  // @HostListener('input',['$event']) OnInput(event: Event){
  //     if(this.searchWord){
  //       this.popupList();
  //     }
  //   console.log(this.el.nativeElement.value);
  // }
  @HostListener('paste',['$event']) OnPaste(event: Event){
    if(this.searchWord){
      this.popupList();
    }
    console.log(this.el.nativeElement.value);
  }
  ngOnInit(){

  }
  // 注册事件
  ngAfterViewInit(){
    this.render.listen(this.el.nativeElement,'input',this.debounce(()=>{
      if(this.searchWord){
        this.popupList();
      }
    }, 500, false));
  }
  // 查询接口
  popupList(){
    this.jdbPlgBaseApi.post(this.serverApi, 
    {[this.searchParam]: this.searchWord}, false).subscribe(
            (res) => {
        if( +res.error.returnCode == 0){
            let items = <AutoCompleteResult[]>res.data;
            this.dataReady.emit(items);
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

    let later = function() {
        let last = new Date().getTime() - timestamp;

        if(last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if(!immediate) {
                result = fn.apply(context, args);

                if(!timeout) {
                    context = args = null;
                }
            }
        }
    };

    return function() {
        context = this;
        args = arguments;
        timestamp = new Date().getTime();
        let callNow = immediate && !timeout;

        if(!timeout) {
            timeout = setTimeout(later, wait);
        }

        if(callNow) {
            result = fn.apply(context, args);
            context = args = null;
        }

        return result;
    }
}

}
