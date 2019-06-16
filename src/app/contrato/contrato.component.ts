import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DownloadService } from '../download/download.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {

  public formContrato: FormGroup

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private downloadService: DownloadService) { }

  ngOnInit() {
    if(!window.sessionStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.formContrato = this.formBuilder.group({
      nrSiscdb: ['']
    })
  }

  @ViewChild('downloadZipLink') private downloadZipLink: ElementRef;

  onSubmit() {
    this.downloadService.downloadPDFContrato(Number.parseInt(this.formContrato.value.nrSiscdb))
      .subscribe( data => {
        const url = window.URL.createObjectURL(data);

        const link = this.downloadZipLink.nativeElement;
        link.href = url;
        link.download = 'contrato_'+this.formContrato.value.nrSiscdb+'.pdf';
        link.click();

        window.URL.revokeObjectURL(url);
      })
  }

}
