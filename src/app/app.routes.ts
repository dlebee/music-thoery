import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotesPageComponent } from './core-theory/pages/notes-page/notes-page.component';
import { NotePageComponent } from './core-theory/pages/note-page/note-page.component';
import { ChordsPageComponent } from './core-theory/pages/chords-page/chords-page.component';
import { ScaleDegreesPageComponent } from './core-theory/pages/scale-degrees-page/scale-degrees-page.component';
import { GuitarsPageComponent } from './instruments/guitars/pages/guitars-page/guitars-page.component';
import { TestComponentComponent } from './pages/test-component/test-component.component';

export const routes: Routes = [
    {
        path: "",
        component: HomePageComponent
    },
    {
        path: "notes",
        component: NotesPageComponent
    },
    {
        path: "notes/:note",
        component: NotePageComponent
    },
    {
        path: 'chords',
        component: ChordsPageComponent
    },
    {
        path: 'scale/:note/:type/degrees',
        component: ScaleDegreesPageComponent
    },
    {
        path: 'instruments/guitars',
        component: GuitarsPageComponent
    },
    {
        path: 'test',
        component: TestComponentComponent
    }
];
