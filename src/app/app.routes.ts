import { Routes } from '@angular/router';
import { ChatbotComponent } from 'src/app/components/chatbot/chatbot.component';
import { LoginComponent } from './components/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'chat', pathMatch: 'full' },
    { path: 'chat', component: ChatbotComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'chat', pathMatch: 'full' }
];
