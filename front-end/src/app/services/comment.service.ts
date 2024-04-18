// comment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from "../models/comment.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl: string = environment.base_url + "/comments";

  constructor(private http: HttpClient) {}

  addComment(comment: { productId: number; name: string; comment: string }): Observable<Comment> {
    return this.http.post<Comment>(this.baseUrl, comment);
  }

  getComments(productId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/${productId}`);
  }
}
