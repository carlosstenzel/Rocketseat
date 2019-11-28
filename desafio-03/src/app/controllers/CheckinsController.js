import Checkins from "../models/Checkins";
import Students from "../models/Students";
import { addDays } from "date-fns";
class CheckinsController {
  async index(req, res) {
    const id_aluno = req.params.id;

    const buscaCheckins = await Checkins.findAll({
      where: {
        student_id: id_aluno
      },
      order: [["id", "DESC"]]
    });

    return res.json(buscaCheckins);
  }

  async store(req, res) {
    const id_aluno = req.params.id;

    const aluno = await Students.findByPk(id_aluno);

    if (!aluno) {
      return res.status(400).json({ error: "Students not exist" });
    }

    const buscaCheckins = await Checkins.findAll({
      where: {
        student_id: id_aluno
      },
      order: [["id", "DESC"]],
      limit: 5
    });

    if (buscaCheckins.length === 5) {
      const testaData = addDays(buscaCheckins[0].createdAt, 7);
      if (testaData >= buscaCheckins[4].createdAt) {
        return res.status(400).json({ error: "5 checkins per week exceeded " });
      }
    }

    const checkins = await Checkins.create({
      student_id: id_aluno
    });

    res.json(buscaCheckins.length);
  }
}

export default new CheckinsController();
