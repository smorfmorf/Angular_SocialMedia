import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DadataService {
  apiUrl =
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

  http = inject(HttpClient);

  getSuggestions(query: string) {
    return this.http
      .post(
        `${this.apiUrl}`,
        { query: query },
        {
          headers: {
            Authorization: 'Token ee7004820e7c25e87bf7ae0a5aa936c5292a49fd',
          },
        }
      )
      .pipe(
        map((res: any) =>
          Array.from(new Set(res.suggestions)).map(
            (item: any) => item.data.city
          )
        )
      );
  }
}
