import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http } from '@angular/http';

import { ChatService } from '../services/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private readonly notifier: NotifierService;
  users: any;
  user1: any;
  title: string;
  MyClass: boolean[] = [];
  message_content: any[] = [];
  constructor(private chatService: ChatService,
    notifierService: NotifierService,
    private router: Router,) { 
      this.notifier = notifierService;
    }

  ngOnInit() {
    this.chatService.getUsers().subscribe(file => {
      this.users = file.json();
      console.log(this.users);
      this.users.forEach(element => {
        this.MyClass[element.id]= true;
      });
    });
  }
  onLogout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.router.navigate([`/login/`]);
  }
  OpenConversation(id, username)
  {
    let element = document.getElementById('conversation_form_'+id);
    if(element.className.indexOf('hidden') !== -1)
    {
      const conversation ={
        title : username,
        send_to : id
      }
      this.chatService.addConversation(conversation).subscribe(res => 
      {
        this.chatService.getUsers().subscribe(file => {
          this.users = file.json();
        });
        this.MyClass[id]= false;
        this.notifier.notify( 'success', 'reply added successfully' );
      }, (err) => {
        console.log("err "+err);
        this.notifier.notify( 'error', 'An error occurred while adding a new conversation: ' + err.statusText );
      });
    }
    else
    {
      this.MyClass[id]= true;
    }
    
  }
  AddMessage(id, index)
  {
    const message ={
      text : this.message_content[index],
      conversation : id
    }
    this.chatService.addMessage(message).subscribe(res => 
      {
        this.notifier.notify( 'success', 'message added successfully' );
        this.chatService.getUsers().subscribe(file => {
          this.users = file.json();
        });
      }, (err) => {
        console.log("err "+err);
        this.notifier.notify( 'error', 'An error occurred while adding a new message: ' + err.statusText );
      });
  }
}
