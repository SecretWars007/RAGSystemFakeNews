import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      setToken(response.access_token);
      navigate("/dashboard");
    } catch {
      setError("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-background text-on-surface font-body min-h-screen flex flex-col selection:bg-brand-emerald selection:text-surface">
      <main className="flex-grow flex flex-col md:flex-row w-full">
        {/* Left Column: Context & Branding */}
        <section className="w-full md:w-1/2 bg-brand-dark p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-emerald opacity-[0.03] blur-3xl"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary opacity-[0.02] blur-3xl"></div>

          <div className="relative z-10 max-w-lg mx-auto w-full">
            <div className="w-full h-64 md:h-80 mb-8 block">
              <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient cx="50%" cy="50%" id="nodeGradient" r="50%">
                    <stop offset="0%" stopColor="#52B788"></stop>
                    <stop
                      offset="100%"
                      stopColor="#2D6A4F"
                      stopOpacity="0"
                    ></stop>
                  </radialGradient>
                </defs>
                {/* Connections */}
                <g opacity="0.3" stroke="#52B788" strokeWidth="0.5">
                  <line x1="200" x2="400" y1="150" y2="300">
                    <animate
                      attributeName="opacity"
                      dur="4s"
                      repeatCount="indefinite"
                      values="0.1;0.5;0.1"
                    ></animate>
                  </line>
                  <line x1="200" x2="400" y1="450" y2="300">
                    <animate
                      attributeName="opacity"
                      dur="3.5s"
                      repeatCount="indefinite"
                      values="0.1;0.5;0.1"
                    ></animate>
                  </line>
                  <line x1="600" x2="400" y1="150" y2="300">
                    <animate
                      attributeName="opacity"
                      dur="5s"
                      repeatCount="indefinite"
                      values="0.1;0.5;0.1"
                    ></animate>
                  </line>
                  <line x1="600" x2="400" y1="450" y2="300">
                    <animate
                      attributeName="opacity"
                      dur="4.5s"
                      repeatCount="indefinite"
                      values="0.1;0.5;0.1"
                    ></animate>
                  </line>
                  <line x1="200" x2="200" y1="150" y2="450">
                    <animate
                      attributeName="opacity"
                      dur="6s"
                      repeatCount="indefinite"
                      values="0.1;0.4;0.1"
                    ></animate>
                  </line>
                  <line x1="600" x2="600" y1="150" y2="450">
                    <animate
                      attributeName="opacity"
                      dur="5.5s"
                      repeatCount="indefinite"
                      values="0.1;0.4;0.1"
                    ></animate>
                  </line>
                </g>
                {/* Nodes */}
                <g>
                  <circle cx="400" cy="300" fill="url(#nodeGradient)" r="10">
                    <animate
                      attributeName="r"
                      dur="3s"
                      repeatCount="indefinite"
                      values="8;12;8"
                    ></animate>
                  </circle>
                  <circle cx="200" cy="150" fill="#52B788" r="6">
                    <animate
                      attributeName="cy"
                      dur="4s"
                      repeatCount="indefinite"
                      values="140;160;140"
                    ></animate>
                  </circle>
                  <circle cx="200" cy="450" fill="#52B788" r="6">
                    <animate
                      attributeName="cy"
                      dur="5s"
                      repeatCount="indefinite"
                      values="440;460;440"
                    ></animate>
                  </circle>
                  <circle cx="600" cy="150" fill="#52B788" r="6">
                    <animate
                      attributeName="cy"
                      dur="4.5s"
                      repeatCount="indefinite"
                      values="160;140;160"
                    ></animate>
                  </circle>
                  <circle cx="600" cy="450" fill="#52B788" r="6">
                    <animate
                      attributeName="cy"
                      dur="3.5s"
                      repeatCount="indefinite"
                      values="460;440;460"
                    ></animate>
                  </circle>
                </g>
                {/* Pulsing Data Signals */}
                <circle fill="#fff" r="3">
                  <animateMotion
                    dur="4s"
                    path="M200,150 L400,300"
                    repeatCount="indefinite"
                  ></animateMotion>
                  <animate
                    attributeName="opacity"
                    dur="4s"
                    repeatCount="indefinite"
                    values="0;1;0"
                  ></animate>
                </circle>
                <circle fill="#fff" r="3">
                  <animateMotion
                    dur="5s"
                    path="M600,450 L400,300"
                    repeatCount="indefinite"
                  ></animateMotion>
                  <animate
                    attributeName="opacity"
                    dur="5s"
                    repeatCount="indefinite"
                    values="0;1;0"
                  ></animate>
                </circle>
              </svg>
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Inteligencia Artificial contra la{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-primary">
                Desinformación
              </span>{" "}
              en Bolivia
            </h1>
            <p className="text-on-surface-variant text-lg mb-12 font-body max-w-md">
              Analizamos, verificamos y protegemos el ecosistema informativo
              utilizando modelos neuronales avanzados.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="floating-card glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <span
                  className="material-symbols-outlined text-brand-emerald mb-2 text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span className="text-2xl font-headline font-bold text-white mb-1">
                  301
                </span>
                <span className="text-xs font-label text-on-surface-variant uppercase tracking-wider">
                  Noticias Verificadas
                </span>
              </div>
              <div className="floating-card glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <span
                  className="material-symbols-outlined text-brand-emerald mb-2 text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  source
                </span>
                <span className="text-2xl font-headline font-bold text-white mb-1">
                  2
                </span>
                <span className="text-xs font-label text-on-surface-variant uppercase tracking-wider">
                  Fuentes Confiables
                </span>
              </div>
              <div className="floating-card glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <span
                  className="material-symbols-outlined text-brand-emerald mb-2 text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  analytics
                </span>
                <span className="text-2xl font-headline font-bold text-white mb-1">
                  98%
                </span>
                <span className="text-xs font-label text-on-surface-variant uppercase tracking-wider">
                  Precisión
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Login Form */}
        <section className="w-full md:w-1/2 bg-brand-surface p-8 md:p-16 flex flex-col justify-center items-center relative">
          <div className="w-full max-w-md">
            <div className="glass-panel rounded-2xl p-8 md:p-10 shadow-2xl relative z-10">
              {/* Header */}
              <div className="flex flex-col items-center mb-10 text-center">
                <div className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center mb-6 p-2 border border-outline-variant shadow-lg text-4xl">
                  🧠
                </div>
                <h2 className="font-headline text-3xl font-bold text-white mb-2">
                  FakeNewsRAG System
                </h2>
                <p className="font-body text-on-surface-variant text-sm">
                  Verificación inteligente de noticias
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full bg-surface-container-high text-on-surface font-body rounded-lg px-4 pt-6 pb-2 border border-outline-variant focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-all outline-none placeholder-transparent"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-2 text-xs font-label text-on-surface-variant transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-emerald cursor-text"
                  >
                    Correo Electrónico
                  </label>
                </div>

                {/* Password Input */}
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer w-full bg-surface-container-high text-on-surface font-body rounded-lg px-4 pt-6 pb-2 border border-outline-variant focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-all outline-none placeholder-transparent"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4 top-2 text-xs font-label text-on-surface-variant transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-emerald cursor-text"
                  >
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-brand-emerald transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>

                {error && <p className="text-error text-sm mt-2">{error}</p>}

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-outline-variant bg-surface-container text-brand-emerald focus:ring-brand-emerald focus:ring-offset-surface cursor-pointer"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm font-label text-on-surface-variant cursor-pointer"
                    >
                      Recordarme
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-label text-brand-emerald hover:text-primary transition-colors"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="shimmer-btn w-full bg-gradient-to-r from-brand-emerald to-primary hover:from-primary hover:to-brand-emerald text-surface-container-lowest font-headline font-bold py-4 rounded-lg shadow-lg hover:shadow-brand-emerald/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <span>{loading ? "Procesando..." : "Ingresar"}</span>
                  {!loading && (
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  )}
                </button>
              </form>

              {/* Footer Link */}
              <div className="mt-8 text-center">
                <p className="text-sm font-label text-on-surface-variant">
                  ¿No tienes cuenta?{" "}
                  <Link
                    to="/register"
                    className="text-brand-emerald font-semibold hover:underline"
                  >
                    Crear cuenta
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
