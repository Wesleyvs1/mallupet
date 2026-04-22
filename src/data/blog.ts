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
    titulo: "Alimentos proibidos para cães e gatos",
    desc: "Muitos alimentos comuns para humanos podem ser extremamente tóxicos para os pets. Saiba o que manter longe do seu amigo.",
    tag: "Nutrição",
    imagem: "/blog/nutricao.png",
    link: "https://www.vetnil.com.br/blog/alimentos-proibidos-para-caes-e-gatos",
    isInstagram: false
  },
  {
    id: "higiene-bucal-pet",
    titulo: "Saúde bucal: a importância da escovação",
    desc: "A falta de higiene oral pode levar a doenças periodontais e até problemas cardíacos. Veja como prevenir o tártaro.",
    tag: "Cuidados",
    imagem: "/blog/higiene.png",
    link: "https://drakey.com.br/importancia-da-escovacao-dentaria-em-pets/",
    isInstagram: false
  }
];
