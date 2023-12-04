import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  movie: any = {
    actors: []
  };
  successMessage: string = '';
  errorMessage: string = '';
  movies: any[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.moviesService.getAllMovies().subscribe(
      (movies) => {
        this.movies = movies;
      },
      (error) => {
        console.error('Error al obtener las películas:', error);
      }
    );
  }

  saveMovie(): void {
    this.moviesService.createMovie(this.movie).subscribe(
      (data) => {
        this.movie = {};
        this.loadMovies();
        this.successMessage = 'Película agregada correctamente';
        console.log('Película agregada localmente:', data);
      },
      (error) => {
        this.errorMessage = 'Error al agregar la película';
        console.error('Error al agregar la película:', error);
      }
    );
  }

  cancelCreation(): void {
    console.log('Creación cancelada');
  }
}
