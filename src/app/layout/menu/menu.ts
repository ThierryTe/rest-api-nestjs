import { Menu } from './menu.model'; 

export const menuItems = [ 
    new Menu (1, 'ADMIN_NAV.DASHBOARD', '/', null, 'dashboard', null, false, 0),
    new Menu (2, 'ADMIN_NAV.USERS', '/users', null, 'group_add', null, false, 0), 
    new Menu (3, 'CATEGORIE', '/categorie', null, 'location_on', null, false, 0),
    new Menu (4, 'PRODUIT', '/produit', null, 'location_on', null, false, 0),
]