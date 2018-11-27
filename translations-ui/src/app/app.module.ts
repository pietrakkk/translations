import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ImportFormComponent } from './import-form/import-form.component';
import { EditResultComponent } from './edit-result/edit-result.component';

@NgModule({
  declarations: [
    AppComponent,
    ImportFormComponent,
    EditResultComponent,
  ],
  imports: [
    BrowserModule,
    Ng2SmartTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
