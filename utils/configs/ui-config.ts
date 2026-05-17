export class UIConfig {
  static readonly baseURL = 'http://localhost:8000/#';
  static readonly loginPage = '/login';

  static readonly emailInput = 'input[formcontrolname="email"]';
  static readonly passwordInput = 'input[formcontrolname="password"]';
  static readonly signInButton = 'button:has-text("Sign in")';
  static readonly errorMessages = 'ul.error-messages li';
  static readonly profileNavLink = 'a[href="#/my-profile"]';
  static readonly signInNavLink = 'nav a[href="#/login"]';
}
