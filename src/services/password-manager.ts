
import crypto from 'crypto';

import Crypt from 'cryptr';
import env from "dotenv";
env.config();

import jwt from 'jsonwebtoken';
const secret = process.env.ENCRYPTION_KEY ? process.env.ENCRYPTION_KEY : 'ndgdu7292nwhj8';
const crypt = new Crypt(secret);
const jwtKey = process.env.JWT_KEY ? process.env.JWT_KEY : 'ndgdu7292nwhj8';

//const jwtKey: string = process.env.JWT_KEY;  //string = config.get("JWT_KEY");


export class PasswordManager {

    /**
     * Generate new password hash
     * *i.e this is to strengthen users password*
     * @param pwd String
     */
    static generatePassword(pwdStr: String): string {
        return PasswordManager.hash(`${pwdStr}@foodmoni.com`).data
    }

    /**
 * Compares storedPassword and loginPassword 
 * @param [String]
 * 
 * return boolean
 */
    static async compare(storedPassword: string, suppliedPassword: string) {

        const hashedPassword = PasswordManager.generatePassword(suppliedPassword);

        return storedPassword === hashedPassword;
    }

    /** 
    * Generate hash from provider parameters
    * @param str:[String]
    */
    static hash(str: string) {

        var hash = crypto.createHash("sha512");

        hash.update(`${str}`);
        const output = hash.digest('hex');
        return { data: output };
    }

    static generateToken<T>(json: T): string {

        // check for empty data
        if (!json && Object.keys(json).length < 1) {
            throw Error("Invalid data object");
        }

        // encrypt payload
        const payload = PasswordManager.encrypt(JSON.stringify(json));

        // generate JWT token
        const token = jwt.sign({ data: payload }, jwtKey, { algorithm: "HS512", expiresIn: "30d", mutatePayload: true, })
        return token;
    }

    static encrypt(str: string): string {
        return crypt.encrypt(str);
    }

}

