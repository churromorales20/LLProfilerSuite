import { NodeEventContext } from "h3";

class LLCookie {
  create(name: string, data: Object, duration: number): string {
    return `${name}=${JSON.stringify(data)}; Path=/; Max-Age=${duration}; SameSite=Strict`;
    //return `${name}=${JSON.stringify(data)}; Path=/; Max-Age=${duration}; Secure; SameSite=Strict`;
  }

  getCookieByName<T>(name: string, nodeEvent: NodeEventContext): T | null {
    try {
      
      const cookieKey = `${name}=`;
      const cookieValue = nodeEvent.req.headers.cookie?.split(';').find(function (cookie: string) {
        return cookie.trim().startsWith(cookieKey);
      })?.trim().substring(cookieKey.length);

      return cookieValue === undefined ? null : JSON.parse(cookieValue) as T;
    } catch (error: any) {
      return null;
    }
  }
}

export const llCookie = new LLCookie();
