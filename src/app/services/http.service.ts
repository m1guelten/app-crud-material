import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url: string = 'http://localhost:3000/productList';

  constructor(private httpClient: HttpClient) {}
  
  createData(data: any) {
    return this.httpClient.post(this.url, data);
  }
  
  readData() {
    return this.httpClient.get(this.url);
  }

  updateData(data: any, id: number) {
    return this.httpClient.put(`${this.url}/${id}`, data);
  }
  
  deleteData(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
