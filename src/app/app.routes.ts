import { Routes } from '@angular/router';
import { ChatbotComponent } from '@components/chatbot/chatbot.component';

export const routes: Routes = [
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1925335880.
    { path: '', redirectTo: 'chat', pathMatch: 'full' },
    { path: 'chat', component: ChatbotComponent },
    { path: '**', redirectTo: 'chat', pathMatch: 'full' }
];
