import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private urlBase = 'https://api.themoviedb.org/3';
  private apiKey = '78b94d60c5e1f6996035aed976a513d8';
  private readToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGI5NGQ2MGM1ZTFmNjk5NjAzNWFlZDk3NmE1MTNkOCIsInN1YiI6IjY1NjU2YTZhODlkOTdmMDExYjRjOTYzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ww1l9n_uKPlq7olcFxmiJMbbcT8UIBD1rr28sVz9hJ8';
  public localMovies: any[] = [];
  
  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.readToken}`
    });

    const params = new HttpParams()
      .set('language', 'en-US')
      .set('page', '1')
      .set('sort_by', 'created_at.asc')
      .set('api_key', this.apiKey);

    return this.http.get<any[]>(`${this.urlBase}/movie/popular`, { headers, params })
      .pipe(
        map((resp: any) => resp.results)
      );
  }

  buscarPeliculas(titulo: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.readToken}`
    });

    const params = new HttpParams()
      .set('language', 'en-US')
      .set('page', '1')
      .set('sort_by', 'created_at.asc')
      .set('query', titulo)
      .set('api_key', this.apiKey);

    return this.http.get<any[]>(`${this.urlBase}/search/movie`, { headers, params })
      .pipe(
        map((resp: any) => resp.results)
      );
  }

  getMovieDetails(movieId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.readToken}`
    });

    const params = new HttpParams()
      .set('api_key', this.apiKey);

    return this.http.get<any>(`${this.urlBase}/movie/${movieId}`, { headers, params })
      .pipe(
        map((movie: any) => {
          if (!movie.reviews) {
            movie.reviews = []; 
          }
          return movie;
        })
      );
  }

  createMovie(movieData: any): Observable<any> {
    this.localMovies.push(movieData);
    return of(movieData); 
  }

  getLocalMovies(): any[] {
    return this.localMovies;
  }
  fetchRandomMovies(): Observable<any[]> {
    const url = `${this.urlBase}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`;

    return this.http.get<any[]>(url).pipe(
      map((resp: any) => resp.results)
    );
}
}
