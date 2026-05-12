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

export const RECIPES_SIDEBAR_ITEMS: LeftPanelItem[] = [
  {
    label: RECIPES_LABEL.list,
    description: RECIPES_DESCRIPTION.list,
    path: [FEATURE_ROUTES.recipes, RECIPES_ROUTES.list],
    image: RECIPES_IMAGES.list,
  }, // TODO: complete when refactoring panels
].sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));
