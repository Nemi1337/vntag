const BASE = "EUR";

export function getCurrency() {
  return localStorage.getItem("currency") || BASE;
}

export function setCurrency(cur) {
  localStorage.setItem("currency", cur);
  document.dispatchEvent(new Event("currency-change"));
}

export function convert(eur) {
  const cur = getCurrency();

  if (cur === "EUR") return `€${eur}`;

  if (cur === "USD") return `$${Math.round(eur * 1.1)}`;
  if (cur === "GBP") return `£${Math.round(eur * 0.85)}`;
}
