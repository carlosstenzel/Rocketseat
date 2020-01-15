export default {
  host: process.env.MAIL_SMTP,
  port: 2525,
  auth: {
    user: process.env.MAIL_SMTP_USER,
    pass: process.env.MAIL_SMTP_PASS
  },
  secure: false,
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com',
  }
}