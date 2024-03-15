// const nodemailer = require("nodemailer");

// class MailerSvc {
//   #transporter;
//   constructor() {
//     this.#transporter = nodemailer.createTransport({
//       service: "Gmail",
//       secure: false, // Use `true` for port 465, `false` for all other ports
//       auth: {
//         user: "asadhmeed1@gmail.comp",
//         pass: process.env.MAILER_EMAIL_PASSWORD,
//       },
//     });
//   }

//   async sendEventEmail({ to, event, action }) {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "asadhmeed1@gmail.comp",
//         pass: process.env.MAILER_EMAIL_PASSWORD,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: '"EventCraft Team " <asadhmeed2@gmail.com>', // sender address
//       to, // list of receivers
//       subject: `Hello ✔ event craft alert`, // Subject line

//       html: `<b>thanks for using EventCraft</b> <br/>
//         <div>you ${action} ${event.title} Event</div>
//         <img src="${event.cardID.img}" alt="${event.title} card image" />`, // html body
//     });
//   }
// }

// const mailerSvc = new MailerSvc();

// module.exports = { mailerSvc };
