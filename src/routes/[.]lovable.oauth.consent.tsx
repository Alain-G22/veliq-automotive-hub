import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

// Beta namespace: Supabase auth.oauth is not always in the SDK types.
type AuthorizationDetails = {
  client?: { name?: string; client_uri?: string; redirect_uri?: string };
  redirect_url?: string;
  redirect_to?: string;
  scope?: string;
};

type OAuthClient = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails | null; error: Error | null }>;
  approveAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: Error | null }>;
  denyAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: Error | null }>;
};

function getOAuth(): OAuthClient {
  // @ts-expect-error auth.oauth is beta
  return supabase.auth.oauth as OAuthClient;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({
        to: "/auth",
        search: { next: location.href },
      });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id") ?? "";
    const { data, error } = await getOAuth().getAuthorizationDetails(authorizationId);
    if (error) throw error;
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) {
      window.location.href = immediate;
      return data;
    }
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="mx-auto max-w-md px-4 pt-32 text-center">
      <h1 className="text-xl font-semibold">Could not load this authorization request</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {(error as Error)?.message ?? String(error)}
      </p>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const fn = approve ? getOAuth().approveAuthorization : getOAuth().denyAuthorization;
    const { data, error: err } = await fn(authorization_id);
    if (err) {
      setBusy(false);
      setError(err.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? "an app";

  return (
    <main className="mx-auto max-w-md px-4 pt-32 pb-16">
      <h1 className="text-2xl font-bold tracking-tight">
        Connect {clientName} to your Veliq account
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {clientName} will be able to call Veliq's enabled tools while you're signed in — browse the
        car catalog and manage your saved favorites as you.
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        This does not bypass Veliq's permissions. You can disconnect at any time.
      </p>

      {error && (
        <p role="alert" className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-8 flex gap-3">
        <Button variant="premium" className="flex-1" disabled={busy} onClick={() => decide(true)}>
          Approve
        </Button>
        <Button variant="outline" className="flex-1" disabled={busy} onClick={() => decide(false)}>
          Deny
        </Button>
      </div>
    </main>
  );
}
