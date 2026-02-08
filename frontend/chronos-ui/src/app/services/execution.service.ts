import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ExecutionService {
  private API = 'http://localhost:5000/api/executions';

  constructor(private http: HttpClient) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `${localStorage.getItem('token')}`
      })
    };
  }

  getExecutions(jobId: string) {
    return this.http.get(`${this.API}/job/${jobId}`, this.headers());
  }
}
