const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => res.send("pong"));

app.post("/api/send", async (req, res) => {
  const { email, firstName, lastName, message } = req.body;

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: `${firstName} ${lastName}`,
          email: process.env.BREVO_EMAIL, // O e-mail verificado na Brevo
        },
        to: [
          {
            email: process.env.BREVO_EMAIL,
            name: "Erick Saraiva",
          },
        ],
        subject: "Mensagem recebida via site",
        htmlContent: `
          <strong>Nome:</strong> ${firstName} ${lastName}<br/>
          <strong>Email:</strong> ${email}<br/>
          <strong>Mensagem:</strong><br/>${message}
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ E-mail enviado:", response.data.messageId || response.data);
    res.status(200).send({ message: "Email enviado com sucesso!" });

  } catch (error) {
    console.error("❌ Erro ao enviar email:", error.response?.data || error.message);
    res.status(500).send({ message: "Erro ao enviar e-mail." });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
});
