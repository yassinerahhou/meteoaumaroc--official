/**
 * The only AdSense publisher identity authorised to sell inventory on this site.
 * Keep this value aligned with the publisher ID shown in the AdSense account.
 */
export const ADSENSE_CLIENT = "ca-pub-2525554321266874";
export const ADSENSE_PUBLISHER_ID = ADSENSE_CLIENT.replace("ca-", "");

// Keep ad requests off until AdSense approves the site and real slot IDs replace
// the placeholder values currently present in the page templates.
export const ADSENSE_ENABLED =
  process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
