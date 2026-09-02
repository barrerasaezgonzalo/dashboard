"use client";
import { LogIn, History } from "lucide-react";
import React, { useState } from "react";
export default function Page() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answer, setAnswer] = useState<string>("");
  const totalSteps: number = 6;

  const handleNext = (): void => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev: number) => prev + 1);
      setAnswer("");
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.6]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=2000&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-md p-4 md:px-4 md:py-4  shadow-2xl border border-white/50 flex flex-col gap-6">
        <div className="absolute right-5 top-5 flex items-center gap-3 text-sm">
          <button
            type="button"
            className="flex items-center gap-1 text-neutral-500 transition hover:text-neutral-700"
          >
            <History size={15} />
            Historial
          </button>

          <button
            type="button"
            className="flex items-center gap-1 text-emerald-700 transition hover:text-emerald-800"
          >
            <LogIn size={15} />
            Iniciar sesión
          </button>
        </div>
        <header className="flex flex-col items-center text-center gap-3 mt-4">
          <div className="w-40 h-30 flex items-center justify-center ">
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 48 48"
              xmlSpace="preserve"
            >
              <g>
                <path
                  style={{ fill: "#3D3C38" }}
                  d="M12.379,23.42c5.151,0,9.589,3.073,11.604,7.478c2.015-4.405,6.452-7.478,11.604-7.478h0.438		c0.497-3.181-0.44-6.462-2.925-8.983l0,0l-4.815,3.82c-2.237,1.774-3.673,4.038-4.303,6.415c-0.63-2.377-2.066-4.641-4.303-6.415		l-4.815-3.82l0,0c-2.485,2.521-3.422,5.802-2.925,8.983H12.379z"
                />
                <g>
                  <g>
                    <path
                      style={{ fill: "#FF612B" }}
                      d="M23.997,21.559c0.86-1.581,2.063-3.001,3.561-4.193c-0.756-2.023-1.934-3.924-3.561-5.55				c-1.627,1.626-2.804,3.528-3.56,5.55C21.934,18.558,23.136,19.978,23.997,21.559z"
                    />
                  </g>
                  <g>
                    <path
                      style={{ fill: "#FF612B" }}
                      d="M12.393,24.58h-7.89c0,6.408,5.195,11.604,11.604,11.604h7.89				C23.997,29.775,18.801,24.58,12.393,24.58z"
                    />
                  </g>
                  <g>
                    <path
                      style={{ fill: "#FF612B" }}
                      d="M35.601,24.58c-6.409,0-11.604,5.195-11.604,11.604h7.89c6.409,0,11.604-5.196,11.604-11.604				H35.601z"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </div>

          <p className="text-xs md:text-sm font-semibold text-neutral-500 max-w-xl leading-relaxed">
            Un espacio sagrado para pausar y conectar contigo. Responde con
            calma para diseñar tu ruta de bienestar personalizada.
          </p>
          <p className="text-xs md:text-sm font-semibold text-neutral-400 max-w-xl leading-relaxed">
            Responde con libertad. No hay respuestas incorrectas. Te haremos 6
            preguntas breves para conocerte mejor. Desde la tercera respuesta
            podrás generar tu plan, o continuar hasta completar las 6 para
            obtener uno más personalizado.
          </p>

          <div className="inline-flex items-center px-4 py-1 bg-emerald-800/10 text-emerald-800 text-xs tracking-wider mt-1 shadow-sm">
            <span>
              pregunta {currentStep} de {totalSteps}
            </span>
          </div>
        </header>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg md:text-xl text-center font-semibold text-emerald-800 leading-snug">
            Describe tu principal intención de bienestar para este ciclo.
          </h2>

          <textarea
            rows={5}
            value={answer}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setAnswer(e.target.value)
            }
            placeholder="Permítete fluir y escribe tus pensamientos aquí..."
            className="w-full p-4 bg-white border border-neutral-800/20 focus:outline-none text-neutral-500 placeholder:text-neutral-400 text-sm resize-none transition-all shadow-inner"
          />
        </section>

        <footer className="flex items-center justify-between pt-2">
          {/* <button
                        type="button"
                        disabled={true}
                        className="px-6 py-3  text-xs font-normal tracking-wider uppercase bg-neutral-400 text-white cursor-not-allowed transition-all"
                    >
                        Generar plan
                    </button> */}

          <button
            type="button"
            onClick={handleNext}
            className="ml-auto px-6 py-3 text-xs font-normal tracking-wider uppercase bg-emerald-600 text-white hover:bg-emerald-800 transition-all shadow-md"
          >
            {currentStep === totalSteps ? "Finalizar" : "Siguiente pregunta"}
          </button>
        </footer>
      </div>
    </main>
  );
}
