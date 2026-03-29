/**
 * VitaExpress — Login Page
 * Design: Verdant Wellness — asymmetric layout, left panel with food image, right with form
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Leaf, ArrowRight } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663489084205/UvKr6qSHGGsL9eLKZPKe9u/hero-banner-Aw8eYbgx26NDF9PgNPGzX5.webp";

export default function Login() {
  const [, navigate] = useLocation();
  const { login, register } = useApp();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast.error("Preencha todos os campos");
      return;
    }
    const ok = login(loginForm.email, loginForm.password);
    if (ok) {
      toast.success("Bem-vindo de volta!");
      navigate("/cardapio");
    } else {
      toast.error("E-mail ou senha incorretos");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    if (registerForm.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    const ok = register({
      name: registerForm.name,
      email: registerForm.email,
      phone: registerForm.phone,
      address: registerForm.address,
      password: registerForm.password,
    });
    if (ok) {
      toast.success("Conta criada com sucesso! Bem-vindo ao VitaExpress!");
      navigate("/cardapio");
    } else {
      toast.error("Este e-mail já está cadastrado");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Food Image Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Alimentos saudáveis"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/40" />
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <span className="text-white font-bold text-2xl" style={{ fontFamily: "'Fraunces', serif" }}>
              VitaExpress
            </span>
          </div>

          {/* Tagline */}
          <div>
            <h1
              className="text-white text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Saúde e sabor
              <br />
              <em>na sua porta</em>
            </h1>
            <p className="text-white/80 text-lg max-w-sm">
              Refeições saudáveis preparadas com ingredientes frescos e naturais,
              entregues com rapidez e cuidado.
            </p>
            <div className="flex gap-6 mt-8">
              {[
                { value: "100%", label: "Natural" },
                { value: "30min", label: "Entrega" },
                { value: "8+", label: "Opções" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-white text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Form Panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 bg-background">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-primary font-bold text-xl" style={{ fontFamily: "'Fraunces', serif" }}>
            VitaExpress
          </span>
        </div>

        <div className="max-w-md w-full mx-auto">
          {/* Tab Switcher */}
          <div className="flex bg-muted rounded-xl p-1 mb-8">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === "login"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === "register"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Criar Conta
            </button>
          </div>

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-5 animate-fade-up">
              <div>
                <h2
                  className="text-3xl font-bold text-foreground mb-1"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Bem-vindo de volta
                </h2>
                <p className="text-muted-foreground text-sm">
                  Entre na sua conta para fazer pedidos
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="h-12 rounded-xl pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-semibold text-base"
              >
                Entrar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Não tem conta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="text-primary font-semibold hover:underline"
                >
                  Cadastre-se grátis
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4 animate-fade-up">
              <div>
                <h2
                  className="text-3xl font-bold text-foreground mb-1"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Criar sua conta
                </h2>
                <p className="text-muted-foreground text-sm">
                  Junte-se a nós e comece a comer melhor
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Nome completo *</Label>
                  <Input
                    id="reg-name"
                    placeholder="João da Silva"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-email">E-mail *</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-phone">Telefone</Label>
                  <Input
                    id="reg-phone"
                    placeholder="(47) 99999-9999"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-address">Endereço de entrega</Label>
                  <Input
                    id="reg-address"
                    placeholder="Rua das Flores, 123 — Bairro"
                    value={registerForm.address}
                    onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password">Senha *</Label>
                  <div className="relative">
                    <Input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      className="h-11 rounded-xl pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-confirm">Confirmar senha *</Label>
                  <Input
                    id="reg-confirm"
                    type="password"
                    placeholder="Repita a senha"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-semibold text-base"
              >
                Criar Conta
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Já tem conta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-primary font-semibold hover:underline"
                >
                  Entrar
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
