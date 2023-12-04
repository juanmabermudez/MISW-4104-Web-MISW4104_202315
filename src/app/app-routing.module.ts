import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoviesListComponent } from './components/movies/movies-list/movies-list.component';
import { MoviesDetailComponent } from './components/movies/movies-details/movies-details.component';
import { CreateMovieComponent } from './components/create-movie/create-movie.component'; 

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'movies',
    component: MoviesListComponent
  },
  {
    path: 'movie/:movieId',
    component: MoviesDetailComponent,
  },
  {
    path: 'createmovie',
    component: CreateMovieComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
