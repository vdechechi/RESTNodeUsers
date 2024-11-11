var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const knex = require("../database/connection");

var secret = 'jabdskasbdkasbdasbduviviavdavdascyduyhac'

class UserController {

    async index(req, res) {
        const users = await User.findAll();
        res.status(200).json(users); // Corrigido para definir o status antes de enviar a resposta
    }

    async findUser(req, res) {
        const id = req.params.id;
        const user = await User.findById(id);

        if (user == undefined) {
            res.status(404).json({ err: "usuario nao encontrado" });
        } else {
            res.status(200).json(user);
        }
    }

    async create(req, res) {
        var { email, name, password } = req.body;

        if (email == undefined || email.trim() === '' || email.trim() === ' ') {
            res.status(400).json({ err: "e-mail invalido" });
            return;
        }

        var emailExists = await User.findEmail(email);

        if (emailExists) {
            res.status(406).json({ err: "O email já esta cadastrado!" });
            return;
        }

        await User.new(email, password, name);
        res.status(200).send("Tudo OK ");
    }

    async edit(req, res) {
        const { id, name, role, email } = req.body;
        const result = await User.update(id, email, name, role);

        if (result != undefined) {
            if (result.status) {
                res.status(200).send("Tudo OK");
            } else {
                res.status(406).json(result.err);
            }
        } else {
            res.status(406).send("Ocorreu um erro no servidor");
        }
    }

    async remove(req, res) {
        const id = req.params.id;
        const result = await User.delete(id);

        if (result.status) {
            res.status(200).send("Usuario deletado com sucesso");
        } else {
            res.status(406).send(result.err);
        }
    }

    async recoverPassword(req, res) {
        const email = req.body.email;
        const result = await PasswordToken.create(email);

        if (result.status) {
            console.log(result.token);
            res.status(200).send("" + result.token);
        } else {
            res.status(406).send(result.err);
        }
    }

    async changePassword(req, res) {
        var token = req.body.token;
        var password = req.body.password;
        const isValid = await PasswordToken.validate(token);

        if (isValid.status) {
            await User.changePassword(password, isValid.tk.user_id, isValid.tk.token);
            res.status(200).send("SENHA ALTERADA");
        } else {
            res.status(406).send("O token é invalido");
        }
    }

    async login(req, res) {
        const { email, password } = req.body

        const user = await User.findByEmail(email)

        if (user != undefined) {
            const result = await bcrypt.compare(password, user.password)

            if (result) {
                var token = jwt.sign({ email: user.email, role: user.role }, secret);
                res.status(200).json({ token: token })
            } else {
                res.status(406).json({ err: 'Senha incorreta' })
            }
        } else {
            res.status(406).json({ err: 'Usuário não encontrado' })
        }
    }
}

module.exports = new UserController();
