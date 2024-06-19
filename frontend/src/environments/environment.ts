export const environment = {
  production: false,
  backendAuth: {
    login: '/api/auth/login',
    register: '/api/auth/register'
    //updateAccount: '/api/auth/update',
  },
  backendProducts: {
    products: '/api/products',
    search: '/api/search'
  },
  backendProfile: {
    profile: '/api/user/profile',
    updateProfile: '/api/user/profile'
  }
  //backendCollections: '/api/products/collections',
  //backendCreditCards: '/api/credit-cards',
  //backendCheckout: '/api/checkout',
};