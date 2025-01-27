"use client";
import { useEffect, useState } from "react";

export default function Home() {
	const [organization, setOrganization] = useState("");
	const [appName, setAppName] = useState("");
	const [url, setUrl] = useState("https://example.com");
	const [callbackUrls, setCallbackUrls] = useState<string[]>(["", "", ""]);
	const [webhookUrl, setWebhookUrl] = useState("");
	const [origin, setOrigin] = useState("");
	useEffect(() => {
		setOrigin(window.location.origin);
		const params = new URLSearchParams(window.location.search);
		setOrganization(params.get("organization") || "");
		setAppName(params.get("appName") || "");
		setUrl(params.get("url") || "https://example.com");
		setCallbackUrls([
			params.get("callbackUrl1") || "",
			params.get("callbackUrl2") || "",
			params.get("callbackUrl3") || "",
		]);
		setWebhookUrl(params.get("webhookUrl") || "");
	}, []);
	const target = `https://github.com/organizations/${organization}/settings/apps/new?state=newlycreated`;
	return (
		<div className="bf-container">
			<h1>GitHub App Creator</h1>
			<form action={target} method="post">
				<fieldset>
					<label htmlFor="organization">Organization name:</label>
					<input
						id="organization"
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

					<label htmlFor="appName">GitHub App name:</label>
					<input
						id="appName"
						type="text"
						required
						placeholder="e.g. My GitHub App"
						value={appName}
						onChange={(e) => {
							setAppName(e.target.value);
						}}
					/>

					<label htmlFor="url">URL:</label>
					<input
						id="url"
						type="url"
						required
						placeholder="e.g. https://example.com"
						value={url}
						onChange={(e) => {
							setUrl(e.target.value);
						}}
					/>

					<label htmlFor="callbackUrl1">Callback URL 1:</label>
					<input
						id="callbackUrl1"
						type="url"
						required
						placeholder="e.g. https://keycloak.example.com/realms/appthrust-console/broker/github/endpoint"
						value={callbackUrls[0]}
						onChange={(e) => {
							const newUrls = [...callbackUrls];
							newUrls[0] = e.target.value;
							setCallbackUrls(newUrls);
						}}
					/>

					<label htmlFor="callbackUrl2">Callback URL 2:</label>
					<input
						id="callbackUrl2"
						type="url"
						placeholder="e.g. https://keycloak.example.com/realms/appthrust-console/broker/github/endpoint"
						value={callbackUrls[1]}
						onChange={(e) => {
							const newUrls = [...callbackUrls];
							newUrls[1] = e.target.value;
							setCallbackUrls(newUrls);
						}}
					/>

					<label htmlFor="callbackUrl3">Callback URL 3:</label>
					<input
						id="callbackUrl3"
						type="url"
						placeholder="e.g. https://keycloak.example.com/realms/appthrust-console/broker/github/endpoint"
						value={callbackUrls[2]}
						onChange={(e) => {
							const newUrls = [...callbackUrls];
							newUrls[2] = e.target.value;
							setCallbackUrls(newUrls);
						}}
					/>

					<label htmlFor="webhookUrl">Webhook URL:</label>
					<input
						id="webhookUrl"
						type="url"
						placeholder="e.g. https://api.example.com/webhooks/github"
						value={webhookUrl}
						onChange={(e) => {
							setWebhookUrl(e.target.value);
						}}
					/>

					<details>
						<summary>Manifest</summary>
						<label htmlFor="manifest">Manifest</label>
						<textarea
							name="manifest"
							rows={30}
							value={JSON.stringify(
								manifest({
									name: appName,
									callbackUrls,
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
						<button type="submit">Submit</button>
					</div>
				</fieldset>
			</form>
		</div>
	);
}

// https://github.com/organizations/{organization_name}/settings/apps/new?webhook_active=true&contents=read&emails=read&events=push
function manifest({
	name,
	callbackUrls,
	webhookUrl,
	redirectUrl,
}: Readonly<{
	name: string;
	callbackUrls: string[];
	webhookUrl: string;
	redirectUrl: string;
}>) {
	return {
		name,
		url: "https://www.example.com",
		public: false,
		callback_urls: callbackUrls.filter((url) => url !== ""),
		hook_attributes: {
			url: webhookUrl || "https://example.com",
			active: !!webhookUrl,
		},
		default_permissions: {
			contents: "read",
			emails: "read",
		},
		default_events: ["push"],
		redirect_url: redirectUrl,
	};
}
