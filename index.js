const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');
const Swal = require('sweetalert2')
//Database
connection.authenticate().then(() => {
    console.log("Conectado ao banco com sucesso ✔");
}).catch((err) => {
    console.error(err);
})

const port = 3000;

//Estou dizendo para o Express usar o ejs como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true, order: [
        ['id', 'DESC']
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})


app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id

    Pergunta.findOne({
        where: { id: id },
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else {
            res.redirect("/");
      }
    })
})

app.post("/responder", (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect(`/pergunta/${perguntaId}`);
    }).catch((err) => {
        console.log(err);
    });;
});

app.listen(port, (err) => {
     if (err) {
        console.error(`Erro ao iniciar o servidor: ${err}`)
    } else {
        console.log(`Servidor iniciado 🚀 http://localhost:${port}`);
    }
})