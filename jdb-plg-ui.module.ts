import { JdbPlgBaseService } from './core/services/jdb-plg-base/jdb-plg-base.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JdbPlgToastComponent } from './core/components/jdb-plg-toast/jdb-plg-toast.component';
import { JdbTabComponent } from './core/components/jdb-plg-tab/jdb-tab.component';
import { ShowPictureComponent } from './core/components/show-picture/show-picture.component';
import { PictureViewerComponent } from './core/components/picture-viewer/picture-viewer.component';
import { DragDirective } from './core/directive/drag.directive';
import { JdbPlgPaginationComponent } from './core/components/jdb-plg-pagination/jdb-plg-pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JdbPlgButtonComponent } from './core/components/jdb-plg-button/jdb-plg-button.component';
import { JdbPlgDialogComponent } from './core/components/jdb-plg-dialog/jdb-plg-dialog.component';
import { OnlyNumberDirective } from './core/directive/only-number.directive';
import { JdbPlgSelectComponent } from './core/components/jdb-plg-select/jdb-plg-select.component';
import { JdbPlgInputComponent } from './core/components/jdb-plg-input/jdb-plg-input.component';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from './core/overlay/index';
import { JdbPlgTooltipComponent } from './core/components/jdb-plg-tooltip/jdb-plg-tooltip.component';
import { JdbPlgTooltipDirective } from './core/directive/jdb-plg-tooltip.directive';
import { JdbPlgAutocompleteDirective } from './core/components/jdb-plg-autocomplete/jdb-plg-autocomplete.directive';
import { JdbPlgAutocompleteComponent } from './core/components/jdb-plg-autocomplete/jdb-plg-autocomplete.component';

const MDL_MODULES = [
  ShowPictureComponent,
  PictureViewerComponent,
  DragDirective,
  JdbPlgPaginationComponent,
  JdbPlgButtonComponent,
  JdbPlgDialogComponent,
  JdbPlgSelectComponent,
  JdbPlgInputComponent,
  JdbPlgTooltipComponent,
  JdbPlgTooltipDirective,
  JdbPlgAutocompleteDirective,
  JdbPlgAutocompleteComponent
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
  ],
  exports: MDL_MODULES,
  declarations: [
    JdbPlgToastComponent,
    JdbTabComponent,
    ShowPictureComponent,
    PictureViewerComponent,
    DragDirective,
    JdbPlgPaginationComponent,
    OnlyNumberDirective,
    JdbPlgSelectComponent,
    JdbPlgButtonComponent,
    JdbPlgDialogComponent,
    JdbPlgInputComponent,
    JdbPlgTooltipComponent,
    JdbPlgTooltipDirective,
    JdbPlgAutocompleteDirective,
    JdbPlgAutocompleteComponent
  ],
  providers: [JdbPlgBaseService],
  entryComponents: [JdbPlgToastComponent]
})
export class JdbPlgUiModule { }
export { JdbPlgBaseService } from './core/services/jdb-plg-base/jdb-plg-base.service';
