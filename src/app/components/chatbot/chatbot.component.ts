import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { OpenAiApiService } from '../../services/open-ai-api.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent  {
  userMessage!: string;
  assistantReply!: string;
  chatMessages: { role: string, content: string }[] = [];

  private openAiApiService = inject(OpenAiApiService)

  sendMessage() {
    const userMessage = this.userMessage;
    this.chatMessages.push({ role: 'user', content: userMessage });
    this.openAiApiService.sendMessage(this.userMessage)
      .subscribe(response => {
        this.assistantReply = response.reply;
        this.chatMessages.push({ role: 'assistant', content: this.assistantReply });
        this.userMessage = '';
      });
  }
}