/**
 * VitaExpress — Cardápio Page
 * Design: Verdant Wellness — asymmetric hero, masonry product grid, pill category filters
 */

import { useState } from "react";
import { useApp, PRODUCTS, type Product } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Search,
  Plus,
  Flame,
  Dumbbell,
  Wheat,
  Droplets,
  Star,
  Clock,
  ShoppingCart,
} from "lucide-react";

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "proteico", label: "Proteico" },
  { id: "lowcarb", label: "Low Carb" },
  { id: "vegano", label: "Vegano" },
  { id: "detox", label: "Detox" },
  { id: "fitness", label: "Fitness" },
];

const CATEGORY_COLORS: Record<string, string> = {
  proteico: "bg-orange-100 text-orange-700",
  lowcarb: "bg-blue-100 text-blue-700",
  vegano: "bg-green-100 text-green-700",
  detox: "bg-purple-100 text-purple-700",
  fitness: "bg-red-100 text-red-700",
};

const CATEGORY_LABELS: Record<string, string> = {
  proteico: "Proteico",
  lowcarb: "Low Carb",
  vegano: "Vegano",
  detox: "Detox",
  fitness: "Fitness",
};

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663489084205/UvKr6qSHGGsL9eLKZPKe9u/hero-banner-Aw8eYbgx26NDF9PgNPGzX5.webp";

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useApp();
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdding(true);
    toast.success(`${product.name} adicionado ao carrinho!`, {
      icon: "🥗",
    });
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <div className="vita-card group overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className={`vita-badge text-xs ${CATEGORY_COLORS[product.category]}`}>
            {CATEGORY_LABELS[product.category]}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-xs font-semibold text-foreground">4.8</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-foreground text-base leading-tight mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
          {product.name}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed mb-3 flex-1 line-clamp-2">
          {product.description}
        </p>

        {/* Nutrition Info */}
        <div className="grid grid-cols-4 gap-1 mb-4 p-2 bg-muted/50 rounded-lg">
          {[
            { icon: Flame, label: "kcal", value: product.calories, color: "text-orange-500" },
            { icon: Dumbbell, label: "prot", value: `${product.protein}g`, color: "text-blue-500" },
            { icon: Wheat, label: "carb", value: `${product.carbs}g`, color: "text-amber-500" },
            { icon: Droplets, label: "gord", value: `${product.fat}g`, color: "text-purple-500" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <item.icon className={`w-3 h-3 ${item.color} mb-0.5`} />
              <span className="text-xs font-bold text-foreground">{item.value}</span>
              <span className="text-[10px] text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <span
              className="text-xl font-bold text-primary"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <Button
            onClick={handleAdd}
            size="sm"
            className={`rounded-xl h-9 px-4 font-semibold transition-all duration-200 ${
              adding
                ? "bg-green-500 text-white scale-95"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            <Plus className="w-4 h-4 mr-1" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Cardapio() {
  const { cartCount } = useApp();
  const [activeCategory, setActiveCategory] = useState("todos");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "todos" || p.category === activeCategory;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch && p.available;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>
        <div className="relative container py-16 lg:py-24">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Entrega em até 30 minutos</span>
            </div>
            <h1
              className="text-white text-4xl lg:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Cardápio
              <br />
              <em>Saudável</em>
            </h1>
            <p className="text-white/80 text-lg mb-6">
              Refeições preparadas com ingredientes frescos e naturais,
              pensadas para o seu bem-estar.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="font-semibold">4.9</span>
                <span className="text-white/70 text-sm">(+200 avaliações)</span>
              </div>
              <div className="w-px h-5 bg-white/30" />
              <div className="flex items-center gap-2 text-white">
                <ShoppingCart className="w-5 h-5" />
                <span className="font-semibold">{cartCount} {cartCount === 1 ? "item" : "itens"} no carrinho</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="container py-8">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar no cardápio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground text-sm">
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "prato encontrado" : "pratos encontrados"}
          </p>
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground">Nenhum prato encontrado</p>
            <p className="text-muted-foreground text-sm mt-1">
              Tente buscar por outro termo ou categoria
            </p>
            <Button
              onClick={() => { setSearch(""); setActiveCategory("todos"); }}
              variant="outline"
              className="mt-4 rounded-xl"
            >
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
