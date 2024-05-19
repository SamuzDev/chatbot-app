import { Routes } from '@angular/router';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

export const routes: Routes = [
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1925335880.
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ChatbotComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
