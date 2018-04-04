import {
    HostListener,
    ElementRef,
    Directive,
    Component,
    Renderer,
    OnInit,
    Input,
    AfterContentInit,
    OnChanges,
    ChangeDetectionStrategy
} from '@angular/core';

@Directive({
    selector: 'img[appDragDirective]'
})
export class DragDirective {
    oldLeft: string;
    oldTop: string;

    private isDown = false;
    private disX;
    private disY;
    private disLeft;
    private disTop;

    constructor(
        private elem: ElementRef,
        private render: Renderer
    ) {
        //
    }

    // 点击事件
    @HostListener('mousedown', ['$event']) onMousedown(event) {
        const wRate = localStorage.getItem('dragWidth');
        const hRate = localStorage.getItem('dragHeight');
        this.isDown = true;

        this.disLeft = this.elem.nativeElement.offsetLeft;
        this.disTop = this.elem.nativeElement.offsetTop;

        this.disX = event.clientX;
        this.disY = event.clientY;
        event.target.style.cursor = 'move';
        // event.preventDefault();
    }

    // 监听移动事件事件
    @HostListener('mousemove', ['$event']) onMousemove(event) {
        event.preventDefault();
        // 判断该元素是否被点击了。

        if (this.isDown) {
            const newdisX = event.clientX - this.disX;
            const newdisY = event.clientY - this.disY;
            this.elem.nativeElement.style.left = newdisX + this.disLeft + 'px';
            this.elem.nativeElement.style.top = newdisY + this.disTop + 'px';

        }
        return false;


    }

    // 监听document离开事件

    @HostListener('mouseup', ['$event']) onMouseup() {
        // 只用当元素移动过了，离开函数体才会触发。
        if (this.isDown) {
            this.isDown = false;
            this.disLeft = this.elem.nativeElement.offsetLeft;
            this.disTop = this.elem.nativeElement.offsetTop;
        }
    }

    // 监听元素离开事件
    @HostListener('mouseleave', ['$event']) onMouseleave() {
        this.isDown = false;
    }
    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        
    }
}
