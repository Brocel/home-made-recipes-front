import { ProductFormField } from '@forms/constants/product.fields';
import { FormValidationMessages } from '@forms/types/validation.type';

/**
 * Validation messages for Add/Edit Product form.
 * Maps form field names to error message translation keys.
 *
 * @example
 * {
 *   name: {
 *     required: 'form.validation.product_name_required',
 *   },
 *   ingredient_type: {
 *     required: 'form.validation.ingredient_type_required',
 *   },
 * }
 */
export const PRODUCT_VALIDATION_MESSAGES = {
  name: {
    required: 'form.validation.product_name_required',
  },
  ingredient_type: {
    required: 'form.validation.ingredient_type_required',
  },
} satisfies FormValidationMessages<ProductFormField>;
