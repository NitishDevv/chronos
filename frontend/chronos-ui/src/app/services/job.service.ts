import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class JobService {
  private API = 'http://localhost:5000/api/jobs';

  constructor(private http: HttpClient) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `${localStorage.getItem('token')}`
      })
    };
  }

  getJobs() {
    return this.http.get(this.API, this.headers());
  }

  createJob(job: any) {
    return this.http.post(this.API, job, this.headers());
  }

  cancelJob(id: string) {
    return this.http.patch(`${this.API}/${id}/cancel`, {}, this.headers());
  }

  retryJob(id: string) {
    return this.http.patch(`${this.API}/${id}/retry`, {}, this.headers());
  }

  rescheduleJob(id: string, runAt: Date) {
    return this.http.patch(
      `${this.API}/${id}/reschedule`,
      { runAt },
      this.headers()
    );
  }
}
