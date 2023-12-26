let BOOKS = [];
let BANNERS = [];
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
    let book_is_not_order_item = !ORDERS_ITEMS_IDS.includes(
      book["CatalogNumber"]
    );
    let book_catalog_number_is_bigger =
      book["CatalogNumber"] > minCatalogNUmber;
    if (book_is_not_order_item && book_catalog_number_is_bigger) {
      minCatalogNUmber = book["CatalogNumber"];
    }
  }
  return minCatalogNUmber;
}

function getLastBannerId() {
  var minId = 970111;
  for (var banner of BANNERS) {
    let banner_id_is_bigger = parseInt(banner.banner_id) > minId;
    if (banner_id_is_bigger) {
      minId = banner["banner_id"];
    }
  }
  return minId;
}

function addNewBook() {
  const emptyBookStructure = Object.fromEntries(
    Object.keys(BOOKS[0]).map((key) => [key, undefined])
  );
  const newEmptyBook = { ...emptyBookStructure };
  var lastBooksCatalogNumber = getLastBooksCatalogNumber();
  newEmptyBook["CatalogNumber"] = lastBooksCatalogNumber + 1;
  BOOKS.push(newEmptyBook);
  display_books();
  alert("ספר נוסף בתחתית הרשימה");
}

const bannerStructure = {
  banner_id: undefined,
  ImageURL: undefined,
};

async function addNewBanner() {
  const newEmptyBanner = { ...bannerStructure };
  var lastBannerId = getLastBannerId();
  newEmptyBanner.banner_id = lastBannerId + 1;

  // Adding image
  const fileSelectedPromise = new Promise((resolve) => {
    let file_input = document.createElement("input");
    file_input.type = "file";
    file_input.style.display = "none";

    file_input.addEventListener("change", function (event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          console.log(`e.target.result: ${e.target.result}`);
          newEmptyBanner.ImageURL = e.target.result;
          // Resolve the Promise when the file is loaded
          resolve();
        };
        reader.readAsDataURL(file);
      }
    });

    // Trigger the file input click
    file_input.click();
  });
  await fileSelectedPromise;
  banner_data = { banner_id: newEmptyBanner.banner_id };
  await insert_banner_to_db(banner_data, newEmptyBanner.ImageURL);
  BANNERS.push(newEmptyBanner);
  await display_banners(true);
  console.log(`BANNERS: ${BANNERS}`);
}

async function delete_banner(banner_id) {
  console.log(`Delete: ${banner_id}`);

  const userResponse = window.confirm("האם למחוק את הבאנר?");
  if (!userResponse) return;
  // Delete banner data in db

  try {
    const delete_route_url = SERVER_ADDRESS + "/delete";
    const formData = new FormData();

    // Append the JSON book data as a field in the FormData
    formData.append(
      "json_data",
      JSON.stringify({
        token: localStorage.getItem("token"),
        insert_type: "banner",
        item_id: banner_id,
      })
    );

    const response = await fetch(delete_route_url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.text();
    } else if (response.status == 401) {
      alert("סיסמה שגויה");
    } else {
      throw new Error("Error delete book");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }

  console.log(`BEFORE: ${BANNERS}`);
  BANNERS = BANNERS.filter(function (banner) {
    return banner.banner_id !== banner_id;
  });
  console.log(`AFTER: ${BANNERS}`);

  await display_banners(true);
}
