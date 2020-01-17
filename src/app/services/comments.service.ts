import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getComments(placeId: string, page : number): Observable<Result> {
    const url = '?id=' + placeId + '&page=' + page;
    return this.http.get<Result>('http://localhost:3000/api/v1/comments' + url);
  }


}
