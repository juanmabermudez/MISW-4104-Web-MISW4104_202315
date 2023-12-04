import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;
  randomMovies: any[] = [];
  moviesByGenre: any[] = [];
  moviesByDirectors: any[] = [];
  movieList: any[] = [
    {
      title: 'Movie 1',
      poster_path: '/path_to_poster1.jpg'
    },
    {
      title: 'Movie 2',
      poster_path: '/path_to_poster2.jpg'
    },
    // Agrega más películas si es necesario
  ];
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.fetchRandomMovies();
  }

  getRandomMovieImageUrl(): string {
    if (this.randomMovies && this.randomMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.randomMovies.length);
      return 'https://image.tmdb.org/t/p/w500' + this.randomMovies[randomIndex]?.poster_path;
    } else {
      // Si no hay películas aleatorias disponibles, proporciona una URL predeterminada o maneja el caso según sea necesario
      return 'https://image.tmdb.org/t/p/w500';
    }
  }
  fetchRandomMovies() {
    this.moviesService.fetchRandomMovies().subscribe((data: any) => {
      this.randomMovies = data;
    });
  }
  getMovieImageUrl(movie: any): string {
    if (movie && movie.poster_path) {
      return 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    } else {
      // Si no hay imagen disponible, puedes mostrar una imagen por defecto
      return 'URL_DE_LA_IMAGEN_POR_DEFECTO';
    }
  }

  scrollLeft() {
    if (this.carousel) {
      this.carousel.nativeElement.scrollLeft -= 100;
    }
  }

  scrollRight() {
    if (this.carousel) {
      this.carousel.nativeElement.scrollLeft += 100;
    }
  }
}