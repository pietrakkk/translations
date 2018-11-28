import { Component, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { Translation } from "../models/translation";
import { ApiService } from '../service/api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-result',
  templateUrl: './edit-result.component.html',
  styleUrls: ['./edit-result.component.css']
})
export class EditResultComponent implements OnInit {
  display: boolean = false;
  error: boolean;
  sessionKey: string;

  //TODO: move to const
  settings = {
    columns: {
      valid_translation: {
        title: 'Bazowa translacja',
        editable: false,
        sort: false
      },
      translation_to_fix: {
        title: 'Do porawy',
        type: 'text',
        sort: false
      }
    },

    actions: {
      delete: false,
      add: false,
      columnTitle: "Akcje"
    },
    edit: {
      editButtonContent: "Edytuj",
      saveButtonContent: "Zapisz /",
      cancelButtonContent: " Anuluj"
    },
    attr: {
      class: 'table table-bordered'
    }
  };

  data = [];
  url: SafeUrl;

  constructor(
    private mainService: MainService,
    private apiService: ApiService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.mainService.showEditResult.subscribe((response: any) => {
      this.sessionKey = response.session_key
      this.data = response.comparision_result;
      this.display = true;
      this.url = null;
    });
  }

  onExport() {
    this.apiService.fixTranslations(this.data, this.sessionKey)
      .subscribe(
        (fixed_file) => {
          this.generateDownloadJsonUri(fixed_file);
        },
        (response) => {
          this.error = response.error;
        });
  }

  onCancel() {
    if (confirm("Czy na pewno chcesz przerwać naprawę translacji?")) {
      this.apiService.removeTranslationFile(this.sessionKey).subscribe(() => {
        this.mainService.setShowImportResult(true);
        this.display = false;
      });
    }
  }

  generateDownloadJsonUri(fixed_file) {
    let theJSON = JSON.stringify(fixed_file);
    let uri = this.sanitizer.
      bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.url = uri;
  }

}
