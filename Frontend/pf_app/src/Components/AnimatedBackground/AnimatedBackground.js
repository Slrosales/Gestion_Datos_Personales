import {  useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";

const AnimatedBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    let isMounted = true;

    initParticlesEngine(async (engine) => {
      await loadAll(engine); // Carga slim para optimizar rendimiento
    }).then(() => {
      if (isMounted) {
        setInit(true);
      }
    });

    return () => {
      isMounted = false; // Cleanup para evitar fugas de memoria
    };
  }, []);

  return (
    init && (
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "#ffffff",
            },
          },
          fpsLimit: 60, // Limitar a 10 FPS
          particles: {
            color: {
              value: "#000000",
            },
            move: {
              enable: true,
              speed: 2, // Velocidad baja
             
            },
            number: {
              value: 40,
             
            },
            opacity: {
              value: 0.6,
            },
            shape: {
              type: "char", // Tipo de partícula es "char" para usar caracteres
              options: {
                char: {
                  value: [
                    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
                  ],
                  font: "Noto Sans", // Fuente de los caracteres
                  style: "", // Estilo de los caracteres
                  weight: "400", // Peso de los caracteres
                  fill: true, // Rellenar los caracteres
                },
                
              },
            
            },
            size: {
              value: { min: 5, max: 10 },
            },
          },
          detectRetina: false,
          interactivity: {
            events: {
              onHover: { enable: false }, // Desactivar interacciones
              onClick: { enable: false },
            },
          },
        }}
      />
    )
  );
};

export default AnimatedBackground;
