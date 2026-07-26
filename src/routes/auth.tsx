import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/home/Navbar";

const searchSchema = z.object({
  next: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Sign in — Veliq" },
      { name: "description", content: "Sign in to Veliq to save cars, compare listings, and connect AI assistants." },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";

function safeNext(next: string | undefined): string {
  if (!next) return "/";
  // Only allow same-origin relative paths.
  if (next.startsWith("/") && !next.startsWith("//")) return next;
  return "/";
}

function AuthPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const next = safeNext(search.next);

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  // If already signed in, bounce to next.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: next, replace: true });
    });
  }, [navigate, next]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
        navigate({ to: next, replace: true });
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}${next}`,
          },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Password reset email sent");
        setMode("signin");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/auth${next !== "/" ? `?next=${encodeURIComponent(next)}` : ""}`,
      });
      if (result.error) throw result.error;
      if (result.redirected) return;
      // Popup path — session already set.
      toast.success("Signed in with Google");
      navigate({ to: next, replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto flex max-w-md flex-col px-4 pt-32 pb-16">
        <h1 className="text-3xl font-bold tracking-tight">
          {mode === "signin" && "Welcome back"}
          {mode === "signup" && "Create your Veliq account"}
          {mode === "forgot" && "Reset your password"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin" && "Sign in to save cars and manage your favorites."}
          {mode === "signup" && "Save cars, compare listings, and connect AI assistants."}
          {mode === "forgot" && "We'll email you a link to set a new password."}
        </p>

        {mode !== "forgot" && (
          <>
            <Button
              type="button"
              variant="outline"
              className="mt-8 w-full"
              onClick={handleGoogle}
              disabled={busy}
            >
              Continue with Google
            </Button>
            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              or
              <div className="h-px flex-1 bg-border" />
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {mode !== "forgot" && (
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
          )}
          <Button type="submit" variant="premium" className="w-full" disabled={busy}>
            {mode === "signin" && "Sign in"}
            {mode === "signup" && "Create account"}
            {mode === "forgot" && "Send reset link"}
          </Button>
        </form>

        <div className="mt-6 space-y-2 text-center text-sm text-muted-foreground">
          {mode === "signin" && (
            <>
              <button type="button" className="hover:text-foreground" onClick={() => setMode("forgot")}>
                Forgot password?
              </button>
              <p>
                New to Veliq?{" "}
                <button type="button" className="text-primary hover:underline" onClick={() => setMode("signup")}>
                  Create an account
                </button>
              </p>
            </>
          )}
          {mode === "signup" && (
            <p>
              Already have an account?{" "}
              <button type="button" className="text-primary hover:underline" onClick={() => setMode("signin")}>
                Sign in
              </button>
            </p>
          )}
          {mode === "forgot" && (
            <button type="button" className="text-primary hover:underline" onClick={() => setMode("signin")}>
              Back to sign in
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
