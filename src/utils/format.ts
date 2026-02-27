export function formatTHB(value: string | number) {
  const n = typeof value === "string" ? Number(value.replace(/,/g, "")) : value;
  if (Number.isNaN(n)) return String(value);
  return n.toLocaleString("th-TH");
}

(function runMiniTests() {
  try {
    console.assert(formatTHB("1249000") === "1,249,000", "formatTHB should format numeric strings");
    console.assert(formatTHB("1,249,000") === "1,249,000", "formatTHB should tolerate commas");
    console.assert(formatTHB(1397000) === "1,397,000", "formatTHB should format numbers");
    console.assert(formatTHB("abc") === "abc", "formatTHB should passthrough non-numeric");
  } catch {
    // ignore
  }
})();
