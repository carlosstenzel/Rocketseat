import Appintment from "../models/Appointment";
import User from "../models/User";
import * as Yup from "yup";

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400), json({ error: "validation fails" });
    }

    const { provider_id, date } = req.body;

    /**
     * Check if provider_id is a provider
     */
    const isProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true
      }
    });

    if (!isProvider) {
      return res.json({
        error: "You can only create appointments with providers"
      });
    }

    const appointment = await Appintment.create({
      user_id: req.userId,
      provider_id,
      date,
    })

    return res.json(appointment);
  }
}

export default new AppointmentController();
