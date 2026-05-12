import { FeatureData } from '@models/features/feature-data.model';

export const FEATURE_ROUTES = {
  home: 'home',
  products: 'products',
  recipes: 'recipes',
  profile: 'profile', // TODO
  planner: 'week-planner', // TODO
};

export const FEATURE_TITLE = {
  home: 'feature.home.title',
  products: 'feature.products.title',
  recipes: 'feature.recipes.title',
  profile: 'feature.profile.title',
  planner: 'feature.planner.title',
};

export const FEATURE_DESCRIPTION = {
  home: 'feature.home.lead',
  products: 'feature.products.description',
  recipes: 'feature.recipes.description',
  profile: 'feature.profile.description',
  planner: 'feature.planner.description',
};

export const FEATURE_IMAGE = {
  home: 'assets/recipe-book.png',
  products: 'assets/ingredients.png',
  recipes: 'assets/recipe-book.png',
  profile: 'assets/default-avatar.png',
  planner: 'assets/planner.png',
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
  path: FEATURE_ROUTES.profile,
  title: FEATURE_TITLE.profile,
  description: FEATURE_DESCRIPTION.profile,
  image: FEATURE_IMAGE.profile,
};

export const PLANNER_DATA: FeatureData = {
  path: FEATURE_ROUTES.planner,
  title: FEATURE_TITLE.planner,
  description: FEATURE_DESCRIPTION.planner,
  image: FEATURE_IMAGE.planner,
};
