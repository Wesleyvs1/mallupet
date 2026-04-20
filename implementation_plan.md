# Plano Integrado de Desenvolvimento: Clínica Mallu Pet

Este plano detalha a arquitetura, o design, a implementação técnica e o fluxo de trabalho para o desenvolvimento do novo site da clínica veterinária "Mallu Pet".

## Visão Geral do Projeto
**Tipo:** Landing page moderna com múltiplas seções.
**Características principais:** Animações flutuantes (floating elements), design responsivo e limpo, focada em **conversão (agendamentos e vendas via WhatsApp)**. O design usará a paleta de cores da marca (Tons de Azul e Verde Água/Teal, Branco), incorporando o mascote (gatinho veterinário), a logo oficial, patas flutuantes e microanimações para engajar o usuário.

## 🎯 Stack Recomendada e Arquitetura Tecnológica

### 1. Core (Essencial)
- **Next.js 14+:** App Router, Server Components, Route Handlers. (Perfeito para landing pages combinando performance e flexibilidade).
- **React 18+:** JSX, Hooks, Client Components.
- **TypeScript:** Type safety (fortemente recomendado).
- **Tailwind CSS 3+:** Utilitários CSS, design rápido (Tailwind gera automaticamente apenas o CSS usado).

### 2. Animações (Crítico para este projeto)
- **Framer Motion (Principal):** Animações flutuantes, parallax, scroll triggers (Fade-in ao scroll, stagger em cards, motion variants, floating pets/patinhas).
- **GSAP (Opcional):** Efeitos e timelines complexos, ScrollTrigger.

### 3. Componentes & UI
- **Shadcn/ui (Recomendado):** Componentes base (Button, Card, Input, Badge, Dialog) totalmente customizáveis e acessíveis com Tailwind. Sem dependências diretas.

### 4. Formulários
- **React Hook Form:** Utilizado para newsletter e formulário de contato. Leve, sem re-renders extras e fácil integração.

### 5. Imagens & Otimização
- **Next.js Image (`next/image`):** Otimização automática, lazy loading e suporte a WebP.

### 6. Scroll & Parallax
- **Intersection Observer API** (nativo ou `@react-intersection-observer`): Para detectar elementos entrando no viewport e acionar o Framer Motion.
- **Lenis Smooth Scroll (Opcional):** Smooth scroll fluido para melhor UX.

### 7. Ícones
- **React Icons:** Mais de 40 bibliotecas suportadas. Tree-shakeable. (Também podemos mesclar com o *Lucide React* que vem padrão no Shadcn).

### 8. Utilitários
- `clsx` e `tailwind-merge`: Para gerenciar e resolver conflitos em classes Tailwind.
- `date-fns` (manipulação de datas, se necessário) e `axios` (ou fetch nativo para APIs).

### 9. Performance & SEO
- **next-seo:** Para lidar dinamicamente com Meta tags, Open Graph e Structured data automaticamente.

---

## Estrutura de Seções (Mínimo 10 Seções)
1. **Header/Navbar:** Navegação sticky, com link para Galeria e botão CTA de "Agendamentos".
2. **Hero Section:** Apresentação de alto impacto com o Logo, o Mascote animado, mensagem "Cuidado Veterinário com amor e dedicação" e forte CTA para WhatsApp. Animações de patinhas subindo/caindo.
3. **Sobre Nós (O Doutor e a Empresa):** Apresentação da missão, valores (Atendimento humanizado, ambiente seguro) e introdução da equipe veterinária.
4. **Serviços Oferecidos:** Grid fofa detalhando Consultas, Vacinação, Exames, etc.
5. **Promoção Especial:** Banner de destaque detalhando diferenciais e desconto na primeira consulta.
6. **Catálogo Digital:** Carrossel ou Grid de produtos (medicamentos). **Ação:** Clique no produto abre um Pop-up/Modal (Dialog do Shadcn). Botão de compra substituído por "Fale com um Consultor" via WhatsApp.
7. **Galeria:** Exposição visual fofa sobre a clínica e pacientes (linkada também na navbar).
8. **Avaliações e Feedback:** Depoimentos em estilo "balões de fala" com design amigável e fofo.
9. **Blog / Integração Instagram:** Destaque para postagens linkando para o Instagram @mallupett.
10. **Localização e Endereço:** Seção com mapa do Google embutido e informações de contato finais (Rodapé).

---

## Estrutura de Agentes Requisitados

1. **👨‍💼 Product Manager:** Supervisiona o escopo, garante aderência ao tema e conversão (WhatsApp).
2. **🎨 Criador de Imagens:** Gera assets fofos (backgrounds, ícones de pegadas).
3. **✨ Front-End Specialist:** Implementa React/Next.js, Tailwind, Framer Motion e o Modal do catálogo.
4. **⚙️ Back-End Specialist:** Next.js Route Handlers, dados estruturados locais (mocks) e lógica do WhatsApp.
5. **🚀 Performance Optimizer:** Ajusta o `next/image` e config SEO com `next-seo`.
6. **🐛 Debugger:** Testa reações do Shadcn, formulários com React Hook Form e z-index Flutuante das animations.
7. **📝 Documentation Writer:** Documenta a stack recomendada no README.
8. **🧪 Test Engineer:** Desenvolve a rodada de checagem em dispositivos Mobile e Tablet.

---

## User Review Required

> [!IMPORTANT]
> **Aprovação Final da Stack e Inicialização:**
> 1. O plano foi atualizado com a **Stack recomendada (Next.js 14, Tailwind, Framer Motion, Shadcn, etc)**. Tudo devidamente acatado!
> 2. Posso proceder com o **setup do projeto inicial (`npx create-next-app@latest`)** e a instalação de todas essas dependências agora mesmo?
> 3. Sobre as imagens (além da logo e do mascote que você já mandou), posso iniciar a criação de mockups utilizando dados temporários de medicamentos/cães e gatos para a nossa Galeria e Catálogo?

## Plano de Execução (Próximos Passos)
1. **Fase 1: Setup da Stack Inicial:** \`create-next-app\` com Tailwind + TS. Instalação das libs (\`framer-motion\`, \`lucide-react\`, \`clsx\`, \`tailwind-merge\`, \`shadcn-ui\`, \`lenis\`, etc).
2. **Fase 2: Estrutura Base:** Configuração de layout root, paleta de cores no Tailwind config e setup inicial do Shadcn.
3. **Fase 3: Construção UI Parte 1:** Desenvolver Header, Hero Animado (Framer Motion patas), e Sobre Nós.
4. **Fase 4: Construção UI Parte 2:** Serviços, Catálogo com Dialog e Botão WhatsApp.
5. **Fase 5: Construção UI Parte 3:** Avaliações, Galeria/Instagram, Mapa e Footer.
6. **Fase 6: Polimento e Ferramentas:** Injeção das animações de Scroll/Parallax, testes dinâmicos e métricas de desempenho.
