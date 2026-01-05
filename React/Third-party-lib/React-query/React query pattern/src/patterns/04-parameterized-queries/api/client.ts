import { faker } from "@faker-js/faker";

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
};

export type GetContactsResponse = {
  contacts: Contact[];
};

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

const initialContacts = new Array(50).fill(0).map(() => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number({ style: "international" }),
  address: faker.location.secondaryAddress(),
}));

export const client = {
  async getContacts() {
    await sleep();
    return { contacts: initialContacts };
  },
  async getContact(contactId: string) {
    await sleep();
    return initialContacts.find((contact) => contact.id === contactId);
  },
};
