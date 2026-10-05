const BASE = "EUR";

export function getCurrency() {
  return localStorage.getItem("currency") || BASE;
}

export function setCurrency(cur) {
  if (!["EUR", "USD", "GBP"].includes(cur)) {
    cur = BASE;
  }

  localStorage.setItem("currency", cur);
  document.dispatchEvent(new Event("currency-change"));
}

export function convert(eur) {
  const amount = Number(eur) || 0;
  const cur = getCurrency();

  if (cur === "EUR") return `€${Math.round(amount)}`;
  if (cur === "USD") return `$${Math.round(amount * 1.10)}`;
  if (cur === "GBP") return `£${Math.round(amount * 0.85)}`;

  return `€${Math.round(amount)}`;
}