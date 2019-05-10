const mongoose = require("mongoose");

const schema = mongoose.Schema;

const model = new schema({
  username: String,
  password: { type: String, select: false },
  name: String
});

module.exports = mongoose.model("Usuario", model, "usuario");


//
// db.Usuario.insertMany([{
// 		"username": "alana",
// 		"password": "201811120288",
// 		"name": "Alana Silva Mayer"
// 	},
// 	{
// 		"username": "alice",
// 		"password": "20192004552",
// 		"name": "Alice Mendes Gazzinelli Gomes"
// 	},
// 	{
// 		"username": "ana",
// 		"password": "20192004605",
// 		"name": "Ana Cristina Pousa Machado"
// 	},
// 	{
// 		"username": "arthur",
// 		"password": "201811120067",
// 		"name": "Arthur Henrique Miranda Melo"
// 	},
// 	{
// 		"username": "arthur",
// 		"password": "20192004507",
// 		"name": "Arthur Moura De Oliveira"
// 	},
// 	{
// 		"username": "caio",
// 		"password": "20192004356",
// 		"name": "Caio Costa Souza"
// 	},
// 	{
// 		"username": "caio",
// 		"password": "20192004525",
// 		"name": "Caio Grossi Pereira Marçal"
// 	},
// 	{
// 		"username": "caio",
// 		"password": "20192004516",
// 		"name": "Caio Henrique Maranhão Mastrorocco"
// 	},
// 	{
// 		"username": "clara",
// 		"password": "20192022612",
// 		"name": "Clara Letícia Santos Pessôa"
// 	},
// 	{
// 		"username": "daniela",
// 		"password": "20192004580",
// 		"name": "Daniela Alves Pereira"
// 	},
// 	{
// 		"username": "davi",
// 		"password": "20192004937",
// 		"name": "Davi Porto Araujo"
// 	},
// 	{
// 		"username": "derik",
// 		"password": "20192004436",
// 		"name": "Derik Santos Da Costa"
// 	},
// 	{
// 		"username": "emanuelle",
// 		"password": "20192004759",
// 		"name": "Emanuelle Maria Soares De Oliveira"
// 	},
// 	{
// 		"username": "erick",
// 		"password": "20192004866",
// 		"name": "Erick Kauan Lopes Santos"
// 	},
// 	{
// 		"username": "igor",
// 		"password": "201811120130",
// 		"name": "Igor Gonçalves Faria"
// 	},
// 	{
// 		"username": "barbara",
// 		"password": "201811120377",
// 		"name": "Barbara Eduarda Nazario"
// 	},
// 	{
// 		"username": "gabriel",
// 		"password": "20192004374",
// 		"name": "Gabriel Araujo Saldanha"
// 	},
// 	{
// 		"username": "gabriel",
// 		"password": "20192019789",
// 		"name": "Gabriel Augusto Souza Borges"
// 	},
// 	{
// 		"username": "guilherme",
// 		"password": "20192021900",
// 		"name": "Guilherme Araújo Teixeira Cunha"
// 	},
// 	{
// 		"username": "gustavo",
// 		"password": "20192004365",
// 		"name": "Gustavo Boeira Silva"
// 	},
// 	{
// 		"username": "heitor",
// 		"password": "20192004267",
// 		"name": "Heitor Augusto Botelho"
// 	},
// 	{
// 		"username": "hellen",
// 		"password": "20192019831",
// 		"name": "Hellen Beatriz Ferreira Vaz"
// 	},
// 	{
// 		"username": "igor",
// 		"password": "20192004392",
// 		"name": "Igor Moura Martins"
// 	},
// 	{
// 		"username": "isadora",
// 		"password": "20192004614",
// 		"name": "Isadora Do Carmo Costa Trindade Ferreira"
// 	},
// 	{
// 		"username": "iuri",
// 		"password": "20192004249",
// 		"name": "Iuri Veras Andrade Lima"
// 	},
// 	{
// 		"username": "kaique",
// 		"password": "20192020565",
// 		"name": "Kaique Bolonezi Ferreira De Abreu"
// 	},
// 	{
// 		"username": "leticia",
// 		"password": "20192004294",
// 		"name": "Leticia Vitoria Batista Gomes"
// 	},
// 	{
// 		"username": "lucas",
// 		"password": "20192004338",
// 		"name": "Lucas De Oliveira Duarte"
// 	},
// 	{
// 		"username": "vicente",
// 		"password": "201811120237",
// 		"name": "Vicente Soares Hastenreiter"
// 	},
// 	{
// 		"username": "vitor",
// 		"password": "201811120350",
// 		"name": "Vitor Dias Barcelos"
// 	},
// 	{
// 		"username": "lucca",
// 		"password": "20192004721",
// 		"name": "Lucca De Paula Silva Lopes"
// 	},
// 	{
// 		"username": "marcos",
// 		"password": "20192004300",
// 		"name": "Marcos Vinicio Euzebio"
// 	},
// 	{
// 		"username": "maria",
// 		"password": "20192018208",
// 		"name": "Maria Fernanda Ribeiro Dos Anjos"
// 	},
// 	{
// 		"username": "mariana",
// 		"password": "201811120385",
// 		"name": "Mariana Ester Paulino Gregório"
// 	},
// 	{
// 		"username": "mateus",
// 		"password": "20192004051",
// 		"name": "Mateus Henrique Soares De Paula"
// 	},
// 	{
// 		"username": "miguel",
// 		"password": "20192004839",
// 		"name": "Miguel Augusto De Brito Pessoa Ferreira"
// 	},
// 	{
// 		"username": "nader",
// 		"password": "20192004697",
// 		"name": "Nader Samuel Gonçalves Ferreira"
// 	},
// 	{
// 		"username": "pedro",
// 		"password": "20192004427",
// 		"name": "Pedro Rabelo De Freitas"
// 	},
// 	{
// 		"username": "rafael",
// 		"password": "201811120199",
// 		"name": "Rafael De Oliveira Torrezani"
// 	},
// 	{
// 		"username": "rafael",
// 		"password": "20192004623",
// 		"name": "Rafael Pierre Martins"
// 	},
// 	{
// 		"username": "rafaela",
// 		"password": "20192004409",
// 		"name": "Rafaela Ferreira Guimaraes"
// 	},
// 	{
// 		"username": "saulo",
// 		"password": "201811120342",
// 		"name": "Saulo Lima De Carvalho"
// 	},
// 	{
// 		"username": "sophia",
// 		"password": "20192004060",
// 		"name": "Sophia Vitoria Campos Vieira"
// 	},
// 	{
// 		"username": "thiago",
// 		"password": "20192020725",
// 		"name": "Thiago Aurélio Diniz"
// 	},
// 	{
// 		"username": "thiago",
// 		"password": "20192004848",
// 		"name": "Thiago Roberto Magalhães"
// 	},
// 	{
// 		"username": "walison",
// 		"password": "201811120245",
// 		"name": "Walison Mendes Machado"
// 	}
// ])
