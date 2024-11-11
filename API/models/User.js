const knex = require("../database/connection")
const bcrypt = require('bcrypt')
const PasswordToken = require("./PasswordToken")

class User {


    async findAll() {
        try {
            const result = await knex.select(["id", 'email', 'role', 'name']).table("users")
            return result
        } catch (err) {
            console.log(err)
            return [];
        }
    }

    async findById(id) {
        try {
            const result = await knex.select(["id", 'email', 'role', 'name']).where({ id: id }).table("users")
            if (result.length > 0) {
                return result[0]
            } else {
                return undefined
            }
        } catch (err) {
            console.log(err)
            return undefined;
        }
    }

    async findByEmail(email) {
        try {
            const result = await knex.select(["id", 'email', 'password', 'role', 'name']).where({ email: email }).table("users")
            if (result.length > 0) {
                return result[0]
            } else {
                return undefined
            }
        } catch (err) {
            console.log(err)
            return undefined;
        }
    }



    async new(email, password, name) {

        try {
            const hash = await bcrypt.hash(password, 10);

            await knex.insert({ email, password: hash, name, role: 0 }).table("users")

        } catch (err) {
            console.log(err)
        }
    }

    async findEmail(email) {

        try {
            var result = await knex.select("*").from("users").where({ email: email })

            if (result.length > 0) {
                return true
            } else {
                return false
            }


        } catch (error) {
            console.log(error)
            return false

        }
    }

    async update(id, email, name, role) {

        const user = await this.findById(id)

        if (user != undefined) {

            const editUser = {};

            if (email != undefined) {
                if (email != user.email) {

                    const result = await this.findEmail(email);

                    if (result == false) {
                        editUser.email = email;

                    } else {

                        return { status: false, err: 'O usuario não existe' }

                    }

                }

            } if (name != undefined) {
                editUser.name = name;
            }
            if (role != undefined) {
                editUser.role = role
            }

            try {
                await knex.update(editUser).where({ id: id }).table('users')
                return { status: true }

            } catch (error) {

                res.status(404)
                return { status: true, err: err }

            }



        } else {

            return { status: false, err: 'O usuario não existe' }

        }


    }

    async delete(id) {
        const user = await this.findById(id)

        if (user != undefined) {

            try {

                await knex.delete().where({ id: id }).table("users")
                return { status: true }

            } catch (error) {

                return { status: false, err: error }

            }

        } else {
            return { status: false, err: "O usuario nao existe, portanto nao pode ser deletado" }
        }
    }

    async changePassword(newPassword, id, token) {

        const hash = await bcrypt.hash(newPassword, 10)

        try {
            knex.update({ password: hash }).where({ id: id }).table("users")
            await PasswordToken.setUsed(token)

        } catch (error) {

        }



    }


}

module.exports = new User()