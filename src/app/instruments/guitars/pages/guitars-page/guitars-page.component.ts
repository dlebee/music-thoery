import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GuitarOptions, GuitarService } from '../../services/guitar.service';
import { Observable, map, of } from 'rxjs';
import { GuitarInstruments, IGuitar } from '../../models/IGuitar';
import { FormsModule } from '@angular/forms';
import { GuitarComponent } from '../../components/guitar/guitar.component';
import { NoteService } from '../../../../core-theory/services/note.service';
import { INote } from '../../../../core-theory/models/INote';
import { InlineNoteComponent } from '../../../../core-theory/components/inline-note/inline-note.component';
import { ScaleType, scales } from '../../../../core-theory/models/IScale';
import { ScaleDegreeService } from '../../../../core-theory/services/scale-degree.service';
import { IScaleDegrees } from '../../../../core-theory/models/IScaleDegrees';
import { DegreesTableComponent } from '../../../../core-theory/components/degrees-table/degrees-table.component';
import { ScaleComponent } from '../../../../core-theory/components/scale/scale.component';
import { ChordComponent } from '../../../../core-theory/components/chord/chord.component';
import { MusicStyle } from '../../../../core-theory/models/IChord';

@Component({
  selector: 'app-guitars-page',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, FormsModule, JsonPipe,
     GuitarComponent, InlineNoteComponent, DegreesTableComponent, 
     ScaleComponent, ChordComponent],
  templateUrl: './guitars-page.component.html',
  styleUrl: './guitars-page.component.scss'
})
export class GuitarsPageComponent {
  options$: Observable<GuitarOptions[]>;
  private _currentType: GuitarInstruments | null = null;
  guitar$: Observable<IGuitar | null> = of(null);
  reversed = false;
  notes$: Observable<INote[]>;
  selectedNote: INote | null = null;
  selectedScale: ScaleType | null = null;
  scaleTypes = scales.map(t => t.type);
  degrees$: Observable<IScaleDegrees | null> = of(null);
  scaleNotes: INote[] = [];
  showClocks = false;
  showAllStyles = false;
  styles: { title: string; value: MusicStyle; }[];
  selectedStyle: MusicStyle | null = null;

  constructor(private guitar: GuitarService, private noteService: NoteService, private degreeService: ScaleDegreeService) {
    this.options$ = guitar.options();
    this.currentType = GuitarInstruments.GUITAR_STANDARD;
    this.notes$ = this.noteService.getNotes();
    this.styles = Object.values(MusicStyle).map((value) => {
      return { title: value, value: value };
    })
  }

  refreshDegrees() {
    setTimeout(() => {
      if (this.selectedNote && this.selectedScale) {
        this.degrees$ = this.degreeService.getDegrees(this.selectedNote!.name, this.selectedScale)
          .pipe(
            map(d => {
              this.scaleNotes = d.scale.noteIntervals.map(t => t.note);
              return d;
            })
          )
      } else {
        this.degrees$ = of(null);
      }
    });
  }

  get currentType() {
    return this._currentType;
  }

  set currentType(value: GuitarInstruments | null){
    this._currentType = value;

    if (this._currentType)
      this.guitar$ = this.guitar.createGuitar(this._currentType);
    else
      this.guitar$ = of(null);
  }
}
