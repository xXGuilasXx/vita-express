/**
 * VitaExpress — Layout Component
 * Design: Verdant Wellness — top nav with floating mobile bottom nav
 */

import { Link, useLocation } from "wouter";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Leaf,
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard,
  UtensilsCrossed,
  Home,
  Trash2,
  Plus,
  Minus,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location, navigate] = useLocation();
  const { user, logout, cart, cartTotal, cartCount, removeFromCart, updateCartQuantity } = useApp();
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Até logo!");
    navigate("/login");
  };

  const navLinks = [
    { href: "/cardapio", label: "Cardápio", icon: UtensilsCrossed },
    { href: "/dashboard", label: "Meus Pedidos", icon: LayoutDashboard },
    { href: "/perfil", label: "Perfil", icon: User },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/cardapio">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span
                className="text-primary font-bold text-xl hidden sm:block"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                VitaExpress
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </button>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative rounded-xl h-10 w-10">
                  <ShoppingCart className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2" style={{ fontFamily: "'Fraunces', serif" }}>
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    Seu Carrinho
                    {cartCount > 0 && (
                      <span className="text-sm font-normal text-muted-foreground">
                        ({cartCount} {cartCount === 1 ? "item" : "itens"})
                      </span>
                    )}
                  </SheetTitle>
                </SheetHeader>

                {cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center">
                      <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Carrinho vazio</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Adicione itens do cardápio para começar
                      </p>
                    </div>
                    <Button
                      onClick={() => { setCartOpen(false); navigate("/cardapio"); }}
                      className="rounded-xl bg-primary text-primary-foreground"
                    >
                      Ver Cardápio
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto space-y-3 py-4">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex gap-3 p-3 bg-muted/50 rounded-xl">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-foreground truncate">
                              {item.product.name}
                            </p>
                            <p className="text-primary font-bold text-sm mt-0.5">
                              R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-lg bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-lg bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="ml-auto w-7 h-7 rounded-lg text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-bold text-lg text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>
                          R$ {cartTotal.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                      <Button
                        className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold"
                        onClick={() => { setCartOpen(false); navigate("/pedido"); }}
                      >
                        Finalizar Pedido
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-xl h-10 gap-2 hidden sm:flex">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium max-w-24 truncate">
                    {user?.name.split(" ")[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl">
                <DropdownMenuItem onClick={() => navigate("/perfil")} className="rounded-lg">
                  <User className="w-4 h-4 mr-2" />
                  Meu Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard")} className="rounded-lg">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Meus Pedidos
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="rounded-lg text-destructive focus:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="bg-white/90 backdrop-blur-md border border-border rounded-2xl shadow-lg px-2 py-2 flex items-center justify-around">
          <Link href="/cardapio">
            <button className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
              location === "/cardapio" ? "bg-primary/10 text-primary" : "text-muted-foreground"
            }`}>
              <UtensilsCrossed className="w-5 h-5" />
              <span className="text-xs font-medium">Cardápio</span>
            </button>
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-muted-foreground relative"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs font-medium">Carrinho</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <Link href="/dashboard">
            <button className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
              location === "/dashboard" ? "bg-primary/10 text-primary" : "text-muted-foreground"
            }`}>
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-xs font-medium">Pedidos</span>
            </button>
          </Link>
          <Link href="/perfil">
            <button className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
              location === "/perfil" ? "bg-primary/10 text-primary" : "text-muted-foreground"
            }`}>
              <User className="w-5 h-5" />
              <span className="text-xs font-medium">Perfil</span>
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
