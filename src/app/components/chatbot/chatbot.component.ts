import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatService } from '@services/chat.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { ChatMessage } from '@models/chat-message.model';
import { User } from '@angular/fire/auth';

const MODULES = [
  NgClass,
  NgTemplateOutlet,
  ReactiveFormsModule,
  NgOptimizedImage
]

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [MODULES],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
  animations: [
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ]
})
export class ChatbotComponent implements OnInit {
  userMessage = new FormControl('', Validators.required);
  assistantReply!: string;
  chatMessages: ChatMessage[] = [];
  // currentUser: User | null = null;
  isTyping: boolean = false;
  showError: boolean = false;
  currentYear: number = new Date().getFullYear();

  private chatService = inject(ChatService);
  private toastr = inject(ToastrService);
  private authService = inject(AuthService);
  private route = inject(Router);

  ngOnInit() {
    // const savedTheme = localStorage.getItem('theme');
    // if (savedTheme) {
    //   document.documentElement.setAttribute('data-theme', savedTheme);
    // }
    // this.changeTheme();
    

    // this.authService.getCurrentUser().subscribe(user => {
    //   this.currentUser = user;
    //   console.log('Current user:', this.currentUser);
    // });


    const storedMessages = localStorage.getItem('chatMessages');
    if (!storedMessages) {
      this.chatMessages.push({ role: 'assistant', content: '¡Hola! Soy SamuzGPT, tu asistente virtual. ¿En qué te puedo ayudar hoy?' });
      localStorage.setItem('chatMessages', JSON.stringify(this.chatMessages));
    } else {
      this.chatMessages = JSON.parse(storedMessages);
    }
  }

  sendMessage(event?: Event) {
    if (event) {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === 'Enter') {
        keyboardEvent.preventDefault();
      }
    }

    if (this.userMessage.invalid) {
      this.toastr.error('Please enter a message', 'Error');
      return;
    }
    const userMessage = this.userMessage.value;
    if (userMessage === null) {
      return;
    }
    this.chatMessages.push({ role: 'user', content: userMessage });
    console.log(`User: ${userMessage}`);
    this.isTyping = true;

    this.chatService.sendMessage(userMessage)
      .subscribe({
        next: response => {
          setTimeout(() => {
            const chatContainer = document.querySelector('.chat-container');
            if (chatContainer) {
              chatContainer.scrollTop = chatContainer.scrollHeight;
            }
          }, 0);
          this.assistantReply = response;
          this.chatMessages.push({ role: 'assistant', content: this.assistantReply });
          console.log(`Assistant: ${this.assistantReply}`);
          this.isTyping = false;

          localStorage.setItem('chatMessages', JSON.stringify(this.chatMessages));
        },
        error: error => {
          this.showError = true;
          console.error(error);
        }
      });
    this.userMessage.reset();
  }

  clearChat() {
    this.chatMessages = [];
    localStorage.removeItem('chatMessages');
  }

  onClick() {
    this.authService.logout()
    .then(() => {
      this.route.navigate(["/login"]);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  changeTheme(): void {
    // Alternar entre los temas disponibles
    const themes = ['light', 'dark', 'cupcake'];
    const currentThemeAttr = document.documentElement.getAttribute('data-theme');
    const currentIndex = currentThemeAttr!== null? themes.indexOf(currentThemeAttr) : -1;
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    // Cambia el atributo data-theme del elemento <html>
    document.documentElement.setAttribute('data-theme', nextTheme);

    // Guarda la elección del tema en el almacenamiento local
    localStorage.setItem('theme', nextTheme);
  }


}