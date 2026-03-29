# VitaExpress — Ideias de Design

## Contexto
Sistema de delivery de alimentos saudáveis para trabalho acadêmico. Público-alvo: microempreendedores individuais (MEIs) e clientes que buscam refeições saudáveis. Precisa transmitir frescor, saúde, confiança e modernidade.

---

<response>
<text>
## Ideia A — "Biofresh Organic"

**Design Movement:** Organic Modernism — fusão entre brutalismo suave e design orgânico contemporâneo.

**Core Principles:**
1. Formas assimétricas com bordas irregulares que remetem a folhas e elementos naturais
2. Contraste forte entre áreas densas de informação e respiros generosos de espaço branco
3. Tipografia expressiva com peso variável para criar hierarquia visual marcante
4. Texturas sutis de papel/linho no fundo para dar sensação de artesanal e natural

**Color Philosophy:**
- Verde musgo profundo (#2D5016) como cor primária — evoca natureza madura e confiança
- Creme quente (#F5EDD6) como fundo — suavidade e acolhimento
- Laranja terracota (#C4622D) como acento — energia, apetite e calor
- Branco puro para espaços de respiro

**Layout Paradigm:**
- Cards com bordas orgânicas (border-radius variável)
- Seções com clip-path diagonal para criar fluxo visual dinâmico
- Grid assimétrico 7/5 em vez de 6/6
- Sidebar de navegação lateral em desktop, bottom nav em mobile

**Signature Elements:**
1. Blobs SVG animados como elementos decorativos de fundo
2. Cards de produto com foto em formato irregular (clip-path oval)
3. Indicadores de progresso de pedido com linha orgânica

**Interaction Philosophy:**
- Hover em cards: leve elevação + sombra verde suave
- Transições de página com fade + slide vertical suave
- Botões com efeito de "crescimento" no hover

**Animation:**
- Entrada de elementos com fade-up (translateY 20px → 0, opacity 0 → 1, 400ms ease-out)
- Cards do cardápio com stagger de 80ms entre cada item
- Loading spinner com folha girando

**Typography System:**
- Display: "Playfair Display" — elegância orgânica para títulos
- Body: "DM Sans" — legibilidade moderna e amigável
- Mono: "JetBrains Mono" para preços e códigos de pedido
</text>
<probability>0.07</probability>
</response>

<response>
<text>
## Ideia B — "NeoHealth Brutalist"

**Design Movement:** Neo-Brutalism com paleta de saúde — estruturas expostas, sombras duras, mas com cores vibrantes e saudáveis.

**Core Principles:**
1. Bordas sólidas pretas (2-3px) em todos os elementos — honestidade estrutural
2. Sombras "offset" duras (box-shadow: 4px 4px 0 #000) em vez de sombras difusas
3. Cores chapadas e saturadas sem gradientes — clareza e impacto
4. Layout em grade explícita com espaçamentos generosos

**Color Philosophy:**
- Verde lima vibrante (#8BC34A) como primária — vitalidade e energia
- Amarelo cítrico (#FFD600) como acento — alegria e otimismo
- Preto (#0A0A0A) para bordas e texto — contraste máximo
- Branco (#FAFAFA) como fundo base

**Layout Paradigm:**
- Cards com sombra offset preta — efeito "sticker"
- Navegação em barra horizontal com bordas visíveis
- Seções separadas por linhas grossas horizontais
- Botões com borda preta e sombra offset que "afundam" no clique

**Signature Elements:**
1. Tags de categoria com fundo colorido e borda preta (estilo badge físico)
2. Contador de itens no carrinho com número em círculo preto
3. Status do pedido com ícones grandes e texto em caixa alta

**Interaction Philosophy:**
- Clique em botão: sombra offset some (efeito de pressionar)
- Hover em card: sombra aumenta ligeiramente
- Feedback de ação com toast em estilo "nota adesiva"

**Animation:**
- Transições rápidas (150-200ms) — responsividade imediata
- Bounce suave em elementos de confirmação
- Shake em erros de validação

**Typography System:**
- Display: "Space Grotesk" — geométrico e moderno com personalidade
- Body: "IBM Plex Sans" — clareza técnica e legibilidade
- Accent: "Space Mono" para preços e números
</text>
<probability>0.08</probability>
</response>

<response>
<text>
## Ideia C — "Verdant Wellness" ✅ ESCOLHIDA

**Design Movement:** Wellness Minimalism — minimalismo sofisticado inspirado em marcas premium de saúde como Whole Foods e Erewhon.

**Core Principles:**
1. Espaço em branco como elemento de design principal — "menos é mais saudável"
2. Fotografia de alimentos como protagonista — imagens grandes e apetitosas
3. Hierarquia tipográfica clara com contraste de peso (light vs bold)
4. Micro-animações suaves que transmitem cuidado e atenção

**Color Philosophy:**
- Verde esmeralda (#1B5E20 → #4CAF50) como gradiente primário — saúde, natureza, frescor
- Branco cremoso (#FAFAF8) como fundo — limpeza e pureza
- Cinza ardósia (#37474F) para texto — sofisticação sem agressividade
- Âmbar dourado (#FF8F00) como acento — calor, apetite, energia

**Layout Paradigm:**
- Hero assimétrico: texto à esquerda (40%) + imagem à direita (60%)
- Grid de produtos em masonry suave (não uniforme)
- Sidebar de navegação com ícones + texto em desktop
- Navegação inferior flutuante em mobile com blur backdrop

**Signature Elements:**
1. Pill badges para categorias alimentares (Proteico, Low Carb, Vegano, etc.)
2. Cards de produto com imagem em proporção 4:3 + informações nutricionais resumidas
3. Barra de progresso do pedido com ícones animados (Recebido → Preparando → A caminho → Entregue)

**Interaction Philosophy:**
- Hover em cards: zoom suave na imagem (scale 1.05) + sombra elevada
- Adicionar ao carrinho: animação de "voo" do item para o ícone do carrinho
- Formulários com validação inline suave (sem erros agressivos)

**Animation:**
- Entrada de página: fade + translateY(16px) → 0, 350ms cubic-bezier(0.4, 0, 0.2, 1)
- Stagger de cards: 60ms entre cada item
- Carrinho: pulse suave ao adicionar item
- Skeleton loading para imagens de produtos

**Typography System:**
- Display: "Fraunces" — serif orgânico com personalidade, perfeito para títulos de comida
- Body: "Plus Jakarta Sans" — moderno, humanista, excelente legibilidade
- Números/preços: "Fraunces" em peso 700 para destaque
</text>
<probability>0.09</probability>
</response>

---

## Decisão Final: Ideia C — "Verdant Wellness"

Escolhida por transmitir melhor os valores de saúde, frescor e confiança que o VitaExpress precisa comunicar. O minimalismo sofisticado diferencia o projeto academicamente e a paleta verde/âmbar é universalmente associada a alimentação saudável e natural.
