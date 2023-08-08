import { Component } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../interface/project';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {

    docId:any = '';
    curProject!: Project;

    constructor(private route:ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) {

    }

    ngOnInit(): void {
        this.route.paramMap.subscribe( paramMap => {
            this.docId = paramMap.get('id'); // Der Parameter id stammt aus der app-routing.module.ts -> path: 'project/:id', component: ProjectDetailComponent
            // console.log('Got ID: ', this.docId);
            this.getProject();
        })
    }

    async getProject() {
        const projectCollection = collection(this.firestore, 'projects');  // Holen der Sammlung 'projects'
        const projectRef = doc(projectCollection, this.docId);             // Referenz auf das Dokument
        const projectDoc = await getDoc(projectRef);                       // Das Dokument selbst (Muss in diesen zwei Schritten gemacht werden)
        const projectData = projectDoc.data();                             // Zugriff auf die (lesbaren) Daten in JSON-Format
        // console.log(projectData);
        // console.log(this.curProject);
        this.curProject = {
            name: (projectData) ? projectData['name'] : '',
            duration: (projectData) ? projectData['duration'] : 0,
            difficulty: (projectData) ? projectData['difficulty'] : '',
            skills: (projectData) ? projectData['skills'] : []
        }
        // console.log(this.curProject);
    }

    editProject() {

    }
}
