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
  pagination: { page:number, pagesCount:number, hasNext :boolean}
};

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

const LOCAL_STORAGE_KEY = "contacts";

// Load contacts from localStorage or generate and store them
function loadContacts(): Contact[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data) as Contact[];
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_KEY); // clean up bad data
    }
  }
  const generated = new Array(500).fill(0).map(() => ({
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number({ style: "international" }),
    address: faker.location.secondaryAddress(),
  }));
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(generated));
  return generated;
}

// Save contacts to localStorage
function saveContacts(updatedContacts: Contact[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContacts));
}

// Contacts are loaded once and used throughout
let contacts = loadContacts();

export const client = {
  async getContacts(page: number, count: number): Promise<GetContactsResponse> {
    await sleep();
    const { items, pagesCount, hasNext } = paginate(contacts, page, count);
    return {
      contacts: items,
      pagination: { page, pagesCount, hasNext },
    };
  },

  async getContact(contactId: string) {
    await sleep();
    return contacts.find((contact) => contact.id === contactId);
  },

  async deleteContact(contactId: string) {
    await sleep();
    contacts = contacts.filter((contact) => contact.id !== contactId);
    saveContacts(contacts);
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
