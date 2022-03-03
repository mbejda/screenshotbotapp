import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { FileMetadata } from '../interfaces/file-metadata';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  uploadFile(file: File): Observable<{uploading?: number, downloadURL?: string}> {
    return new Observable(observer => {
      const metadata: FileMetadata = {
        contentType: file.type,
        customMetadata: {
          size: file.size.toString(),
          lastModified: new Date(file.lastModified).toISOString()
        }
      };
      const uploadTask = this.storage.ref(`images/users/profile-photos/${file.name}`).put(file, metadata);

      uploadTask.percentageChanges().subscribe(value => {
        observer.next({uploading: value});
      });

      uploadTask.then(() => {
        this.storage.ref(`images/users/profile-photos/${file.name}`).getDownloadURL().toPromise()
        .then((downloadURL: string) => {
          observer.next({downloadURL});
          observer.complete();
        }).catch(observer.error);
      }).catch(observer.error);

    });
  }
}
