import {faker} from '@faker-js/faker';

export class Helper {
    async generateUserData() {
        const firstNames = faker.person.firstName();
        const lastNames =  faker.person.lastName();
        const middleNames = faker.person.middleName();
        const number = faker.number.int({min: 1000, max: 9999});

        return {
            firstName: firstNames,
            lastName: lastNames,
            middleName: middleNames,
            number: number
        }
    }

}

