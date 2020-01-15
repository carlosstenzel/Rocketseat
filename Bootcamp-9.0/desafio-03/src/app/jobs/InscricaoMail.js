import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import Mail from "../../lib/Mail";

class InscricaoMail {
  get key() {
    return "InscricaoMail";
  }

  async handle({ data }) {
    const { dados } =  data;
    console.log('Rodou fila');
    await Mail.sendMail({
      to: `${dados.user.name} <${dados.user.email}>`,
      subject: "Matricula",
      template: "inscricao",
      context: {
        user: dados.user.name,
        valortotal: "R$ "+dados.valortotal,
        datainicio: format(parseISO(dados.datainicio), " dd 'de' MMMM 'de' yyyy", {
          locale: pt
        }),
        datafinal: format(parseISO(dados.datafinal), " dd 'de' MMMM 'de' yyyy", {
          locale: pt
        })
      }
    });
  }
}

export default new InscricaoMail();
