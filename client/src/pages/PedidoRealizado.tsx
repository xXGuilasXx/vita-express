/**
 * VitaExpress — PedidoRealizado Page
 * Design: Verdant Wellness — success state with order tracking progress
 */

import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { useApp, type OrderStatus } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ChefHat,
  Bike,
  Package,
  UtensilsCrossed,
  ArrowRight,
  Clock,
  MapPin,
  CreditCard,
} from "lucide-react";

const STATUS_STEPS: { status: OrderStatus; label: string; icon: React.ElementType; description: string }[] = [
  { status: "recebido", label: "Pedido Recebido", icon: CheckCircle2, description: "Seu pedido foi confirmado" },
  { status: "preparando", label: "Preparando", icon: ChefHat, description: "Nossa equipe está preparando" },
  { status: "a_caminho", label: "A Caminho", icon: Bike, description: "Saiu para entrega" },
  { status: "entregue", label: "Entregue", icon: Package, description: "Aproveite sua refeição!" },
];

const STATUS_ORDER: OrderStatus[] = ["recebido", "preparando", "a_caminho", "entregue"];

export default function PedidoRealizado() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { orders, PAYMENT_LABELS } = useApp();
  const [currentStatusIdx, setCurrentStatusIdx] = useState(0);

  const order = orders.find((o) => o.id === params.id);

  // Simulate order progression for demo
  useEffect(() => {
    if (!order) return;
    const baseIdx = STATUS_ORDER.indexOf(order.status);
    setCurrentStatusIdx(baseIdx);

    // Auto-advance for demo purposes
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (baseIdx < 3) {
      timers.push(setTimeout(() => setCurrentStatusIdx(1), 3000));
      timers.push(setTimeout(() => setCurrentStatusIdx(2), 8000));
      timers.push(setTimeout(() => setCurrentStatusIdx(3), 15000));
    }
    return () => timers.forEach(clearTimeout);
  }, [order]);

  if (!order) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Pedido não encontrado</p>
          <Button onClick={() => navigate("/cardapio")} className="mt-4 rounded-xl">
            Voltar ao Cardápio
          </Button>
        </div>
      </Layout>
    );
  }

  const currentStatus = STATUS_STEPS[currentStatusIdx];

  return (
    <Layout>
      <div className="container py-8 max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-10 animate-fade-up">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1
            className="text-3xl font-bold text-foreground mb-2"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Pedido Confirmado!
          </h1>
          <p className="text-muted-foreground">
            Pedido <span className="font-mono font-semibold text-foreground">#{order.id.slice(-8).toUpperCase()}</span>
          </p>
        </div>

        {/* Status Tracker */}
        <div className="vita-card p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>
                Acompanhe seu Pedido
              </h2>
              <p className="text-sm text-muted-foreground">
                Status atual: <span className="font-semibold text-primary">{currentStatus.label}</span>
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border" />
            <div
              className="absolute left-5 top-5 w-0.5 bg-primary transition-all duration-1000"
              style={{ height: `${(currentStatusIdx / (STATUS_STEPS.length - 1)) * 100}%` }}
            />

            <div className="space-y-6">
              {STATUS_STEPS.map((step, idx) => {
                const isCompleted = idx <= currentStatusIdx;
                const isCurrent = idx === currentStatusIdx;
                return (
                  <div key={step.status} className="flex items-start gap-4 relative">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 z-10 transition-all duration-500 ${
                        isCompleted
                          ? "bg-primary text-white shadow-sm"
                          : "bg-muted text-muted-foreground"
                      } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div className="pt-1.5">
                      <p className={`font-semibold text-sm ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                          Em andamento
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="vita-card p-6 mb-6">
          <h2 className="font-bold text-foreground mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
            Detalhes do Pedido
          </h2>

          <div className="space-y-3 mb-4">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                </div>
                <span className="text-sm font-semibold">
                  R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{order.address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="w-4 h-4 flex-shrink-0" />
              <span>{PAYMENT_LABELS[order.paymentMethod]}</span>
            </div>
            {order.notes && (
              <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 mt-2">
                <span className="font-medium text-foreground">Obs: </span>
                {order.notes}
              </div>
            )}
            <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
              <span style={{ fontFamily: "'Fraunces', serif" }}>Total pago</span>
              <span className="text-primary" style={{ fontFamily: "'Fraunces', serif" }}>
                R$ {(order.total + 5).toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="flex-1 h-12 rounded-xl border-2"
          >
            Ver Meus Pedidos
          </Button>
          <Button
            onClick={() => navigate("/cardapio")}
            className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground font-semibold"
          >
            Novo Pedido
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Layout>
  );
}
