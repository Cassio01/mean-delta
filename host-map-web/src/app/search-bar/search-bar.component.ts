import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {HttpClientService} from "../http-client.service";
import {Localizacao} from "../model/localizacao.model";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'fd-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    dominio: String;

    @Output()
    localizacao: EventEmitter<Localizacao> = new EventEmitter();

    constructor(private httpClient: HttpClientService, private _route:ActivatedRoute ) {

        this._route.params.subscribe((params)=>{
            let ip = params['dominio'];
            if(ip){
                this.dominio = ip;
            }

        });
    }

    ngOnInit() {
        if(this.dominio){
            this.pesquisar();
        }

    }

    pesquisar(): void{
        this.httpClient
            .get('http://ip-api.com/json/' + this.dominio)
            .subscribe(
                (data) => {
                    data.dominio = this.dominio;
                    this.localizacao.emit(data);
                },
                (error) => console.error(error)
            );
    }

}
