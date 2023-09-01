"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [organization, setOrganization] = useState("");
  const [appName, setAppName] = useState("");
  const [url, setUrl] = useState("https://example.com");
  const [callbackUrl, setCallbackUrl] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  const target = `https://github.com/organizations/${organization}/settings/apps/new?state=newlycreated`;
  return (
    <div className="bf-container">
      <h1>GitHub App Creator</h1>
      <form action={target} method="post">
        <fieldset>
          <label>Organization name:</label>
          <input
            type="text"
            required
            placeholder="e.g. labthrust"
            value={organization}
            onChange={(e) => {
              setOrganization(e.target.value);
            }}
          />
          <div>
            <small>Target: {target}</small>
          </div>

          <label>GitHub App name:</label>
          <input
            type="text"
            required
            placeholder="e.g. My GitHub App"
            value={appName}
            onChange={(e) => {
              setAppName(e.target.value);
            }}
          />

          <label>URL:</label>
          <input
            type="url"
            required
            placeholder="e.g. https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />

          <label>Callback URL:</label>
          <input
            type="url"
            required
            placeholder="e.g. https://keycloak.example.com/realms/appthrust-console/broker/github/endpoint"
            value={callbackUrl}
            onChange={(e) => {
              setCallbackUrl(e.target.value);
            }}
          />

          <label>Webhook URL:</label>
          <input
            type="url"
            required
            placeholder="e.g. https://api.example.com/webhooks/github"
            value={webhookUrl}
            onChange={(e) => {
              setWebhookUrl(e.target.value);
            }}
          />

          <details>
            <summary>Manifest</summary>
            <label>Manifest</label>
            <textarea
              name="manifest"
              rows={30}
              value={JSON.stringify(
                manifest({
                  name: appName,
                  callbackUrl,
                  webhookUrl,
                  redirectUrl: `${origin}/redirect`,
                }),
                null,
                2,
              )}
              readOnly
            />
          </details>
          <div>
            <button>Submit</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

// https://github.com/organizations/{organization_name}/settings/apps/new?webhook_active=true&contents=read&emails=read&events=push
function manifest({
  name,
  callbackUrl,
  webhookUrl,
  redirectUrl,
}: Readonly<{
  name: string;
  callbackUrl: string;
  webhookUrl: string;
  redirectUrl: string;
}>) {
  return {
    name,
    url: "https://www.example.com",
    public: false,
    callback_urls: [callbackUrl],
    hook_attributes: {
      url: webhookUrl,
      active: true,
    },
    default_permissions: {
      contents: "read",
      emails: "read",
    },
    default_events: ["push"],
    redirect_url: redirectUrl,
  };
}
