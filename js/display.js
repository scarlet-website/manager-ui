function getDOMs() {
  const books_list = document.getElementById("books_list");
}

async function display_books() {
  await get_books();

  books_list.innerHTML = "";
  try {
    if (BOOKS) {
      BOOKS.forEach((book) => {
        console.log("book");
        let book_element = document.createElement("div");
        book_element.className = "book";
        book_element.id = "book";

        // ****************************************************************

        // Catalog Number
        let catalog_number = document.createElement("span");

        // Inner title
        let catalog_number_title = document.createElement("span");
        catalog_number_title.className = "book_title";
        catalog_number_title.textContent = "Catalog Number: ";

        // Inner value
        let catalog_number_value = document.createElement("span");
        catalog_number_value.textContent = book["CatalogNumber"];

        catalog_number.appendChild(catalog_number_title);
        catalog_number.appendChild(catalog_number_value);
        book_element.appendChild(catalog_number);

        // ****************************************************************

        // Description
        let description_element = document.createElement("span");
        description_element.classList.add("book_title");
        description_element.classList.add("block");
        description_element.textContent = "כותרת";

        // Description textarea
        let description_textarea_element = document.createElement("textarea");
        description_textarea_element.className = "description_textarea";
        description_textarea_element.id =
          book["CatalogNumber"] + "_description";
        if (!is_book_edited(book["CatalogNumber"])) {
          description_textarea_element.disabled = true;
        } else {
          description_textarea_element.disabled = false;
        }
        description_textarea_element.textContent = book["Description"];

        description_element.appendChild(description_textarea_element);
        book_element.appendChild(description_element);

        // ****************************************************************

        // Info
        let info_element = document.createElement("span");
        info_element.classList.add("book_title");
        info_element.classList.add("block");
        info_element.textContent = "פירוט";

        // Info textarea
        let info_textarea_element = document.createElement("textarea");
        info_textarea_element.className = "info_textarea";
        info_textarea_element.id = book["CatalogNumber"] + "_info";
        if (!is_book_edited(book["CatalogNumber"])) {
          info_textarea_element.disabled = true;
        } else {
          info_textarea_element.disabled = false;
        }
        info_textarea_element.textContent = book["Info"];

        book_element.appendChild(info_element);
        book_element.appendChild(info_textarea_element);

        // ****************************************************************

        // Unit price
        let unit_price_element = document.createElement("span");
        unit_price_element.classList.add("book_title");
        unit_price_element.classList.add("block");
        unit_price_element.textContent = "מחיר";

        // Unit price textarea
        let price_textarea_element = document.createElement("textarea");
        price_textarea_element.className = "price_textarea";
        price_textarea_element.id = book["CatalogNumber"] + "_price";
        price_textarea_element.textContent = book["UnitPrice"];
        if (!is_book_edited(book["CatalogNumber"])) {
          price_textarea_element.disabled = true;
        } else {
          price_textarea_element.disabled = false;
        }

        book_element.appendChild(unit_price_element);
        book_element.appendChild(price_textarea_element);

        // ****************************************************************

        // Not real unit price
        let not_real_price_element = document.createElement("span");
        not_real_price_element.classList.add("book_title");
        not_real_price_element.classList.add("block");
        not_real_price_element.textContent = "מחיר לפני הנחה";

        // Not real using price textarea
        let not_real_price_textarea_element =
          document.createElement("textarea");
        not_real_price_textarea_element.className = "price_textarea";
        not_real_price_textarea_element.id =
          book["CatalogNumber"] + "_not_real_price";
        not_real_price_textarea_element.textContent = book["NotRealUnitPrice"];
        if (!is_book_edited(book["CatalogNumber"])) {
          not_real_price_textarea_element.disabled = true;
        } else {
          not_real_price_textarea_element.disabled = false;
        }

        book_element.appendChild(not_real_price_element);
        book_element.appendChild(not_real_price_textarea_element);

        // ****************************************************************

        // In stock

        let in_stock_element = document.createElement("span");
        in_stock_element.classList.add("book_title");
        in_stock_element.classList.add("block");
        in_stock_element.textContent = "קיים במלאי";

        // In stock input
        let in_stock_input_element = document.createElement("input");
        in_stock_input_element.type = "checkbox";

        if (book["inStock"]) {
          in_stock_input_element.checked = true;
          in_stock_input_element.setAttribute("checked", "checked");
        } else {
          in_stock_input_element.checked = false;
          in_stock_input_element.removeAttribute("checked");
        }

        in_stock_input_element.addEventListener("click", function () {
          if (in_stock_input_element.checked) {
            console.log("Checking");
            book["inStock"] = true;
          } else {
            console.log("Not Checking");
            book["inStock"] = false;
          }
        });

        if (!is_book_edited(book["CatalogNumber"])) {
          in_stock_input_element.disabled = true;
        } else {
          in_stock_input_element.disabled = false;
        }

        book_element.appendChild(in_stock_element);
        book_element.appendChild(in_stock_input_element);

        // ****************************************************************

        //   // Image
        //   let image_src = "data:image/jpeg;base64," + book.ImageData;
        //   output += '<span class="block center">';
        //   output += '<img class="book_image" src="' + image_src + '">';
        //   output += "</span>";

        //   // Edit button
        //   if (!is_book_edited(book["CatalogNumber"])) {
        //     output +=
        //       '<input type="button" class="edit_button" value="Edit" onclick="edit_book(' +
        //       book["CatalogNumber"] +
        //       ');">';
        //   } else {
        //     output +=
        //       '<input type="button" class="edit_button" value="Save" onclick="save_book(' +
        //       book["CatalogNumber"] +
        //       ');">';
        //   }

        // ****************************************************************

        // Edit book button
        let edit_book_button = document.createElement("input");
        edit_book_button.type = "button";
        edit_book_button.className = "edit_button";

        if (!is_book_edited(book["CatalogNumber"])) {
          edit_book_button.value = "Edit";
          edit_book_button.addEventListener("click", function () {
            edit_book(book["CatalogNumber"]);
          });
        } else {
          edit_book_button.value = "Save";
          edit_book_button.addEventListener("click", function () {
            save_book(book["CatalogNumber"]);
          });
        }

        book_element.appendChild(edit_book_button);
        books_list.appendChild(book_element);
      });
    } else {
      // Loading
      let loading_element = document.createElement("div");
      loading_element.className = "no_books_message";
      loading_element.textContent = "...טוען";
      books_list.appendChild(loading_element);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
