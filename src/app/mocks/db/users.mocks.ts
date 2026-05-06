import { User } from '@models/user';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    first_name: 'Admin',
    last_name: 'Admin',
    username: 'admin',
    email: 'admin.admin@admin.com',
    birth_date: '1966-06-06',
    inscription_date: new Date().toISOString(),
    roles: [{ id: 1, name: 'ADMIN' as any }],
  },
  {
    id: '2',
    first_name: 'Maxime',
    last_name: 'Geenens',
    username: 'Brocel',
    email: 'maxime@example.com',
    birth_date: '1988-03-02',
    inscription_date: '2023-01-01',
    roles: [
      {
        id: 1,
        name: 'USER',
      },
    ],
  },
  {
    id: '3',
    first_name: 'Mayara',
    last_name: 'Barriento Lopes Geenens',
    username: 'Bundinha',
    email: 'mayara@example.com',
    birth_date: '1984-04-19',
    inscription_date: '2023-01-01',
    roles: [
      {
        id: 1,
        name: 'USER',
      },
    ],
  },
];
