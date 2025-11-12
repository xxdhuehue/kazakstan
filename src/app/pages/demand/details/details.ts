import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PublishService } from '../../../services/publish';
import { FormsModule } from '@angular/forms';
import { IRemark, RemarkService } from '../../../services/remark';
import { APP_TOKENS } from '../../../app.constants';

@Component({
  selector: 'app-details',
  imports: [RouterModule, FormsModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  showRemark = signal(false)
  detailId: string 
  remarkContent = signal("")
  detail = signal<any>({})
  constructor(
    private router: ActivatedRoute,
    private remarkService: RemarkService,
    private publishService: PublishService) {
    this.detailId = router.snapshot.params['id']
  }

  ngOnInit():void {
    if (this.detailId) {
      this.getDetailsById(this.detailId)
    }
  }

  addRemark() {
    const localUserInfo = localStorage.getItem(APP_TOKENS.USERINFO)
    if (!localUserInfo) return 
    const userInfo = JSON.parse(localUserInfo);
    const params:IRemark = {
      publish_id: Number(this.detailId),
      author_id: userInfo.id,
      content: this.remarkContent()
    }
    this.remarkService.addRemark(params).subscribe({
      next: () => {
        this.getDetailsById(this.detailId)
        this.showRemark.set(false)
      }
    })
  }

  getDetailsById(id: string) {
    this.publishService.getDetailById(id).subscribe((data) => {
      this.detail.set(data?.data)
    })
  }
}
