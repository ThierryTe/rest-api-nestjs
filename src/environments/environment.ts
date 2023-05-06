// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  auth:{
  LOGIN_API: "http://localhost:2022/api/auth/login",
  INSCRIPTION_API: "http://localhost:2022/api/auth/signup",
  ME_API: "http://localhost:2022/api/auth/me",
  USERS_API:"http://localhost:2022/api/auth/users",
  REFRESH_TOKEN_API: "http://localhost:2022/api/auth/refreshtoken",
  CHECK_IF_AM_LOGIN:''
  },
  APP:{
   LOCATION_API:"http://localhost:2022/api/locations",
   CATEGORIE_API:'http://localhost:2022/api/categories',
   PRODUIT_API:'http://localhost:2022/api/produits',
  },
  FRONTEND_ROUTES:{
    ADMIN:"",
    VUE_ADMIN: "",
    LOGIN:"login",
    USERS: "users",
    INSCRIPTION: "inscription",
    CATEGORIE:"categorie",
    PRODUIT:"produit"
  },
  url: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
