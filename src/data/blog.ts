export interface BlogPost {
  id: string;
  titulo: string;
  desc: string;
  tag: string;
  imagem: string;
  link: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "vacinacao-2024",
    titulo: "Calendário de Vacinação 2024",
    desc: "Mantenha seu cão protegido contra V10, Gripe e Giárdia. Entenda a importância do reforço anual.",
    tag: "Saúde",
    imagem: "/blog/vacinacao.png",
    link: "https://www.instagram.com/vet.eri_mallupet/"
  },
  {
    id: "alimentos-proibidos",
    titulo: "Alimentos Perigosos para Pets",
    desc: "Chocolate, uva e cebola podem ser fatais. Conheça os alimentos que você nunca deve dar ao seu melhor amigo.",
    tag: "Nutrição",
    imagem: "/blog/nutricao.png",
    link: "https://www.instagram.com/vet.eri_mallupet/"
  },
  {
    id: "higiene-bucal-pet",
    titulo: "A Importância da Higiene Bucal",
    desc: "O tártaro pode causar doenças graves no coração e rins. Saiba como escovar os dentes do seu pet corretamente.",
    tag: "Cuidados",
    imagem: "/blog/higiene.png",
    link: "https://www.instagram.com/vet.eri_mallupet/"
  }
];
