import { User } from '@models/user/user';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin.admin@admin.com',
    roles: [{ id: 1, name: 'ADMIN' as any }],
    profile: {
      id: '1',
      first_name: 'Admin',
      last_name: 'Admin',
      username: 'admin',
      birth_date: '1966-06-06',
      inscription_date: new Date().toISOString(),
      avatar: '',
      recipes: [],
      favorite_recipes: [],
    },
  },
  {
    id: '2',
    email: 'maxime@example.com',
    roles: [
      {
        id: 1,
        name: 'USER',
      },
    ],
    profile: {
      id: '2',
      first_name: 'Maxime',
      last_name: 'Geenens',
      username: 'Brocel',
      birth_date: '1988-03-02',
      inscription_date: '2023-01-01',
      avatar: '',
      recipes: [],
      favorite_recipes: [],
    },
  },
  {
    id: '3',
    email: 'mayara@example.com',
    roles: [
      {
        id: 1,
        name: 'USER',
      },
    ],
    profile: {
      id: '3',
      first_name: 'Mayara',
      last_name: 'Barriento Lopes Geenens',
      username: 'Bundinha',
      birth_date: '1984-04-19',
      inscription_date: '2023-01-01',
      avatar: '',
      recipes: [],
      favorite_recipes: [],
    },
  },
];
