import { Component, inject } from '@angular/core';
import { doc, Firestore, collection, collectionData, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProjectComponent } from '../dialog-add-project/dialog-add-project.component';
import { Project } from '../interface/project';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {

    // user: User = new User();
    firestore: Firestore = inject(Firestore);              // Zugriff auf Firestore
    projectCollection = collection(this.firestore, 'projects');  // Holen der Sammlung 'projects'
    projects$:Observable<any> = collectionData(this.projectCollection, {idField: 'id'}); // Zugriff auf die Daten der Sammlung, d.h. die einzelnen Einträge. Inkl. die ID eines Eintrags ins neue Feld id.
    allProjects:any[] = [];

    constructor(public dialog: MatDialog) {
        this.projects$.subscribe( (changes: any) => {         // Abonnieren der Änderung in den Daten users$ (s.o.)
            // console.log('Received changes: ', changes);
            this.allProjects = changes;                       // Zuweisen der einzelnen Einträge in das Array allUsers
        });
    }

    addProjectDialog(): void {
        this.dialog.open(DialogAddProjectComponent);
    }

    deleteProject(projectId:string) {
        // console.log('deleteProject gestartet - id: ', projectId);
        // OpenProject stoppen
        event?.stopPropagation();

        let docRef = doc(this.projectCollection, projectId);
        deleteDoc(docRef)
        .then( () => {
            console.log('Document has been deleted.');
        })
        .catch( error => {
            console.log('Error in deleting document: ', error);
        });
    }

}
