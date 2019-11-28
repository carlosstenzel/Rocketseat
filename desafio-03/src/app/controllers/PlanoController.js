import * as Yup from "yup";
import Planos from "../models/Planos";

class PlanoController {
  async index(req, res) {
    const planos = await Planos.findAll();
    return res.json(planos);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const { title, duration, price } = await Planos.create(req.body);

    return res.json({ title, duration, price });
  }

  async delete(req, res) {
    const plano = await Planos.findByPk(req.params.id);

    if (plano.destroy()) {
      return res.json({ message: "Plan deleted successfully" });
    } else {
      return res.status(400).json({ error: "Fails" });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const plano = await Planos.findByPk(req.params.id);

    const { title, duration, price } = await plano.update(req.body);

    return res.json({ title, duration, price });
  }
}

export default new PlanoController();
