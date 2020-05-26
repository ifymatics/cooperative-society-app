import request from 'supertest';
import { app } from '../../app';

it('returns 201 on successfull signup', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "ifymatics",
            firstName: "ifeanyi",
            lastName: "okorie",
            pin: '1234',
            tel: '1234567891',
            gender: "male",
            maritalStatus: 'married',
            isNigeria: true,
            isDev: true,
            isAdmin: true,
            isAgent: true,
            isEnabled: true,
            uid: '123456654321',
            timestamp: Date.now(),
            nairaPurseNumber: "1230987",
            bonusPurseNumber: "01910171017",
            incomePurseNumber: "1230987",
            esusuPurseNumber: "01910171017",
            loanPurseNumber: "1230987",
            insurancePurseNumber: "01910171017",
            assurancePurseNumber: "1230987",
            pensionPurseNumber: "01910171017",
            housingPurseNumber: "1230987",
            educationPurseNumber: "01910171017",


        })
        .expect(201);
});
it('returns 201 on successfull creation of enterprise member', async () => {
    await request(app)
        .post('/api/users/enterprise-create')
        .send({
            csl: "MERCHANT",
            ety: "COOPERATIVE-ENTERPRISE",
            userEmail: "test@test.com",
            enterpriseName: "commercial-Retail",
            euid: "1235645",
            position: "MEMBER",
            level: 2,
            status: true,
            tel: '1234567891',
            uuid: '123456654321',

            timestamp: Date.now(),


        })
        .expect(201);
});


it('returns 400 with an invalid email login', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: "testtest.com",
            password: "ifymatics"
        })
        .expect(400);
});
it('returns 200 on successfull login', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "ifymatics"
        })
        .expect(200);
});

it('returns 400 with an  unauthorized access', async () => {
    await request(app)
        .post('/api/users/is-authorized')
        .send({
            email: "test@test.com",
            password: "ifymatics"
        })
        .expect(401);
});