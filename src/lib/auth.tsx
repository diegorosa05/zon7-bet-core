import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Role = "apostador" | "compliance";

export interface SessionUser {
  id: string;
  nome: string;
  email: string;
  role: Role;
}

interface AuthContextValue {
  user: SessionUser | null;
  /** false até a sessão do localStorage ser lida (evita flash/mismatch de SSR) */
  ready: boolean;
  entrar: (input: { email: string; nome?: string; role: Role }) => SessionUser;
  sair: () => void;
  trocarPapel: (role: Role) => void;
}

const STORAGE_KEY = "zon7.session";

const AuthContext = createContext<AuthContextValue | null>(null);

function lerSessao(): SessionUser | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SessionUser;
    if (!parsed?.email || !parsed?.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(lerSessao());
    setReady(true);
  }, []);

  const persist = useCallback((next: SessionUser | null) => {
    setUser(next);
    if (typeof window === "undefined") return;
    if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const entrar = useCallback<AuthContextValue["entrar"]>(
    ({ email, nome, role }) => {
      const sessao: SessionUser = {
        id: role === "compliance" ? "op-001" : "usr-001",
        nome: nome?.trim() || (role === "compliance" ? "Ana Compliance" : "Diego Rosa"),
        email,
        role,
      };
      persist(sessao);
      return sessao;
    },
    [persist],
  );

  const sair = useCallback(() => persist(null), [persist]);

  const trocarPapel = useCallback((role: Role) => {
    setUser((atual) => {
      if (!atual) return atual;
      const next = { ...atual, role, id: role === "compliance" ? "op-001" : "usr-001" };
      if (typeof window !== "undefined")
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ user, ready, entrar, sair, trocarPapel }),
    [user, ready, entrar, sair, trocarPapel],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de <AuthProvider>");
  return ctx;
}
