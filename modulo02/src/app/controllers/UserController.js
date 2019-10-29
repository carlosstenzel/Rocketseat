import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if(userExists) {
      return res.status(400).json({ error: "User already exist." });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);
    //verifica se email igual o cadastado
    if(email != user.email) {
      // verifica se usuario existe
      // se email existe
      const userExists = await User.findOne({ where: { email } });
      if(userExists) {
        return res.status(400).json({ error: "User already exist." });
      }
    }

    // verifica se senha antiga esta correta
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const user = await user.update(req.body);

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  
  }

}

export default new UserController();
