import Script from "next/script";

export function Analytics() {
  const beacon = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
  if (!beacon) return null;

  return (
    <Script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={`{"token":"${beacon}"}`}
    />
  );
}
