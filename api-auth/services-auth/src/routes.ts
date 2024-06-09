import { authRouters } from "@Authentification/auth/routes/routes";
import { permissionRouters } from "@Authentification/permission/routes/admin.routes";
import { roleRouters } from "@Authentification/role/routes/admin.routes";
import { emailRouters } from "@Email/template/routes/admin.routes";
import { categoryRouters } from "@Institution/category/routes/admin.routes";
import { institutionRouters } from "@Institution/institution/routes/admin.routes";
import { planRouters } from "@Institution/plan/routes/admin.routes";
import { subscriptionRouters } from "@Institution/subscription/routes/admin.routes";
import { migrationRouters } from "@Migrations/routes/admin.routes";
import { networkRouters } from "@Network/social/routes/admin.routes";
import { bankRouters } from "@Payment/bank/routes/admin.routes";
import { currencyRouters } from "@Payment/currency/routes/admin.routes";
import { paymentMethodRouters } from "@Payment/payment.method/routes/admin.routes";
import { paymentRouters } from "@Payment/payment/routes/admin.routes";
import { periodRouters } from "@Payment/period/routes/admin.routes";
import { peopleRouters } from "@People/person/routes/admin.routes";
import { cityRouters } from "@Ubication/routes/city.admin.routes";
import { countryRouters } from "@Ubication/routes/country.admin.routes";
import { languageRouters } from "@Ubication/routes/language.admin.routes";
import { stateRouters } from "@Ubication/routes/state.admin.routes";
import { Router } from "express";


export const routes: Router[] = [
  authRouters,
  permissionRouters,
  roleRouters,

  emailRouters,
  migrationRouters,

  languageRouters,
  countryRouters,
  cityRouters,
  stateRouters,

  peopleRouters,
  
  currencyRouters,
  paymentMethodRouters,
  periodRouters,
  bankRouters,

  networkRouters,

  institutionRouters,
  categoryRouters,
  planRouters,
  subscriptionRouters,
  paymentRouters
];