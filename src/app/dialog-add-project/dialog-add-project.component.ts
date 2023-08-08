import { Component, inject } from '@angular/core';
import { Project } from '../interface/project';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-project',
  templateUrl: './dialog-add-project.component.html',
  styleUrls: ['./dialog-add-project.component.scss']
})
export class DialogAddProjectComponent {
    // name: string = '';
    // duration: number = 0;
    // difficulty: ('easy' | 'medium' | 'hard') = 'easy';
    // skills: ('Angular' | 'TypeScript' | 'JavaScript' | 'HTML' | 'Scrum' | 'Firebase' | 'GIT' | 'CSS' | 'Rest-API' | 'Material Design') = 'HTML';

    // project: Project = {
    //     name: '',
    //     duration: 0,
    //     difficulty: 'easy',
    //     skills: 'HTML'
    // };

    // Variablen für die Übernahme der Felder des Dialogs
    newName: string = '';
    newDuration: number = 0;
    newDifficulty: string = '';
    newSkills: string[] = [];

    difficulties: string[] = ['easy', 'medium', 'hard'];
    selectskills: string[] = ['Angular' , 'TypeScript' , 'JavaScript' , 'HTML' , 'Scrum' , 'Firebase' , 'GIT' , 'CSS' , 'Rest-API' , 'Material Design'];
    loading: boolean = false;

    firestore: Firestore = inject(Firestore);
    projectCollection = collection(this.firestore, 'projects');

    constructor(public dialogRef: MatDialogRef<DialogAddProjectComponent>) {

    }

    cancelEdit() {
        this.dialogRef.close();
    }

    saveProject() {
        console.log(this.newName);
        console.log(this.newDuration);
        console.log(this.newDifficulty);
        console.log(this.newSkills);

        let thisProject = {
            name: this.newName,
            duration: this.newDuration,
            difficulty: this.newDifficulty,
            skills: this.newSkills
        }

        this.loading = true;

        addDoc(this.projectCollection, thisProject)
        .then((result: any) => {
            console.log('Adding project finished:', result);
            this.loading = false;
            this.dialogRef.close();
        });
    }
}
