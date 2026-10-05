import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router";

// Evita que el navegador restaure la posición de scroll al recargar o devolverse
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  // Refuerzo: algunas páginas cargan contenido después (productos desde la API)
  useEffect(() => {
    const t = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
