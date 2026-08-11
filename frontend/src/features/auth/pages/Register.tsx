import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

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
      await register({ email, password });
      navigate("/login");
    } catch {
      setError("No se pudo registrar el usuario");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-background text-on-surface font-body min-h-screen flex flex-col selection:bg-brand-emerald selection:text-surface">
      <main className="flex-grow flex flex-col md:flex-row w-full">
        {/* Left Column: Context & Branding */}
        <section className="w-full md:w-1/2 bg-brand-dark p-8 md:p-16 flex flex-col justify-center relative overflow-hidden hidden md:flex">
          {/* Decorative Elements */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-emerald opacity-[0.03] blur-3xl"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary opacity-[0.02] blur-3xl"></div>

          <div className="relative z-10 max-w-lg mx-auto w-full">
            <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              TIKO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-primary text-3xl">
                Sabueso de las Noticias Falsas
              </span>
            </h1>
            <p className="text-on-surface-variant text-lg mb-12 font-body max-w-md">
              Únete a la plataforma de análisis y verificación. Ayúdanos a proteger el ecosistema informativo.
            </p>
          </div>
        </section>

        {/* Right Column: Register Form */}
        <section className="w-full md:w-1/2 bg-brand-surface p-8 md:p-16 flex flex-col justify-center items-center relative">
          <div className="w-full max-w-md">
            <div className="glass-panel rounded-2xl p-8 md:p-10 shadow-2xl relative z-10">
              {/* Header */}
              <div className="flex flex-col items-center mb-10 text-center">
                <div className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center mb-6 p-2 border border-brand-emerald/30 shadow-[0_0_15px_rgba(16,185,129,0.3)] text-4xl">
                  🐶
                </div>
                <h2 className="font-headline text-3xl font-bold text-white mb-2">
                  Crear cuenta
                </h2>
                <p className="font-body text-on-surface-variant text-sm">
                  TIKO AI System
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <button
                  type="submit"
                  disabled={loading}
                  className="shimmer-btn w-full bg-gradient-to-r from-brand-emerald to-primary hover:from-primary hover:to-brand-emerald text-surface-container-lowest font-headline font-bold py-4 rounded-lg shadow-lg hover:shadow-brand-emerald/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <span>{loading ? "Procesando..." : "Registrarse"}</span>
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm font-label text-on-surface-variant">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                    to="/login"
                    className="text-brand-emerald font-semibold hover:underline"
                  >
                    Ingresar
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
