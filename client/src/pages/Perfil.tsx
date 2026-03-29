/**
 * VitaExpress — Perfil Page
 * Design: Verdant Wellness — clean profile editor with account stats
 */

import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  LogOut,
  ShoppingBag,
  Calendar,
  Edit3,
} from "lucide-react";
import { useLocation } from "wouter";

export default function Perfil() {
  const { user, updateProfile, logout, orders } = useApp();
  const [, navigate] = useLocation();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const userOrders = orders.filter((o) => o.userId === user?.id);
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
    : "—";

  const handleSave = () => {
    if (!form.name || !form.email) {
      toast.error("Nome e e-mail são obrigatórios");
      return;
    }
    updateProfile(form);
    setEditing(false);
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleLogout = () => {
    logout();
    toast.success("Até logo!");
    navigate("/login");
  };

  return (
    <Layout>
      <div className="container py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
            Meu Perfil
          </h1>
          <p className="text-muted-foreground">Gerencie suas informações pessoais</p>
        </div>

        {/* Avatar + Stats */}
        <div className="vita-card p-6 mb-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>
                {user?.name}
              </h2>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <ShoppingBag className="w-4 h-4" />
                  <span>{userOrders.length} pedidos</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Desde {memberSince}</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditing(!editing)}
              className="rounded-xl flex-shrink-0"
            >
              <Edit3 className="w-4 h-4 mr-1.5" />
              {editing ? "Cancelar" : "Editar"}
            </Button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="vita-card p-6 mb-6">
          <h2 className="font-bold text-foreground mb-5" style={{ fontFamily: "'Fraunces', serif" }}>
            Informações Pessoais
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Nome completo
              </Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={!editing}
                className="h-11 rounded-xl disabled:opacity-60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={!editing}
                className="h-11 rounded-xl disabled:opacity-60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Telefone
              </Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                disabled={!editing}
                placeholder="(47) 99999-9999"
                className="h-11 rounded-xl disabled:opacity-60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                Endereço de entrega
              </Label>
              <Input
                id="address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                disabled={!editing}
                placeholder="Rua das Flores, 123 — Bairro"
                className="h-11 rounded-xl disabled:opacity-60"
              />
            </div>

            {editing && (
              <Button
                onClick={handleSave}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold mt-2"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="vita-card p-6 border-destructive/20">
          <h2 className="font-bold text-foreground mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
            Conta
          </h2>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full h-11 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/5"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair da Conta
          </Button>
        </div>
      </div>
    </Layout>
  );
}
