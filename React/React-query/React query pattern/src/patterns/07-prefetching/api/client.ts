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

const initialContacts = new Array(500).fill(0).map(() => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number({ style: "international" }),
  address: faker.location.secondaryAddress(),
}));

export const client = {
  async getContacts(page: number, count: number) {
    await sleep();
    const { items, pagesCount, hasNext } = paginate(
      initialContacts,
      page,
      count
    );
    return {
      contacts: items,
      pagination: { page, pagesCount, hasNext },
    };
  },
  async getContact(contactId: string) {
    await sleep();
    return initialContacts.find((contact) => contact.id === contactId);
  },
};
function paginate<T>(items: T[], page: number, count: number) {
  const start = (page - 1) * count;
  const end = start + count;
  const paginatedItems = items.slice(start, end);
  const pagesCount = Math.ceil(items.length / count);
  const hasNext = page < pagesCount;

  return { items: paginatedItems, pagesCount, hasNext };
}
