// Shared sessionStorage key for the restaurant picked on RestaurantChooser —
// kept in one place since both RestaurantChooser (sets it) and Header's
// "Сменить ресторан" button (clears it) need to agree on it.
const CHOSEN_RESTAURANT_KEY = "khinkali-dom:chosen-restaurant";

export function getChosenRestaurantId(): string | null {
  return sessionStorage.getItem(CHOSEN_RESTAURANT_KEY);
}

export function setChosenRestaurantId(id: string): void {
  sessionStorage.setItem(CHOSEN_RESTAURANT_KEY, id);
}

export function clearChosenRestaurant(): void {
  sessionStorage.removeItem(CHOSEN_RESTAURANT_KEY);
}
