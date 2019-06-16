import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DownloadService } from './download.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private downloadService: DownloadService) { }

  public formDownload: FormGroup
  nrSiscdbParam: number

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.nrSiscdbParam = params['nrSiscdb']);
    var nrSiscdbForm = ''
    if(this.nrSiscdbParam != undefined) {
      nrSiscdbForm = this.nrSiscdbParam.toString()
    }
    this.formDownload = this.formBuilder.group({
      nrSiscdb: [nrSiscdbForm]
    })
    if(this.nrSiscdbParam != undefined) {
      this.onSubmit()
    }
  }

  @ViewChild('downloadZipLink') private downloadZipLink: ElementRef;

  onSubmit() {
    this.downloadService.downloadPDFPedido(Number.parseInt(this.formDownload.value.nrSiscdb))
      .subscribe( data => {
        const url = window.URL.createObjectURL(data);

        const link = this.downloadZipLink.nativeElement;
        link.href = url;
        link.download = 'pedido_'+this.formDownload.value.nrSiscdb+'.pdf';
        link.click();

        window.URL.revokeObjectURL(url);
      })
  }
}
