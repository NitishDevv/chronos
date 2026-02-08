import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExecutionService } from '../services/execution.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Execution History</h3>
    <div *ngIf="executions.length === 0">
        No executions found for this job.
    </div>

    <div *ngFor="let log of executions">
      {{ log.status }} —
      {{ log.startedAt }} →
      {{ log.finishedAt || 'running' }}
      <span *ngIf="log.error"> {{ log.error }}</span>
    </div>
  `
})
export class ExecutionsComponent implements OnInit {
  executions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private executionService: ExecutionService
  ) {}

  ngOnInit() {
    const jobId = this.route.snapshot.params['id'];
    this.executionService.getExecutions(jobId).subscribe((res: any) => {
      this.executions = res;
    });
  }
}
