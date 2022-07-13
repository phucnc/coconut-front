import { Asserts, mixed, number, array, object, string } from 'yup';
import { ExtraProductCategories, ProductCategories } from 'components/pages/explore/form';
import { useTranslation } from "react-i18next";

export const createSchema = object({
  file: mixed().required('파일 크기가 100Mb를 넘기 때문에 업로드 불가 합니다.'),
  // onsale: boolean(),
  // instantsale: boolean(),
  // instantsaleprice: number()
  //   .notRequired()
  //   .when('instantsale', (instantsale: boolean, schema: NumberSchema) => {
  //     return instantsale ? schema.required('Please input sale price.') : schema;
  //   }),
  instantsaleprice: number().typeError('Please input sale price.').required('Please input sale price.'),
  unit: number().required(),
  // unlockonbuy: boolean(),
  // lockedcontent: string(),
  // collection: string().required('Please choose collection.'),
  name: string().required('Please enter product name.'),
  blockchain: number().required('Please enter blockchain name.'),
  description: string(),
  address: string(),
  // royalties: number().typeError('Please enter royalties.').required('Please enter royalties.'),
  // properties: string().notRequired(),
  categories: array(
    object().shape({
      name: string().required(),
      id: number().required(),
    })
  ).min(1, 'Please select at least 1 category.'),
});
export const createSchemaData = object({
  instantsaleprice: number().typeError('Please input sale price.').required('Please input sale price.'),
  unit: number().required(),
  address: string(),
});

export type CreateForm = Asserts<typeof createSchema>;
export type CreateFormData = Asserts<typeof createSchemaData>;

export const Unit = ['BNB', 'BUSD', 'CONUT'];
export const Blockchain = ['Binance Smart Chain', 'Klaytn'];
export const Categories = [...ExtraProductCategories].map((category, idx) => {
  return { id: idx, name: category };
});

export const initialValue: CreateForm = {
  // onsale: true,
  name: '',
  file: undefined,
  // collection: '',
  description: '',
  address:'',
  blockchain:0,
  // instantsale: true,
  instantsaleprice: 0,
  unit: 0,
  // lockedcontent: '',
  // unlockonbuy: false,
  // royalties: 0,
  // properties: undefined,
  categories: [],
};
export const initialValueData: CreateFormData = {
  file: undefined,
  address:'',
  instantsaleprice: 0,
  unit: 0,
};
