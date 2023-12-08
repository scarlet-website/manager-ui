let BOOKS = [];
let EDITED_BOOKS_CATALOG_NUMBERS = [];

function edit_book(catalog_number) {
  EDITED_BOOKS_CATALOG_NUMBERS.push(catalog_number);
  display_books();
}

function save_book(catalog_number) {
  EDITED_BOOKS_CATALOG_NUMBERS.pop(catalog_number);
  display_books();
}

function is_book_edited(catalog_number) {
  return EDITED_BOOKS_CATALOG_NUMBERS.includes(catalog_number);
}

function save_password() {
  alert("סיסמה נשמרה.");
  localStorage.setItem("token", token_password_input.value);
}
