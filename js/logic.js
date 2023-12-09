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

function getLastBooksCatalogNumber() {
  var minCatalogNUmber = 1000;
  for (var book of BOOKS) {
    let book_is_not_order_item = !ORDERS_ITEMS_IDS.includes(book["CatalogNumber"]);
    let book_catalog_number_is_bigger = book['CatalogNumber'] > minCatalogNUmber;
    if (book_is_not_order_item && book_catalog_number_is_bigger) {
      minCatalogNUmber = book['CatalogNumber'];
    }
    
  }
  return minCatalogNUmber;
}

function addNewBook() {
  const emptyBookStructure = Object.fromEntries(
    Object.keys(BOOKS[0]).map(key => [key, undefined])
  );
  const newEmptyBook = { ...emptyBookStructure };
  var lastBooksCatalogNumber = getLastBooksCatalogNumber();
  newEmptyBook['CatalogNumber'] = lastBooksCatalogNumber + 1;
  BOOKS.push(newEmptyBook);
  display_books();
  alert("ספר נוסף בתחתית הרשימה");
}
