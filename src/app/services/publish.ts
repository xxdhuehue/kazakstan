import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ClientService, REQUEST_METHOD } from './client.service';

export interface IPublish {
  id: number
  title: string
  content: string
  author: string
  date: string
  url?: string
}

@Injectable({
  providedIn: 'root',
})
export class PublishService {
  private clientService = inject(ClientService)
  private publish = signal<IPublish[]>([]);
  publish$ = this.publish.asReadonly();

  addPublish(publish: IPublish): Observable<void> {
    return this.clientService.getClienData('/api/publish/add',REQUEST_METHOD.POST, publish)
  }

  getAll()  {
    return this.clientService.getClienData('/api/publish/getAll', REQUEST_METHOD.GET).pipe(tap((data: any) => {
      this.publish.set(data?.data)
    }))
  }

  getDetailById(id: string) {
      return this.clientService.getClienData(`/api/publish/getDetail/${id}`, REQUEST_METHOD.GET)
  }
}
