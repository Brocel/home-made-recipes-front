import { FeatureData } from '@models/features/feature-data.model';
import { LeftPanelItem } from '@models/features/left-panel-item.model';
import { FEATURE_ROUTES } from './feature-data.util';

export const RECIPES_ROUTES = {
  list: 'list',
  add: 'add',
  edit: 'edit',
  search: 'search',
  see: 'recipe',
};

export const RECIPES_LABEL = {
  list: 'feature.recipes.list.title',
  add: 'feature.recipes.add.title',
  edit: 'feature.recipes.edit.title',
  search: 'feature.recipes.search.search',
  see: 'feature.recipes.see.title',
};

export const RECIPES_DESCRIPTION = {
  list: 'feature.recipes.list.description',
  add: 'feature.recipes.add.description',
  edit: 'feature.recipes.edit.description',
  search: 'feature.recipes.search.description',
  see: 'feature.recipes.see.description',
};

export const RECIPES_IMAGES = {
  list: 'assets/list.png',
  add: 'assets/add.png',
  edit: 'assets/edit.png',
  search: 'assets/search.png',
  see: 'assets/dish.png',
};

export const RECIPE_LIST_DATA: FeatureData = {
  path: RECIPES_ROUTES.list,
  title: RECIPES_LABEL.list,
  description: RECIPES_DESCRIPTION.list,
  image: RECIPES_IMAGES.list,
};

export const RECIPE_ADD_DATA: FeatureData = {
  path: RECIPES_ROUTES.add,
  title: RECIPES_LABEL.add,
  description: RECIPES_DESCRIPTION.add,
  image: RECIPES_IMAGES.add,
};

export const RECIPE_EDIT_DATA: FeatureData = {
  path: RECIPES_ROUTES.edit,
  title: RECIPES_LABEL.edit,
  description: RECIPES_DESCRIPTION.edit,
  image: RECIPES_IMAGES.edit,
};

export const RECIPE_SEARCH_DATA: FeatureData = {
  path: RECIPES_ROUTES.search,
  title: RECIPES_LABEL.search,
  description: RECIPES_DESCRIPTION.search,
  image: RECIPES_IMAGES.search,
};

export const RECIPE_SEE_DATA: FeatureData = {
  path: RECIPES_ROUTES.see,
  title: RECIPES_LABEL.see,
  description: RECIPES_DESCRIPTION.see,
  image: RECIPES_IMAGES.see,
};

export const RECIPES_SIDEBAR_ITEMS: LeftPanelItem[] = [
  {
    label: RECIPES_LABEL.list,
    description: RECIPES_DESCRIPTION.list,
    path: [FEATURE_ROUTES.recipes, RECIPES_ROUTES.list],
    image: RECIPES_IMAGES.list,
  }, // TODO: complete when refactoring panels
].sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));
