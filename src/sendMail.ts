// const sendMail = async (req, res) => {
//   const transporter = nodemailer.createTransport({
//     host: "email",

//     auth: {
//       user: "shindechetan3408@gmail.com",
//       pass: "3408"
//     }
//   });

//   // async..await is not allowed in global scope, must use a wrapper
//   async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: '"shindechetan3408@gmail.com" <Shinde@225>',
//       to: "shindechetan.cp@gmail.com",
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>" // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
//   }
// };

// module.exports = sendMail