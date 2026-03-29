/**
 * VitaExpress — Dashboard Page
 * Design: Verdant Wellness — order history with status badges and stats cards
 */

import { useApp, type Order, type OrderStatus } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  ChefHat,
  Bike,
  Package,
  Trash2,
  UtensilsCrossed,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const STATUS_CONFIG: Record<OrderStatus, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  recebido: { label: "Recebido", icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50" },
  preparando: { label: "Preparando", icon: ChefHat, color: "text-amber-600", bg: "bg-amber-50" },
  a_caminho: { label: "A Caminho", icon: Bike, color: "text-purple-600", bg: "bg-purple-50" },
  entregue: { label: "Entregue", icon: Package, color: "text-green-600", bg: "bg-green-50" },
  cancelado: { label: "Cancelado", icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
};

function OrderCard({ order }: { order: Order }) {
  const { cancelOrder, PAYMENT_LABELS } = useApp();
  const [, navigate] = useLocation();
  const status = STATUS_CONFIG[order.status];
  const StatusIcon = status.icon;

  const handleCancel = () => {
    cancelOrder(order.id);
    toast.success("Pedido cancelado com sucesso");
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="vita-card p-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-mono text-xs text-muted-foreground mb-1">
            #{order.id.slice(-8).toUpperCase()}
          </p>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
        <span className={`vita-badge gap-1.5 ${status.bg} ${status.color}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          {status.label}
        </span>
      </div>

      {/* Items Preview */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((item) => (
            <img
              key={item.product.id}
              src={item.product.image}
              alt={item.product.name}
              className="w-10 h-10 rounded-lg object-cover border-2 border-white"
            />
          ))}
          {order.items.length > 3 && (
            <div className="w-10 h-10 rounded-lg bg-muted border-2 border-white flex items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground">+{order.items.length - 3}</span>
            </div>
          )}
        </div>
        <div className="ml-2">
          <p className="text-sm font-medium text-foreground">
            {order.items.map((i) => i.product.name).slice(0, 2).join(", ")}
            {order.items.length > 2 && ` e mais ${order.items.length - 2}`}
          </p>
          <p className="text-xs text-muted-foreground">
            {order.items.reduce((sum, i) => sum + i.quantity, 0)} itens
            {" · "}
            {PAYMENT_LABELS[order.paymentMethod]}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="font-bold text-lg text-primary" style={{ fontFamily: "'Fraunces', serif" }}>
          R$ {(order.total + 5).toFixed(2).replace(".", ",")}
        </span>
        <div className="flex items-center gap-2">
          {order.status === "recebido" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-lg h-8 text-destructive border-destructive/30 hover:bg-destructive/5">
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Cancelar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2" style={{ fontFamily: "'Fraunces', serif" }}>
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    Cancelar Pedido?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja cancelar este pedido? Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">Manter Pedido</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleCancel}
                    className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Sim, Cancelar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button
            size="sm"
            onClick={() => navigate(`/pedido-realizado/${order.id}`)}
            className="rounded-lg h-8 bg-primary text-primary-foreground"
          >
            Detalhes
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { orders, user } = useApp();
  const [, navigate] = useLocation();

  const userOrders = orders.filter((o) => o.userId === user?.id);
  const totalSpent = userOrders
    .filter((o) => o.status !== "cancelado")
    .reduce((sum, o) => sum + o.total + 5, 0);
  const completedOrders = userOrders.filter((o) => o.status === "entregue").length;
  const activeOrders = userOrders.filter((o) =>
    ["recebido", "preparando", "a_caminho"].includes(o.status)
  ).length;

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
            Meus Pedidos
          </h1>
          <p className="text-muted-foreground">
            Olá, <span className="font-semibold text-foreground">{user?.name.split(" ")[0]}</span>! Acompanhe seus pedidos aqui.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: ShoppingBag,
              label: "Total de Pedidos",
              value: userOrders.length,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              icon: CheckCircle2,
              label: "Entregues",
              value: completedOrders,
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              icon: Clock,
              label: "Em Andamento",
              value: activeOrders,
              color: "text-amber-600",
              bg: "bg-amber-50",
            },
            {
              icon: TrendingUp,
              label: "Total Gasto",
              value: `R$ ${totalSpent.toFixed(2).replace(".", ",")}`,
              color: "text-primary",
              bg: "bg-primary/10",
            },
          ].map((stat) => (
            <div key={stat.label} className="vita-card p-4">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className={`text-xl font-bold ${stat.color}`} style={{ fontFamily: "'Fraunces', serif" }}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Orders List */}
        {userOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-6">
              <UtensilsCrossed className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
              Nenhum pedido ainda
            </h2>
            <p className="text-muted-foreground mb-6">
              Que tal explorar nosso cardápio e fazer seu primeiro pedido?
            </p>
            <Button
              onClick={() => navigate("/cardapio")}
              className="rounded-xl bg-primary text-primary-foreground"
            >
              Ver Cardápio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="font-bold text-foreground text-lg" style={{ fontFamily: "'Fraunces', serif" }}>
              Histórico de Pedidos
            </h2>
            {userOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
