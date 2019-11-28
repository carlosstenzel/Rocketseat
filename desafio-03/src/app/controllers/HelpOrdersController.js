import * as Yup from "yup";
import HelpOrders from "../models/HelpOrders";
import Students from "../models/Students";
import HelpRespostaMail from "../jobs/HelpRespostaMail";
import Queue from "../../lib/Queue";

class HelpOrdersController {
  async index(req, res) {
    if (!req.params.id) {
      // Lista todos os pedidos sem respostas

      const buscaHelp = await HelpOrders.findAll({
        where: {
          answer: null
        },
        order: [["id", "DESC"]]
      });

      return res.json(buscaHelp);
    } else {
      //Lista todos os pedidos por students
      const buscaHelp = await HelpOrders.findAll({
        where: {
          student_id: req.params.id
        },
        order: [["id", "DESC"]]
      });

      return res.json(buscaHelp);
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const cadastra = await HelpOrders.create({
      student_id: req.params.id,
      question: req.body.question
    });

    return res.json(cadastra);
  }

  async update(req, res) {
    const helpOrder = await HelpOrders.findByPk(req.params.id);

    if (!helpOrder) {
      return res.status(400).json({ error: "Help Order not exist" });
    }

    const studentSeleciona = await Students.findOne({
      where: { id: helpOrder.student_id }
    });

    helpOrder.answer = req.body.answer;
    helpOrder.answer_at = new Date();

    helpOrder.save();

    const dados = {
      user: studentSeleciona,
      pergunta: helpOrder.question,
      resposta: req.body.answer
    };

    await Queue.add(HelpRespostaMail.key, { dados });

    return res.json(helpOrder);
  }
}

export default new HelpOrdersController();
