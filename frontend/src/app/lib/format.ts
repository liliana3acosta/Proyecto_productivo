export function formatearPrecio(precio: number): string {
  return precio.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
