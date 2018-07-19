import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AddNotePage } from '../add-note/add-note';
import { NoteService } from '../../providers/note-service/note-service';
import { Note } from '../../models/note.model';
import { ViewNotePage } from '../view-note/view-note';
import { EsportsNewsPage } from '../esports-news/esports-news'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notes : Promise<Note[]>;
  private note: Note;
  channelId = 'UCZZPgUIorPao48a1tBYSDgg'; // Devdactic Channel ID
  playlists: Observable<any[]>;


  constructor(public navCtrl: NavController, private noteService: NoteService, private ytProvider, private alertCtrl: AlertController) {
  }

  searchPlaylists() {
    this.playlists = this.ytProvider.getPlaylistsForChannel(this.channelId);
    this.playlists.subscribe(data => {
      console.log('playlists: ', data);
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'No Playlists found for that Channel ID',
        buttons: ['OK']
      });
      alert.present();
    })
  }

  openPlaylist(id) {
    this.navCtrl.push('EsportsNewsPage', {id: id});
  }

  ionViewWillEnter() {  
    this.notes = this.getAllNotes();
  }

  addNote() {
    this.navCtrl.push(AddNotePage);
  }

  esports() {
    this.navCtrl.push(EsportsNewsPage);
  }

  getNote(createDate: number) {
    this.noteService.getNote(createDate).then((n) => {
      this.note = n;
      this.navCtrl.push(ViewNotePage, { note: this.note })
    })
  }

  getAllNotes() {
    return this.noteService.getAllNotes();
  }
}
