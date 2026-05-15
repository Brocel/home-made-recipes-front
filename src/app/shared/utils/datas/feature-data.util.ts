import { FeatureData } from '@models/features/feature-data.model';
import { MenuItem } from '@models/features/menu-item.model';

export const FEATURE_ROUTES = {
  home: 'hmr',
  products: 'products',
  recipes: 'recipes',
  dashboard: 'dashboard', // TODO
  planner: 'week-planner', // TODO
};

export const FEATURE_TITLE = {
  home: 'feature.home.title',
  products: 'feature.products.title',
  recipes: 'feature.recipes.title',
  dashboard: 'feature.dashboard.title',
  planner: 'feature.planner.title',
};

export const FEATURE_DESCRIPTION = {
  home: 'feature.home.lead',
  products: 'feature.products.description',
  recipes: 'feature.recipes.description',
  dashboard: 'feature.dashboard.description',
  planner: 'feature.planner.description',
};

export const FEATURE_IMAGE = {
  home: 'assets/recipe-book.png',
  products: 'assets/ingredients.png',
  recipes: 'assets/recipe-book.png',
  dashboard: 'assets/dashboard.png',
  planner: 'assets/planner.png',
};

export const FEATURE_WRAPPER: FeatureData = {
  path: 'syntax-social',
  title: 'Syntax Social',
  description: 'Organize your social life!',
  image: '',
};

export const HOME_DATA: FeatureData = {
  path: FEATURE_ROUTES.home,
  title: FEATURE_TITLE.home,
  description: FEATURE_DESCRIPTION.home,
  image: FEATURE_IMAGE.home,
};

export const PRODUCTS_DATA: FeatureData = {
  path: FEATURE_ROUTES.products,
  title: FEATURE_TITLE.products,
  description: FEATURE_DESCRIPTION.products,
  image: FEATURE_IMAGE.products,
};

export const RECIPES_DATA: FeatureData = {
  path: FEATURE_ROUTES.recipes,
  title: FEATURE_TITLE.recipes,
  description: FEATURE_DESCRIPTION.recipes,
  image: FEATURE_IMAGE.recipes,
};

export const PROFILE_DATA: FeatureData = {
  path: FEATURE_ROUTES.dashboard,
  title: FEATURE_TITLE.dashboard,
  description: FEATURE_DESCRIPTION.dashboard,
  image: FEATURE_IMAGE.dashboard,
};

export const PLANNER_DATA: FeatureData = {
  path: FEATURE_ROUTES.planner,
  title: FEATURE_TITLE.planner,
  description: FEATURE_DESCRIPTION.planner,
  image: FEATURE_IMAGE.planner,
};

export const HOME_MENU_ITEMS: MenuItem[] = [
  {
    label: FEATURE_TITLE.products,
    description: FEATURE_DESCRIPTION.products,
    path: [FEATURE_ROUTES.products],
    image: FEATURE_IMAGE.products,
  },
  {
    label: FEATURE_TITLE.recipes,
    description: FEATURE_DESCRIPTION.recipes,
    path: [FEATURE_ROUTES.recipes],
    image: FEATURE_IMAGE.recipes,
  },
  {
    label: FEATURE_TITLE.dashboard,
    description: FEATURE_DESCRIPTION.dashboard,
    path: [FEATURE_ROUTES.dashboard],
    image: FEATURE_IMAGE.dashboard,
  },
  {
    label: FEATURE_TITLE.planner,
    description: FEATURE_DESCRIPTION.planner,
    path: [FEATURE_ROUTES.planner],
    image: FEATURE_IMAGE.planner,
  },
].sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));
