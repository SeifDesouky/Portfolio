import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { ToastrService } from 'ngx-toastr';
import { ContactMessage } from '../../../models/portfolio.models';

@Component({
  selector: 'app-contact-dashboard',
  standalone: false,
  templateUrl: './contact-dashboard.component.html',
  styleUrl: './contact-dashboard.component.css'
})
export class ContactDashboardComponent {
  messagesList: ContactMessage[] = [];

  constructor(private global:GlobalService,private toaster:ToastrService){}

  trackByIndex(index: number): number {
    return index;
  }

  ngOnInit() {
    this.global.getComment().subscribe(res => {
      this.messagesList = res.data;
    });
  }
  replyMessage(_msg: ContactMessage) { }
  deleteMessage(id: string) {
    this.global.deleteComment(id).subscribe({
      next: (res) => {
        this.toaster.success(res.message);
        this.messagesList = this.messagesList.filter((m) => m._id !== id);
      },
      error: () => {
        this.toaster.error('Something went wrong');
      }
    });
  }
}
