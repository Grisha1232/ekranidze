// Shared sessionStorage keys for the restaurant (and, for a multi-address
// one like "Мама хинкали", the specific address/card) picked on
// RestaurantChooser — kept in one place since RestaurantChooser (sets
// both), Header (reads the address to narrow which metro badges it shows),
// and Header's "Сменить ресторан" button (clears both) all need to agree
// on them.
const CHOSEN_RESTAURANT_KEY = "khinkali-dom:chosen-restaurant";
const CHOSEN_ADDRESS_KEY = "khinkali-dom:chosen-address";

export function getChosenRestaurantId(): string | null {
  return sessionStorage.getItem(CHOSEN_RESTAURANT_KEY);
}

export function getChosenAddressId(): string | null {
  return sessionStorage.getItem(CHOSEN_ADDRESS_KEY);
}

export function setChosenRestaurant(restaurantId: string, addressId?: string): void {
  sessionStorage.setItem(CHOSEN_RESTAURANT_KEY, restaurantId);
  if (addressId) {
    sessionStorage.setItem(CHOSEN_ADDRESS_KEY, addressId);
  } else {
    sessionStorage.removeItem(CHOSEN_ADDRESS_KEY);
  }
}

export function clearChosenRestaurant(): void {
  sessionStorage.removeItem(CHOSEN_RESTAURANT_KEY);
  sessionStorage.removeItem(CHOSEN_ADDRESS_KEY);
}
