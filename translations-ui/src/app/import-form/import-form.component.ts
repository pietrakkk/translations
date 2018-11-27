import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-import-form',
  templateUrl: './import-form.component.html',
  styleUrls: ['./import-form.component.css']
})
export class ImportFormComponent implements OnInit {
  formData = new FormData();
  error: string;
  display: boolean = true;

  constructor(private apiService: ApiService, private mainService: MainService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.apiService.compareFiles(this.formData)
      .subscribe(
        (translations) => {
          this.mainService.setEditResultFlag(translations);
          this.display = false;
        },
        (response) => {
          this.error = response.error;
        });
  }

  onFileChange($event, controlName) {
    this.formData.append(controlName, $event.target.files[0]);
  }

}
