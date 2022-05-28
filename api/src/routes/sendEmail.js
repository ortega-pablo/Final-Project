const { Router } = require("express");
const nodemailer = require("nodemailer")
const {google} = require("googleapis")
const router = Router();
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

router.post("/welcome", async (req, res, next) => {
    const { userName, email } = req.body
    const contentHtml=`
    <h1>Bienvenido a EXMINE ${userName}!</h1>
    <p>Gracias por registrarte</p>
    `

    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    )

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

    async function sendMail(){
        try {
            const accessToken = await oAuth2Client.getAccessToken();
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: "exmine.hardware@gmail.com",
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken,
                },
            })
            const mailOptions = {
                from: "EXMINE",
                to: email,
                subject: "Hola ljkstyhdjño-{dfjhbglshmf} va",
                html: contentHtml,

            }

            const result = await transporter.sendMail(mailOptions);
            return result;

        } catch (error) {
            console.log(error)
        }
    }
    sendMail()
        .then((result)=>res.status(200).send("enviado"))
        .catch((error)=> console.log(error.message))
});

module.exports = router;