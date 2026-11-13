/**
 * Admin Authentication Service
 * Credentials:
 * Username: 123456789
 * Password: 123456789
 */

const AUTH_STORAGE_KEY = 'royal_bites_admin_session_v1';

export interface AdminUser {
  username: string;
  role: string;
  name: string;
  loginTime: string;
}

export const adminAuthService = {
  login(username: string, password: string): { success: boolean; error?: string } {
    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (cleanUser === '123456789' && cleanPass === '123456789') {
      const user: AdminUser = {
        username: '123456789',
        name: 'Master Restaurateur',
        role: 'Executive Administrator',
        loginTime: new Date().toISOString(),
      };
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        window.dispatchEvent(new CustomEvent('royal_bites_admin_auth_change', { detail: { authenticated: true } }));
      } catch (err) {
        console.error('Failed to set admin session in sessionStorage', err);
      }
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid Credentials. Please enter valid Admin Username & Password.',
    };
  },

  logout(): void {
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('royal_bites_admin_auth_change', { detail: { authenticated: false } }));
    } catch (err) {
      console.error('Failed to clear admin session', err);
    }
  },

  isAuthenticated(): boolean {
    try {
      const session = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (!session) return false;
      const parsed = JSON.parse(session);
      return parsed && parsed.username === '123456789';
    } catch {
      return false;
    }
  },

  getSessionUser(): AdminUser | null {
    try {
      const session = sessionStorage.getItem(AUTH_STORAGE_KEY);
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  },
};
