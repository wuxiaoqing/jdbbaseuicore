import {
    Component,
    OnInit, Input,
    ViewContainerRef,
    ViewChild, ElementRef,
    ComponentRef,
    ComponentFactoryResolver,
    Injector,
    OnDestroy,
    Output,
    EventEmitter,

} from '@angular/core';



@Component({
    selector: 'jdb-tab',
    templateUrl: './jdb-tab.component.html',
    styleUrls: ['./jdb-tab.component.scss']
})

export class JdbTabComponent implements OnInit, OnDestroy {
    // @ViewChild('tabContent') tabContent: ElementRef;
    @ViewChild('tabContent', { read: ViewContainerRef }) target;
    @Output() onTabChange = new EventEmitter();
    @Output() onTabRemove = new EventEmitter();
    @Output() onTopComMsg = new EventEmitter();
    items = [];
    tabComs = [];
    tabSubs: any;
    curTabIndex = 0;
    tabIdComMap = {};
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        public _injector: Injector,
    ) { }


    ngOnInit() {
    }


    /**
     *
     * @param ChildComponent
     * @param attrs:{
     *     propery:value
     * ]
     * title:string
     * isCloseFlag
     */
    addItem(ChildComponent: any, attrs: any, title: string, comId: any = "", isCloseFlag: boolean = false) {

        if (comId && this.tabIdComMap[comId]) {
            let com: any = this.tabIdComMap[comId];
            this.tabChange(com.index);
            return;
        }
        const childComponent = this.componentFactoryResolver.resolveComponentFactory(ChildComponent);
        var comInstance = this.target.createComponent(childComponent);
        var keys = Object.keys(attrs);
        this.items.push({
            title: title,
            isCloseFlag: isCloseFlag
        });
        keys.forEach((value) => {
            comInstance.instance[value] = attrs[value];
        });
        this.tabComs.push(comInstance);
        if (this.items.length > 1) {
            this.setOneComHide(this.curTabIndex);
        }

        this.tabSubs = comInstance.instance['onTopComMsg'] = new EventEmitter();
        this.tabSubs.subscribe((value) => {
            this.onTopComMsg.emit(value)
        });
        this.curTabIndex = this.items.length - 1;
        if (comId) {
            this.tabIdComMap[comId] = {
                index: this.curTabIndex,
                comInstance: comInstance.instance
            }
        }
        return comInstance;
    }

    private setOneComHide(tabIndex) {
        this.tabComs[tabIndex].location.nativeElement.style.display = "none";
    }

    private setOneComShow(tabIndex) {
        this.tabComs[tabIndex].location.nativeElement.style.display = "block";
    }

    tabChange(index) {
        if (this.curTabIndex === index) {
            return;
        }
        this.setOneComHide(this.curTabIndex);
        this.setOneComShow(index);
        this.curTabIndex = index;
        this.onTabChange.emit(index);
        this.tabComs[index].instance.tabRefresh && this.tabComs[index].instance.tabRefresh({});
        // this.tabComs[index].destroy();
    }

    setOneTabShow(index) {
        this.tabChange(index);
    }

    removeTab(index) {
        this.tabComs[index].destroy();
        this.tabComs.splice(index, 1);
        this.items.splice(index, 1);
        if (index <= this.curTabIndex) {
            this.curTabIndex--;
        }
        if (this.curTabIndex < 0) {
            this.curTabIndex = 0;
        }
        this.setOneComShow(this.curTabIndex);
        this.onTabRemove.emit(index);
        let tabIdComMap = this.tabIdComMap;
        for (let key in tabIdComMap) {
            if (tabIdComMap[key].index == index) {
                delete tabIdComMap[key];
                break;
            }
        }

    }

    removeTabById(id:string) {
        let tabIdComMap = this.tabIdComMap;
        for(let key in tabIdComMap) {
            if(key == id)  {
                this.removeTab(tabIdComMap[key]['index']);
                break;
            }
        }
    }
    ngOnDestroy() {
        if (this.target) {
            // this.target.destroy();
            this.target.clear();
        }
    }

}
