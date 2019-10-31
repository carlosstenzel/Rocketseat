import * as Yup from 'yup';
import Students from '../models/Students';

class StudentsController {
  async index(req, res){
    const students = await Students.findAll();
    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number()
        .required(),
      peso: Yup.string()
        .required(),
      altura: Yup.string()
        .required()
    });

    // Verifica se passa pelos teste
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }
      
    console.log(req.body);
    
    // Verifica se email ja esta cadastrado
    const studentExists = await Students.findOne({ where : { email: req.body.email } });
    
    if (studentExists) {
      return res.status(400).json({ error: "Student already exist." });
    }

    // Se passar pela validação, cadastra estudante
    const { id, name, email, idade, peso, altura } = await Students.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura
    });
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      idade: Yup.number(),
      peso: Yup.string(),
      altura: Yup.string()
    });

    // Se não passar nos testes de validação
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const { email } = req.body;

    const aluno = await Students.findByPk(req.userId);

    // Verifica se email é diferente, no caso estara a alterar o email
    if (email != aluno.email) {
      // verifica se novo email ja esta cadastrado
      const alunoExists = await Students.findOne({ where: { email } });
      if (alunoExists) {
        return res
          .status(400)
          .json({ error: "Email for Students already exist." });
      }
    }

    const { id, name, email, peso, altura } = await aluno.update(req.body);

    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura
    });
  }
}

export default new StudentsController();
