import { AUTH_ROUTES, RECIPES_ROUTES } from '@mocks/handlers';
import { MockRoute } from '@mocks/router/mock-route.model';

export const MOCK_ROUTES: MockRoute[] = [...RECIPES_ROUTES, ...AUTH_ROUTES];
