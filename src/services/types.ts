export interface IIngredientProp {
  _id: string;
  elementId: string;
  name: string;
  image: string;
  image_mobile: string;
  image_large: string;
  price: number;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  type: string;
}

export interface ILoginProps {
  email: string;
  password: string;
}

export interface ISignupProps extends ILoginProps {
  name: string;
}

export interface IUpdatePasswordProps {
  token: string;
  password: string;
}

export interface IAuthState {
  user: IUserState | null;
  status: string;
  errorMessage?: string;
}

export interface IUserState {
  email?: string;
  password?: string;
  name?: string;
}

export interface IConstructorProps extends IIngredientProp {
  elementId: string;
}

export interface IIngredientsState {
  data: IIngredientProp[];
  status: string;
  error: string;
  selectedIngredient?: IIngredientProp | null;
  ingredientsInConstructor: {
    bun?: IIngredientProp | null;
    ingredients?: IIngredientProp[];
  };
  order: any;
}

export interface IOrderState {
  order: { number: number } | null;
  status: string;
}
