import { Routes } from '@angular/router';
import { Home } from './MyComponents/home/home';
import { AboutMe } from './MyComponents/about-me/about-me';
import { Education } from './MyComponents/education/education';
import { Skills } from './MyComponents/skills/skills';
import { Experience } from './MyComponents/experience/experience';
import { Projects } from './MyComponents/projects/projects';
import { ContactMe } from './MyComponents/contact-me/contact-me';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'about-me', component: AboutMe },
  { path: 'education', component: Education },
  { path: 'skills', component: Skills },
  { path: 'experience', component: Experience },
  { path: 'projects', component: Projects },
  { path: 'contact-me', component: ContactMe },
  { path: '**', redirectTo: 'home' }
];
