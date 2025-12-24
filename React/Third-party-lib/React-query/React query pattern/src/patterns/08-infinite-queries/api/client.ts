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

const elementsByPage = 50;
export const client = {
  async getContacts({ cursor }: { cursor: string | undefined }) {
    await sleep();
    const pageFromCursor = cursor === undefined ? 1 : Number(cursor);
    const { items } = paginate(
      initialContacts,
      pageFromCursor + 1,
      elementsByPage
    );
    return {
      contacts: items,
      nextCursor: pageFromCursor + 1 + "",
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
