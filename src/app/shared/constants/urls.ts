const BASE_URL = 'http://localhost:3000';

export const FOODS_URL = BASE_URL + '/api/foods';
export const FOODS_TAGS_URL = BASE_URL + '/api/foods/tags';
export const FOODS_BY_ID_URL = FOODS_URL + '/';
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_BY_TAG_URL = FOODS_URL + '/tag/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const ORDER_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDER_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL =
  ORDER_URL + '/newOrderForCurrentUser';
