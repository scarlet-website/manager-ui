function getDOMs() {
  const books_list = document.getElementById("books_list");
}

async function display_books() {
  try {
    const books = await get_books_from_db();
    let output = "";
    if (books) {
      for (const book of books) {
        console.log(book);
        output += '<div class="book" id="book">';

        // Catalog Number
        output +=
          '<span><span class="book_title">Catalog Number:</span> ' +
          book["CatalogNumber"] +
          "</span>";

        // Description
        output += "<span>";
        output += '<span class="book_title block">כותרת</span>';

        let description_element = document.createElement("textarea");
        description_element.className = "description_textarea";
        description_element.id = book["CatalogNumber"] + "_description";
        if (!is_book_edited(book["CatalogNumber"])) {
          description_element.disabled = true;
        }
        description_element.textContent = book["Description"];
        output += description_element.outerHTML;

        output += "</span>";

        // Info
        output += "<span>";
        output += '<span class="book_title block">פירוט</span>';

        let info_element = document.createElement("textarea");
        info_element.className = "info_textarea";
        info_element.id = book["CatalogNumber"] + "_info";
        if (!is_book_edited(book["CatalogNumber"])) {
          info_element.disabled = true;
        }
        info_element.textContent = book["Info"];
        output += info_element.outerHTML;
        output += "</span>";

        // UnitPricePrice
        output += "<span>";
        output += '<span class="book_title block">מחיר</span>';
        let price_element = document.createElement("textarea");
        price_element.className = "price_textarea";
        price_element.id = book["CatalogNumber"] + "_price";
        price_element.textContent = book["UnitPrice"];
        if (!is_book_edited(book["CatalogNumber"])) {
          price_element.disabled = true;
        }
        output += price_element.outerHTML;
        output += "</span>";

        // NotRealUnitPrice
        output += "<span>";
        output += '<span class="book_title block">מחיר לפני הנחה</span>';
        not_real_price_element = document.createElement("textarea");
        not_real_price_element.className = "price_textarea";
        not_real_price_element.id = book["CatalogNumber"] + "_not_real_price";
        not_real_price_element.textContent = book["NotRealUnitPrice"];
        if (!is_book_edited(book["CatalogNumber"])) {
          not_real_price_element.disabled = true;
        }
        output += not_real_price_element.outerHTML;
        output += "</span>";

        // inStock
        output += "<span>";
        output += '<span class="book_title block">קיים במלאי</span>';

        let in_stock_element = document.createElement("input");
        in_stock_element.type = "checkbox";
        if (book["inStock"]) {
          output += "a";
          in_stock_element.checked = true;
        } else {
          output += "b";
          in_stock_element.checked = false;
        }
        if (!is_book_edited(book["CatalogNumber"])) {
          in_stock_element.disabled = true;
        } else {
          in_stock_element.disabled = false;
        }
        output += in_stock_element.outerHTML;
        output += "</span>";

        // Image
        let image_src = "data:image/jpeg;base64," + book.ImageData;
        output += '<span class="block center">';
        output += '<img class="book_image" src="' + image_src + '">';
        output += "</span>";

        // Edit button
        if (!is_book_edited(book["CatalogNumber"])) {
          output +=
            '<input type="button" class="edit_button" value="Edit" onclick="edit_book(' +
            book["CatalogNumber"] +
            ');">';
        } else {
          output +=
            '<input type="button" class="edit_button" value="Save" onclick="save_book(' +
            book["CatalogNumber"] +
            ');">';
        }

        output += "</div>";
      }
    } else {
      output += '<div class="no_books_message">...טוען</div>';
    }
    books_list.innerHTML = output;
  } catch (error) {
    console.error("Error:", error);
  }
}
