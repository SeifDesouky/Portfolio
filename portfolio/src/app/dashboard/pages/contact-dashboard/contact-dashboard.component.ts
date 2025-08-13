import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-dashboard',
  standalone: false,
  templateUrl: './contact-dashboard.component.html',
  styleUrl: './contact-dashboard.component.css'
})
export class ContactDashboardComponent {
  messagesList: any[] = [];

  constructor(private global:GlobalService,private toaster:ToastrService){}

  ngOnInit() {
    this.global.getComment().subscribe(res => {
      console.log(res);
      this.messagesList=res.data
    })
  }
  replyMessage(msg:any) { }
  deleteMessage(id: any) {
    this.global.deleteComment(id).subscribe({
    next: (res) => {
      this.toaster.success(res.message);
      this.messagesList = this.messagesList.filter(m => m._id !== id);
    },
    error: () => {
      this.toaster.error('Something went wrong');
    }
  });
  }
}
