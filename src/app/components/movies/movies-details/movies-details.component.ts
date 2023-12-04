import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.css']
})
export class MoviesDetailComponent implements OnInit {
  movieId: number | undefined;
  movie: any;
  errorLoadingMovie: boolean = false; // Variable para controlar errores de carga
  userReview: string = ''; // Propiedad para almacenar la reseña del usuario
  successMessage: string = ''; // Mensaje de éxito al agregar la reseña
  errorMessage: string = ''; // Mensaje de error al agregar la reseña
  

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params['movieId'];
      this.getMovieDetails();
    });
  }

  getMovieDetails() {
    if (this.movieId) {
      this.moviesService.getMovieDetails(this.movieId).subscribe(
        (data) => {
          this.movie = data;
          console.log('Detalles de la película:', this.movie);
        },
        (error) => {
          console.error('Error al obtener detalles de la película:', error);
          this.errorLoadingMovie = true;
        }
      );
    }
  }

  submitReview(): void {
    if (this.movie && this.userReview) {
      if (!this.movie.reviews) {
        this.movie.reviews = []; // Inicializa si no existe
      }
      
      // Agrega la reseña al arreglo de reseñas
      this.movie.reviews.push(this.userReview);

      this.successMessage = 'Reseña agregada exitosamente';
      this.errorMessage = ''; // Limpiar mensaje de error si existe
    } else {
      this.errorMessage = 'No se pudo agregar la reseña. Por favor, inténtalo de nuevo.';
      this.successMessage = ''; // Limpiar mensaje de éxito si existe
    }
  }
}
