import "express-session";

declare module "express-session" {
  interface SessionData {
    loggedIn: boolean;
    admin: boolean;
  }
}
