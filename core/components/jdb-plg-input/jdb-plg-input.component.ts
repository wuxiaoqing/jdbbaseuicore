import { Component, OnInit,EventEmitter,TemplateRef,Input,Output,ElementRef,ContentChild,forwardRef ,HostListener,ViewEncapsulation} from '@angular/core';
import { NgModel,ControlValueAccessor,NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-jdb-plg-input',
    templateUrl: './jdb-plg-input.component.html',
    styleUrls: ['./jdb-plg-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JdbPlgInputComponent),
      multi: true
    }
  ],
})

export class JdbPlgInputComponent implements OnInit,ControlValueAccessor{
    _value = '';
    _type= 'text';
    _placeHolder= '';
    _size= 'default';
    _disabled = false;
    _readonly = false;
    _error = false;
    _classMap: any;
    _inputWrapClass: Array<string> = [];
    _clear = false;
    _maxlength: number;
    _autoPromptData: Array<any> = [];
     _composing = false;
     @Input() width= '300px';
    // ngModel Access
    onChange: (value: string) => void = () => null;

    @ContentChild('jdbErrorContent')  _errorContent: TemplateRef<any>;
    @ContentChild( 'addContentBefore' ) _addOnContentBefore: TemplateRef<any>;
    @ContentChild('addContentAfter') _addOnContentAfter: TemplateRef<any>;
    @ContentChild('prefixContent') _prefixContent: TemplateRef<any>;
    @ContentChild('suffixContent') _suffixContent: TemplateRef<any>;
    @Output() jdbBlur: EventEmitter<MouseEvent> = new EventEmitter();
    @Output() jdbFocus: EventEmitter<MouseEvent> = new EventEmitter();

    ngOnInit() {
        // this._inputWrapClass =[`input-text-wrap-${this._size}`];
        if ( this._prefixContent ) {
            this._inputWrapClass.push('prefix');
        }
    }

    @HostListener('compositionstart', [ '$event' ])
    compositionStart(e: CompositionEvent): void {
        this._composing = true;
    }

    @HostListener('compositionend', [ '$event' ])
    compositionEnd(e: CompositionEvent): void {
        this._composing = false;
        this.onChange(this._value);
    }

    @Input()
    set jdbType(type: string){
        this._type = type;
    }
    get jdbType(): string{
        return this._type;
    }

    @Input()
    set jdbPlaceHolder(placeHolder: string){
        this._placeHolder = placeHolder;
    }
    get jdbPlaceHolder(): string{
        return this._placeHolder;
    }

    @Input()
    set jdbSize(size: string){
        this._size = {large: 'lg',small: 'sm'}[size];
        this.setClassMap();
    }
    get jdbSize(): string{
        return this._size;
    }

    @Input()
    set jdbDisabled(disabled: boolean){
        this._disabled = this.toBoolean(disabled);
        this.setClassMap();
    }
    get jdbDisabled(): boolean{
        return this._disabled;
    }

    @Input()
    set jdbReadonly(readonly: boolean){
        this._readonly = this.toBoolean(readonly);
    }
    get jdbReadonly(): boolean{
        return this._readonly;
    }

    @Input()
    set jdbValue(value: string){
        if ((this._value === value) || ((this._value == null) && (value == null))) {
            return;
        }
        this._value = value;
        if (!this._composing) {
        this.onChange(value);
        }
    }
    get jdbValue(): string{
        return this._value;
    }
    @Input()
    set jdbError(value: boolean){
        this._error = this.toBoolean(value);
        this.setClassMap();
    }
    get jdbError(): boolean{
        return this._error;
    }
    @Input()
    set jdbClear(value: boolean){
        this._clear = this.toBoolean(value);
    }
    get jdbClear(): boolean{
        return this._clear;
    }

    @Input()
    set jdbMaxLength(value: number){
        this._maxlength = value;
    }
    get jdbMaxLength(): number{
        return this._maxlength;
    }

    @Input()
    set jdbPromptData(value: Array<any>){
        this._autoPromptData = value;
    }
    get jdbPromptData(): Array<any>{
        return this._autoPromptData;
    }
    writeValue(value: string): void {
        this._value = value;
    }
    registerOnChange(fn: (_: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
    }
    _emitBlur($event) {
        this._inputWrapClass.splice(this._inputWrapClass.indexOf('input-focus'), 1);
        this.jdbBlur.emit($event);
    }

    _emitFocus($event) {
        this._inputWrapClass.push('input-focus');
        this.jdbFocus.emit($event);
    }
    textareaOnChange($event) {

    }
    setClassMap() {
        this._classMap = {
            [ `input-${this._type}-${this._size}` ]: true,
            [ 'input-disabled' ]: this._disabled,
            ['input-error']: this._error
        };
    }
    clearTxt() {
        this._value = '';
        this.onChange('');
    }

    toBoolean(value: boolean | string): boolean {
        return value === '' || (value && value !== 'false');
    }
}
