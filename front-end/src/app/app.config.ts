import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from "./auth/auth.interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MessageService} from "primeng/api";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule), provideHttpClient(withInterceptors([authInterceptor])), provideAnimationsAsync(), provideAnimations(), MessageService]
};
