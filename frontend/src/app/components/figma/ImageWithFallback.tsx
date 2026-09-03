import React, { useState } from "react";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW5lPSJyb3VuZCIgb3BhY2l0eT0iLjMiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMy43Ij48cmVjdCB4PSIxNiIgeT0iMTYiIHdpZHRoPSI1NiIgaGVpZ2h0PSI1NiIgcng9IjYiLz48cGF0aCBkPSJtMTYgNTggMTYtMTggMzIgMzIiLz48Y2lyY2xlIGN4PSI1MyIgY3k9IjM1IiByPSI3Ii8+PC9zdmc+Cg==";

export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const [didError, setDidError] = useState(false);

  const { src, alt, style, className, ...rest } = props;

  // URL de Railway donde están las imágenes.
  // Esta variable NO lleva /api
  const picturesUrl = import.meta.env.VITE_API_PICTURES_KEY || "";

  let finalSrc = src;

  // Si la imagen viene como:
  // /uploads/nombre-imagen.jpg
  //
  // se convierte en:
  // https://proyectoproductivo-production.up.railway.app/uploads/nombre-imagen.jpg
  if (src && src.startsWith("/uploads")) {
    finalSrc = `${picturesUrl}${src}`;
  }

  // Si todavía existe alguna imagen guardada con localhost,
  // reemplazamos localhost por Railway.
  else if (src && src.includes("localhost:3000")) {
    finalSrc = src.replace("http://localhost:3000", picturesUrl);
  }

  // Imagen de reemplazo si ocurre un error
  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${
          className ?? ""
        }`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={ERROR_IMG_SRC}
            alt="Error loading image"
            {...rest}
            data-original-url={src}
          />
        </div>
      </div>
    );
  }

  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={() => setDidError(true)}
    />
  );
}
