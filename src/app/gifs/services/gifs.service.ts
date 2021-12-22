import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'jbEd6PlmxEBcCFTtd8LEyY7Dadl1AC3o';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[]=[];

  public resultados: Gifs[]=[];

  get historial(){
    
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    /* if( localStorage.getItem('historial') ){
      this._historial = JSON.parse( localStorage.getItem('historial')! );
    } */
  }

  buscargifs(query :string=''){
    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query) ){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit','10')
            .set('q',query);

    console.log(params.toString());

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params } )
    .subscribe( (resp) => {

      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })

   /*  fetch('https://api.giphy.com/v1/gifs/search?api_key=jbEd6PlmxEBcCFTtd8LEyY7Dadl1AC3o&q=dbz&limit=10')
    .then(resp =>{
      resp.json().then(data => {
        console.log(data)
      })
    })

    console.log(this._historial); */
  }

}
