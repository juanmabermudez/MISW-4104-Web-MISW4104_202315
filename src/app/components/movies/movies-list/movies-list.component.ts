import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies: any[] = [];
  searchTerm: string | null = null;

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchTerm = params['q']; 

      if (this.searchTerm) {
        this.searchMovies(this.searchTerm);
      } else {
        this.loadAllMovies();
      }
    });
  }

  // Método para cargar todas las películas
  loadAllMovies(): void {
    this.moviesService.getAllMovies().subscribe(response => {
      this.movies = response;
    });
  }

  // Método para buscar películas por término de búsqueda
  searchMovies(query: string): void {
    this.moviesService.buscarPeliculas(query).subscribe(response => {
      this.movies = response;
    });
  }

  // Método para redirigir a la página de detalles de la película
  showMovieDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }
}
