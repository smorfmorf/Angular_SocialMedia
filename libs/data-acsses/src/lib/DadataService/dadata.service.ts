import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DadataService {

  apiUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  token = "ee7004820e7c25e87bf7ae0a5aa936c5292a49fd";
  #http = inject(HttpClient);


  getSuggestion(query: string) {
    return this.#http.post(this.apiUrl, { query }, {
      headers: {
        "Authorization": `Token ${this.token}`
      }
    }).pipe(
      map((res: any) => {
        return res.suggestions
        // return Array.from(
        //   new Set(res.suggestions.map((suggestion: any) => suggestion.value))
        // )
      })
    );
  }


}