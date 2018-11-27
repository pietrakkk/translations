import { Component, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { Translation } from "../models/translation";
import { ApiService } from '../service/api.service';

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

  constructor(private mainService: MainService, private apiService: ApiService) { }

  ngOnInit() {
    this.mainService.showEditResult.subscribe((response: any) => {
      this.sessionKey = response.session_key
      this.data = response.comparision_result;
      this.display = true;
    });
  }

  onExport() {
    this.apiService.fixTranslations(this.data, this.sessionKey)
      .subscribe(
        (translations) => {
          // https://stackoverflow.com/questions/42360665/angular2-to-export-download-json-file
        },
        (response) => {
          this.error = response.error;
        });
  }

  onCancel() {

  }

}
