export function num(value, decimals = 2) {
  if (typeof value !== "number" || isNaN(value)) return "-";
  return value.toFixed(decimals);
}

export function pct(value) {
  if (typeof value !== "number" || isNaN(value)) return "-";
  return `${value.toFixed(1)}%`;
}
