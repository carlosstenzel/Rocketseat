import * as Yup from "yup";
import Matriculation from "../models/Matriculation";
import Planos from "../models/Planos";
import Students from "../models/Students";
import { addMonths, parseISO } from "date-fns";
import InscricaoMail from "../jobs/InscricaoMail";
import Queue from "../../lib/Queue";

class MatriculationController {
  async index(req, res) {
    const matriculation = await Matriculation.findAll();
    return res.json(matriculation);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const { student_id, plan_id, start_date } = req.body;

    const planoSelecionado = await Planos.findOne({
      where: { id: plan_id }
    });

    if (!planoSelecionado) {
      return res.status(400).json({ error: "Plan not exist" });
    }

    const studentSeleciona = await Students.findOne({
      where: { id: student_id }
    });

    if (!studentSeleciona) {
      return res.status(400).json({ error: "Student not exist" });
    }

    const data_end = addMonths(parseISO(start_date), planoSelecionado.duration);
    const valorplano = parseFloat(planoSelecionado.price);
    const price_total = parseFloat(
      valorplano * planoSelecionado.duration
    ).toFixed(2);

    const matricula = await Matriculation.create({
      student_id,
      plan_id,
      start_date,
      end_date: data_end,
      price: price_total
    });

    const dados = {
      user: studentSeleciona,
      datainicio: start_date,
      datafinal: data_end,
      valortotal: price_total
    };

    await Queue.add(InscricaoMail.key, { dados });

    return res.json(matricula);
  }

  async delete(req, res) {

    const matricula = await Matriculation.findByPk(req.params.id);

    if (!matricula) {
      return res.status(400).json({ error: "Matriculation not exist" });
    }

    if (matricula.destroy()) {
      return res.json({ message: "Matriculation deleted successfully" });
    } else {
      return res.status(400).json({ error: "Fails" });
    }

  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const matricula = await Matriculation.findByPk(req.params.id);

    if (!matricula) {
      return res.status(400).json({ error: "Matriculation not exist" });
    }

    const { plan_id, start_date } = req.body;

    const planoSelecionado = await Planos.findOne({
      where: { id: plan_id }
    });

    if (!planoSelecionado) {
      return res.status(400).json({ error: "Plan not exist" });
    }

    const data_end = addMonths(parseISO(start_date), planoSelecionado.duration);
    const valorplano = parseFloat(planoSelecionado.price);
    const price_total = parseFloat(
      valorplano * planoSelecionado.duration
    ).toFixed(2);

     const alterado = await matricula.update({
      plan_id,
      start_date,
      end_date: data_end,
      price: price_total
    });

    return res.json(alterado);

  }
}

export default new MatriculationController();
