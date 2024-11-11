const knex = require("../database/connection");
const User = require("../models/User");
const { v4: uuidv4 } = require('uuid'); // Biblioteca UUID para gerar tokens únicos

class PasswordToken {

    async create(email) {
        try {
            const user = await User.findByEmail(email);

            if (!user) {
                return { status: false, err: "The email does not exist" };
            }

            const token = uuidv4();

            await knex('passwordtokens').insert({
                user_id: user.id,
                used: 0,
                token: token
            });

            return { status: true, token: token };

        } catch (error) {
            console.error(error);
            return { status: false, err: "An error occurred while creating the token" };
        }
    }

    async validate(token) {
        try {
            const result = await knex.select().where({ token: token }).table("passwordtokens");

            if (result != undefined && result.length > 0) {
                const tk = result[0];

                if (tk.used) {
                    return { status: false };
                } else {
                    return { status: true, tk };
                }
            } else {
                return { status: false };
            }
        } catch (error) {
            console.error(error);
            return { status: false, err: "An error occurred while validating the token" };
        }
    }

    async setUsed(token) {

        await knex.update({ used: 1 }).where({ token: token }).table("passwordtokens")
    }
}

module.exports = new PasswordToken();
