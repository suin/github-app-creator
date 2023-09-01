export const dynamic = "force-dynamic";

export default async function RedirectPage({
  searchParams,
}: {
  searchParams: { code: string; state: string };
}) {
  const { code } = searchParams;
  const res = await fetch(
    `https://api.github.com/app-manifests/${code}/conversions`,
    {
      method: "POST",
      cache: "no-cache",
    },
  );
  const data = await res.json();
  const { id, name, slug, client_id, webhook_secret, pem, client_secret } =
    data;
  return (
    <div className="bf-container">
      <h1>GitHub App Created: {name}</h1>
      <fieldset>
        <label>ID:</label>
        <input type="text" value={id} readOnly />
        <label>Slug:</label>
        <input type="text" value={slug} readOnly />
        <label>Client ID:</label>
        <input type="text" value={client_id} readOnly />
        <label>Client Secret:</label>
        <input type="text" value={client_secret} readOnly />
        <label>Webhook Secret:</label>
        <input type="text" value={webhook_secret} readOnly />
        <label>PEM:</label>
        <textarea value={pem} readOnly rows={20} />
      </fieldset>
    </div>
  );
}
