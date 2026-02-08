import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../services/job.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Create Job</h2>

    <input [(ngModel)]="name" placeholder="Job name" />
    <input [(ngModel)]="runAt" type="datetime-local" />

    <select [(ngModel)]="recurrence">
      <option value="NONE">One Time</option>
      <option value="MINUTELY">Every Minute (test)</option>
      <option value="HOURLY">Hourly</option>
      <option value="DAILY">Daily</option>
      <option value="WEEKLY">Weekly</option>
    </select>

    <button (click)="createJob()">Create</button>

    <hr />

    <h3>Jobs</h3>

    <div *ngFor="let job of jobs">
      <b>{{ job.name }}</b> — {{ job.status }}

      <button (click)="viewExecutions(job._id)">Logs</button>

      <button *ngIf="job.status === 'PENDING'" (click)="cancel(job._id)">
        Cancel
      </button>

      <button *ngIf="job.status === 'FAILED'" (click)="retry(job._id)">
        Retry
      </button>
    </div>
  `
})
export class JobsComponent implements OnInit {
  jobs: any[] = [];
  name = '';
  runAt = '';
  recurrence = 'NONE';

  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit() {
    this.loadJobs();
    setInterval(() => this.loadJobs(), 5000);
  }

  loadJobs() {
    this.jobService.getJobs().subscribe((res: any) => {
      this.jobs = res;
    });
  }

  createJob() {
    this.jobService.createJob({
      name: this.name,
      runAt: new Date(this.runAt),
      recurrence: { type: this.recurrence }
    }).subscribe(() => this.loadJobs());
  }

  cancel(id: string) {
    this.jobService.cancelJob(id).subscribe(() => this.loadJobs());
  }

  retry(id: string) {
    this.jobService.retryJob(id).subscribe(() => this.loadJobs());
  }

  viewExecutions(id: string) {
  this.router.navigate(['/jobs', id, 'executions']);
}

}
