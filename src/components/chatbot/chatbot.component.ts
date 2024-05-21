import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImagePreloadService } from '@services/image-preload.service';
import { OpenAiApiService } from '@services/open-ai-api.service';
import { ToastrService } from 'ngx-toastr';

const MODULES = [
  NgClass,
  NgTemplateOutlet,
  ReactiveFormsModule
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
  chatMessages: { role: string, content: string }[] = [];
  isTyping: boolean = false;
  showError: boolean = false;

  private openAiApiService = inject(OpenAiApiService);
  private toastr = inject(ToastrService);
  private imagePreloadService = inject(ImagePreloadService);

  ngOnInit() {
    this.imagePreloadService.preloadImages([
      'assets/images/user.jpg',
      'assets/images/bot.jpg'
    ]);

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

    this.openAiApiService.sendMessage(userMessage)
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
}