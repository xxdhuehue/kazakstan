import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { IPublish, PublishService } from '../../../services/publish';
import { Router } from '@angular/router';
 



@Component({
  selector: 'app-publish',
  imports: [EditorModule,FormsModule,ReactiveFormsModule],
  templateUrl: './publish.html',
  styleUrl: './publish.css',
})
export class Publish {
  constructor(private publishService: PublishService, private router: Router){}

  editorContent = signal("")

  applyForm = new FormGroup({
    category: new FormControl(''),
    title: new FormControl(''),
    content: new FormControl(''),
    author: new FormControl(''),
    phone: new FormControl(''),
    url: new FormControl(''),
  })

  submitApplication(): void{
    console.log("applyForm+++++", this.applyForm)
    this.publishService.addPublish(this.applyForm.value as IPublish).subscribe((data) => {
      this.router.navigateByUrl('/demand')
    })
  }
}
