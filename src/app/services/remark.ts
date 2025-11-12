import { inject, Injectable } from '@angular/core';
import { ClientService, REQUEST_METHOD } from './client.service';

export interface IRemark{
  id?: number 
  publish_id: number
  author_id: number
  content: string
  create_time?: string
}


@Injectable({
  providedIn: 'root',
})
export class RemarkService {
  private clientService = inject(ClientService)

  addRemark(remark: IRemark) {
    return this.clientService.getClienData(`/api/remark/add`, REQUEST_METHOD.POST, remark)
  }
}
