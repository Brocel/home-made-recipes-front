import { FeatureData } from '@models/features/feature-data.model';
import { MenuItem } from '@models/features/menu-item.model';

export interface AppRouteData {
  feature?: FeatureData;
  menu?: MenuItem[];
}
