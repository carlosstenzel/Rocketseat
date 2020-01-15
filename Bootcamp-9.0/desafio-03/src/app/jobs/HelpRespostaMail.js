import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import Mail from "../../lib/Mail";

class HelpRespostaMail {
  get key() {
    return "HelpRespostaMail";
  }

  async handle({ data }) {
    const { dados } =  data;
    console.log('Rodou fila');
    await Mail.sendMail({
      to: `${dados.user.name} <${dados.user.email}>`,
      subject: "Resposta",
      template: "helpresposta",
      context: {
        user: dados.user.name,
        pergunta: dados.pergunta,
        resposta: dados.resposta
      }
    });
  }
}

export default new HelpRespostaMail();
