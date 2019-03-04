import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: Http) { }
  Url = 'http://127.0.0.1:8001/';
  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer '+localStorage.getItem('token')); 
  }
  createUser(user) {
    const formData: FormData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('password', user.password);
    return this.http.post(this.Url+"register", formData);
  }
  loginUser(user) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.Url+`login_check`, user, {headers});
  }
  getUsers() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+"usersShow", {headers});
  }
  getUser(id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+`user/${id}`, {headers});
  }
  addConversation(conversation) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('title', conversation.title);
    formData.append('send_to', conversation.send_to);
    return this.http.post(this.Url+"addConversation", formData, {headers});
  }
  addMessage(message) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('content', message.text);
    formData.append('conversation_id', message.conversation);
    return this.http.post(this.Url+"addMessage", formData, {headers});
  }
}
