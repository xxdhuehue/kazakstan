import { Component } from '@angular/core';
import { IPublish, PublishService } from '../../../services/publish';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-index',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Demand {
  publish

  constructor(private publishService: PublishService){
    this.publish = this.publishService.publish$;
  }
  
  ngOnInit(){
    this.publishService.getAll().subscribe()
  }
}
