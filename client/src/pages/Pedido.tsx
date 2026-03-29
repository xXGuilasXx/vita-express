/**
 * VitaExpress — Pedido Page (Checkout)
 * Design: Verdant Wellness — clean checkout with payment selection and order summary
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { useApp, type PaymentMethod } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  CreditCard,
  Banknote,
  Smartphone,
  ChevronRight,
  MapPin,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Link } from "wouter";

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; icon: React.ElementType; description: string }[] = [
  { id: "pix", label: "PIX", icon: Smartphone, description: "Pagamento instantâneo" },
  { id: "cartao_credito", label: "Cartão de Crédito", icon: CreditCard, description: "Em até 12x sem juros" },
  { id: "cartao_debito", label: "Cartão de Débito", icon: CreditCard, description: "Débito à vista" },
  { id: "dinheiro", label: "Dinheiro", icon: Banknote, description: "Troco se necessário" },
];

export default function Pedido() {
  const [, navigate] = useLocation();
  const { cart, cartTotal, user, placeOrder } = useApp();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [address, setAddress] = useState(user?.address || "");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const deliveryFee = 5.00;
  const total = cartTotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
            Carrinho vazio
          </h2>
          <p className="text-muted-foreground mb-6">
            Adicione itens ao carrinho antes de finalizar o pedido
          </p>
          <Link href="/cardapio">
            <Button className="rounded-xl bg-primary text-primary-foreground">
              Ver Cardápio
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPayment) {
      toast.error("Selecione uma forma de pagamento");
      return;
    }
    if (!address.trim()) {
      toast.error("Informe o endereço de entrega");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // Simulate processing

    const order = placeOrder(selectedPayment, address, notes);
    setLoading(false);

    if (order) {
      navigate(`/pedido-realizado/${order.id}`);
    } else {
      toast.error("Erro ao realizar pedido. Tente novamente.");
    }
  };

  return (
    <Layout>
      <div className="container py-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cardapio">
            <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>
              Finalizar Pedido
            </h1>
            <p className="text-muted-foreground text-sm">
              {cart.length} {cart.length === 1 ? "item" : "itens"} no carrinho
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left: Checkout Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Delivery Address */}
              <div className="vita-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-bold text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>
                    Endereço de Entrega
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço completo *</Label>
                    <Input
                      id="address"
                      placeholder="Rua, número, bairro, cidade"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="h-11 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações (opcional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Complemento, ponto de referência, instruções especiais..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="rounded-xl resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="vita-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-bold text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>
                    Forma de Pagamento
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAYMENT_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedPayment(option.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedPayment === option.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40 hover:bg-muted/50"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        selectedPayment === option.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                      }`}>
                        <option.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{option.label}</p>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </div>
                      {selectedPayment === option.id && (
                        <CheckCircle2 className="w-5 h-5 text-primary ml-auto flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-2">
              <div className="vita-card p-6 sticky top-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-bold text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>
                    Resumo do Pedido
                  </h2>
                </div>

                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-foreground flex-shrink-0">
                        R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">R$ {cartTotal.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de entrega</span>
                    <span className="font-medium">R$ {deliveryFee.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                    <span style={{ fontFamily: "'Fraunces', serif" }}>Total</span>
                    <span className="text-primary" style={{ fontFamily: "'Fraunces', serif" }}>
                      R$ {total.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !selectedPayment || !address.trim()}
                  className="w-full h-12 mt-6 rounded-xl bg-primary text-primary-foreground font-semibold text-base disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Confirmar Pedido
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>

                {!selectedPayment && (
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Selecione uma forma de pagamento para continuar
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
