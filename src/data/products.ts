export const fileNames = [
  "WhatsApp Image 2026-04-17 at 12.35.40 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 12.35.41 PM (1).jpeg",
  "WhatsApp Image 2026-04-17 at 12.35.41 PM (2).jpeg",
  "WhatsApp Image 2026-04-17 at 12.35.41 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 12.35.42 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 12.35.43 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 12.35.46 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 12.35.47 PM (1).jpeg",
  "WhatsApp Image 2026-04-17 at 12.35.47 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 12.35.48 PM (1).jpeg",
  "WhatsApp Image 2026-04-17 at 12.35.48 PM (2).jpeg",
  "WhatsApp Image 2026-04-17 at 12.35.48 PM (3).jpeg",
  "WhatsApp Image 2026-04-17 at 12.35.48 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 12.35.49 PM (1).jpeg",
];

export const produtos = fileNames.map((file, i) => ({
  id: i + 1,
  nome: `Medicamento ${i + 1}`,
  categoria: "Medicamentos",
  descricao: "Medicamento de alta qualidade disponível em nossa clínica. Para dosagem e indicações corretas, consulte nossos veterinários.",
  preco: "Consulte preço",
  imagem: file,
  indicacao: "Cães e Gatos",
  fabricante: "Diversos"
}));

export const categorias = ["Todos", "Medicamentos"];
