process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var laboratorioRouter = require("./src/routes/laboratorios");
var maquinaRouter = require("./src/routes/maquinas");
var dashboardsRouter = require("./src/routes/dashboards");
var parametrosMonitoramentoRouter = require("./src/routes/parametrosMonitoramento");
var instituicaoRouter = require("./src/routes/instituicao");
var alertasRouter = require("./src/routes/alertas");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/laboratorios", laboratorioRouter);
app.use("/maquinas", maquinaRouter);
app.use("/dashboards", dashboardsRouter);
app.use("/parametrosMonitoramento", parametrosMonitoramentoRouter);
app.use("/instituicao", instituicaoRouter);
app.use("/alertas", alertasRouter);


app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA}/index.html \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
