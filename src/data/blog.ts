export interface BlogPost {
  id: string;
  titulo: string;
  desc: string;
  tag: string;
  imagem: string;
  link: string;
  isInstagram?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "vacinacao-2024",
    titulo: "Calendário vacinal para os pets: especialista explica",
    desc: "A imunização é a melhor forma de prevenir doenças graves e garantir que seu companheiro tenha uma vida longa e saudável.",
    tag: "Saúde",
    imagem: "/blog/vacinacao.png",
    link: "https://www.uninter.com/noticias/calendario-vacinal-para-os-pets-especialista-explica-as-principais-vacinas",
    isInstagram: false
  },
  {
    id: "alimentos-proibidos",
    titulo: "Alimentos proibidos para pets: frutas e legumes",
    desc: "Chocolate, uva e cebola podem ser fatais. Conheça as frutas e legumes que você nunca deve dar ao seu melhor amigo.",
    tag: "Nutrição",
    imagem: "/blog/nutricao.png",
    link: "https://vetnil.com.br/blog/alimentos-proibidos-para-pets-frutas-e-legumes-que-caes-e-gatos-nao-podem-comer",
    isInstagram: false
  },
  {
    id: "higiene-bucal-pet",
    titulo: "Saúde bucal de pets exige rotina de cuidados",
    desc: "O CRMV-SP alerta sobre a importância da escovação e do acompanhamento profissional para prevenir doenças graves.",
    tag: "Cuidados",
    imagem: "/blog/higiene.png",
    link: "https://crmvsp.gov.br/saude-bucal-de-pets-exige-rotina-de-cuidados-e-acompanhamento-profissional/",
    isInstagram: false
  }
];
