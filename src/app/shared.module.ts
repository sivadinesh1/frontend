import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrlidPipe } from './shared/pipe/url-id.pipe';
import { SafePipe } from './shared/pipe/safe-html.pipe';
import { EscapeHtmlPipe } from './shared/pipe/keep-html.pipe';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { NgPipesModule } from 'ngx-pipes';


import {Routes, RouterModule} from '@angular/router';
import { CheckBooleanPipe } from './shared/pipe/check-boolean.pipe';
import { NullToQuotePipe } from './shared/pipe/null-quote.pipe';
import { NullToZeroPipe } from './shared/pipe/null-zero.pipe';
import { MenubarComponent } from './shared/menubar/menubar.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    NgPipesModule,
    RouterModule,
  ],
  declarations: [
    CheckBooleanPipe,
    NullToQuotePipe,
    NullToZeroPipe,  
    UrlidPipe,
    SafePipe,
    EscapeHtmlPipe,
    MenubarComponent,
    FooterComponent,
    
  ],
  exports: [
    CommonModule,
    CheckBooleanPipe,
    NullToQuotePipe,
    NullToZeroPipe,  
    EscapeHtmlPipe,
    UrlidPipe,
    SafePipe,
    NgPipesModule,
    RouterModule
  ],
  
})
export class SharedModule { 
  static forRoot() : ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [UrlidPipe]
    }
  } 
}
