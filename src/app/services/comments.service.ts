import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getComments(placeId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://localhost:3000/api/v1/comments');

  }

}
