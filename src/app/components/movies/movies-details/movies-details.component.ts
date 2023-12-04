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
  errorLoadingMovie: boolean = false;
  userReview: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  

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
        this.movie.reviews = [];
      }
      
      this.movie.reviews.push(this.userReview);

      this.successMessage = 'Reseña agregada exitosamente';
      this.errorMessage = ''; 
    } else {
      this.errorMessage = 'No se pudo agregar la reseña. Por favor, inténtalo de nuevo.';
      this.successMessage = '';
    }
  }
}
