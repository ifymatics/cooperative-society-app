import { Request, Response, NextFunction } from 'express';


import { BadRequestError } from '.././errors/bad-request-error';
import { User } from '.././models/user';
import { Enterprise } from '.././models/enterprise';
import { PasswordManager } from '../services/password-manager';

export class UserController {


    static async signIn(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;


        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {

            throw new BadRequestError('Invalid credentials');
        }

        const passwordsMatch = await PasswordManager.compare(
            existingUser.password,
            password
        );

        if (!passwordsMatch) {
            throw new BadRequestError('Invalid Credentials');
        }
        const { uid } = existingUser;
        // console.log(uid)
        const enterpriseMemberData = await Enterprise.findOne({ uuid: uid });

        if (!enterpriseMemberData) throw new BadRequestError('Enterprise member record not found');


        // Generate JWT
        const data = { userData: existingUser, enterpriseData: enterpriseMemberData };
        const jwtToken = PasswordManager.generateToken(data);


        res.status(200).send({
            status: true,
            data: {
                jwtToken,
                data: existingUser,
                enterprise: enterpriseMemberData
            },
            message: 'Your Login was successful'

        });
    }


    static async  signup(req: Request, res: Response) {


        let { email, password, firstName, lastName,
            tel, pin, maritalStatus, isTelVerified,
            isNigeria, isAdmin, isAgent, isDev,
            uid, timestamp, nairaPurseNumber,
            bonusPurseNumber, incomePurseNumber,
            esusuPurseNumber, loanPurseNumber,
            insurancePurseNumber, assurancePurseNumber,
            pensionPurseNumber, housingPurseNumber,
            educationPurseNumber, isEmailVerified,
            lastModified, homeAddress, postalCode,
            cityTownOfResident, stateRegionProvinceOfResident,
            countryOfResident, cityTownOfOrigin,
            gender, isEnabled } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email already in use');
        }
        password = PasswordManager.generatePassword(password)

        const user = User.build({
            email, password, firstName, lastName,
            tel, pin, maritalStatus, isTelVerified,
            isNigeria, isAdmin, isAgent, isDev,
            uid, timestamp, nairaPurseNumber,
            bonusPurseNumber, incomePurseNumber,
            esusuPurseNumber, loanPurseNumber,
            insurancePurseNumber, assurancePurseNumber,
            pensionPurseNumber, housingPurseNumber,
            educationPurseNumber, isEmailVerified,
            lastModified, homeAddress, postalCode,
            cityTownOfResident, stateRegionProvinceOfResident,
            countryOfResident, cityTownOfOrigin, gender, isEnabled
        });
        //console.log(user)
        try {
            const savedUser = await user.save();

            // Generate JWT
            const data = { userData: savedUser };
            const jwtToken = PasswordManager.generateToken(data);

            const userResponse = {
                status: true,
                data: {
                    jwtToken,
                    data: user
                },
                message: 'Your signup was successful'

            }
            res.status(201).send(userResponse);

        }
        catch (err) {
            console.log(err)
        }

    }
    static async createEnterprise(req: Request, res: Response) {

        let { csl,
            ety,
            userEmail,
            enterpriseName,
            euid,
            position,
            level,
            status,
            tel,
            uuid,

            timestamp,
        } = req.body;


        const enterpriseMember = Enterprise.build({
            csl,
            ety,
            userEmail,
            enterpriseName,
            euid,
            position,
            level,
            status,
            tel,
            uuid,

            timestamp
        });

        try {
            const createdMember = await enterpriseMember.save();


            const data = { memberData: createdMember };


            const response = {
                status: true,
                data: {

                    data: data
                },
                message: 'member was created successfully'

            }
            res.status(201).send(response);

        }
        catch (err) {
            console.log(err)
        }
    }
}
