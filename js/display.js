function getDOMs() {
  const books_list = document.getElementById("books_list");
  const banners_list = document.getElementById("banners_list");
  const details_mark = document.getElementById("details_mark");
  const token_password_input = document.getElementById("token_password_input");
}

const ORDERS_ITEMS_IDS = [999991, 999992, 999993];

async function display_books(unload_book = false) {
  let BOOK_NUMBER_DISPLAY = 1;
  if (!unload_book) {
    await get_books();
  }

  books_list.innerHTML = "";
  try {
    if (BOOKS) {
      BOOKS.slice().reverse().forEach(async (book) => {
        if (!ORDERS_ITEMS_IDS.includes(book["CatalogNumber"])) {
          if (BOOK_NUMBER_DISPLAY > NUMBER_OF_BOOK_DISPLAY) {
            return;
          }
          BOOK_NUMBER_DISPLAY++;

          let book_element = document.createElement("div");
          book_element.className = "book";
          book_element.id = `book_${book["CatalogNumber"]}`;

          // ****************************************************************

          // Catalog Number
          let catalog_number = document.createElement("span");

          // Inner title
          let catalog_number_title = document.createElement("span");
          catalog_number_title.className = "book_title";
          catalog_number_title.textContent = "מספר קטלוג";

          // Inner value
          let catalog_number_value = document.createElement("span");
          catalog_number_value.classList.add("block");
          catalog_number_value.textContent = book["CatalogNumber"];

          catalog_number_value.disabled = true; // disabled for client to change catalog number

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
            hiddenElement(info_textarea_element);
            hiddenElement(info_element);
          } else {
            info_textarea_element.disabled = false;
            showElement(info_textarea_element);
            showElement(info_element);
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
            hiddenElement(unit_price_element);
            hiddenElement(price_textarea_element);
          } else {
            price_textarea_element.disabled = false;
            showElement(unit_price_element);
            showElement(price_textarea_element);
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
          not_real_price_textarea_element.textContent =
            book["NotRealUnitPrice"];
          if (!is_book_edited(book["CatalogNumber"])) {
            not_real_price_textarea_element.disabled = true;
            hiddenElement(not_real_price_element);
            hiddenElement(not_real_price_textarea_element);
          } else {
            not_real_price_textarea_element.disabled = false;
            showElement(not_real_price_element);
            showElement(not_real_price_textarea_element);
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
              book["inStock"] = true;
            } else {
              book["inStock"] = false;
            }
          });

          if (!is_book_edited(book["CatalogNumber"])) {
            in_stock_input_element.disabled = true;
            hiddenElement(in_stock_element);
            hiddenElement(in_stock_input_element);
          } else {
            in_stock_input_element.disabled = false;
            showElement(in_stock_element);
            showElement(in_stock_input_element);
          }

          in_stock_element.appendChild(in_stock_input_element);
          book_element.appendChild(in_stock_element);

          // ****************************************************************

          // Is case
          let is_case_element = document.createElement("span");
          is_case_element.classList.add("book_title");
          is_case_element.classList.add("block");
          is_case_element.textContent = "מארז";

          // Is case input
          let is_case_input_element = document.createElement("input");
          is_case_input_element.type = "checkbox";

          if (book["isCase"]) {
            is_case_input_element.checked = true;
            is_case_input_element.setAttribute("checked", "checked");
          } else {
            is_case_input_element.checked = false;
            is_case_input_element.removeAttribute("checked");
          }

          is_case_input_element.addEventListener("click", function () {
            if (is_case_input_element.checked) {
              book["isCase"] = true;
            } else {
              book["isCase"] = false;
            }
          });

          if (!is_book_edited(book["CatalogNumber"])) {
            is_case_input_element.disabled = true;
            hiddenElement(is_case_element);
            hiddenElement(is_case_input_element);
          } else {
            is_case_input_element.disabled = false;
            showElement(is_case_element);
            showElement(is_case_input_element);
          }

          is_case_element.appendChild(is_case_input_element);
          book_element.appendChild(is_case_element);

          // ****************************************************************

          // Image

          // Span
          let image_span_element = document.createElement("span");
          image_span_element.classList.add("block");
          image_span_element.classList.add("center");

          // Image
          image_element = document.createElement("img");
          image_element.className = "book_image";
          image_element.src = book.ImageURL;
          book.ImageURL = image_element.src;

          // Change image button
          change_image_button = document.createElement("input");
          change_image_button.classList.add("block");
          change_image_button.classList.add("center");
          change_image_button.classList.add("book_btn");
          change_image_button.type = "button";
          change_image_button.value = "ערוך כריכה";

          // Input file element
          let file_input = document.createElement("input");
          file_input.type = "file";
          file_input.style.display = "none";

          if (is_book_edited(book["CatalogNumber"])) {
            book_element.appendChild(change_image_button);
            book_element.appendChild(file_input);
          }

          change_image_button.addEventListener("click", function () {
            file_input.click();
          });

          file_input.addEventListener("change", function (event) {
            const file = event.target.files[0];

            if (file) {
              const reader = new FileReader();
              reader.onload = function (e) {
                book.ImageURL = e.target.result;
                image_element.src = book.ImageURL;
              };
              reader.readAsDataURL(file);
            }
          });

          image_span_element.appendChild(image_element);
          book_element.append(image_span_element);

          // ****************************************************************

          // Delete book button
          let delete_book_button = document.createElement("input");
          delete_book_button.type = "button";
          delete_book_button.classList.add("delete_button");
          delete_book_button.value = "מחק ספר";

          if (!is_book_edited(book["CatalogNumber"])) {
            delete_book_button.style.display = "none";
          } else {
            delete_book_button.style.display = "block";
          }

          delete_book_button.addEventListener("click", async function () {
            const userResponse = window.confirm("האם למחוק את הספר?");
            if (userResponse) {
              // Delete book data in db
              const delete_book_message = await delete_book_in_db(
                book["CatalogNumber"]
              );

              // Refresh books
              get_books(true);

              // Set as saved
              save_book(book["CatalogNumber"]);
            }
          });

          book_element.appendChild(delete_book_button);

          // ****************************************************************

          // Edit book button
          let edit_book_button = document.createElement("input");
          edit_book_button.type = "button";
          edit_book_button.classList.add("edit_button");
          edit_book_button.classList.add("book_btn");

          if (!is_book_edited(book["CatalogNumber"])) {
            edit_book_button.value = "ערוך";
            edit_book_button.addEventListener("click", function () {
              edit_book(book["CatalogNumber"]);
            });
          } else {
            edit_book_button.value = "שמור";
            edit_book_button.addEventListener("click", async function () {
              // Save data

              console.log(`TEST1: ${image_element.src}`);
              if (image_element.src.includes("/api/")) {
                newImageURL = image_element.src.split("/api/")[1].split("?")[0];
              } else {
                newImageURL = "";
              }

              console.log(`NEW IMAGE URL: ${newImageURL}`);

              // Collect book data
              book_data_update = {
                CatalogNumber: parseInt(catalog_number_value.textContent),
                Description: description_textarea_element.value,
                Info: info_textarea_element.value,
                UnitPrice: parseFloat(price_textarea_element.value),
                NotRealUnitPrice: parseFloat(
                  not_real_price_textarea_element.value
                ),
                ImageURL: newImageURL,
                inStock: in_stock_input_element.checked,
                isCase: is_case_input_element.checked,
              };

              // Update book data in db
              const imageUrlToUpdate = book.ImageURL.split("?")[0]; // Fixing timestamp
              console.log(`imageUrlToUpdate: ${imageUrlToUpdate}`);

              if (book.ImageURL.includes("images")) {
                // Image not changed
                let tempImageURL = book.ImageURL;
                console.log(`Image NOT changed: ${tempImageURL}`);
                const update_book_message = await update_book_in_db(
                  book_data_update
                );
                console.log(`Update book response: ${update_book_message}`);
                book.ImageURL = tempImageURL;

                // Image change
              } else {
                console.log("Image changed");
                const update_book_message = await update_book_in_db(
                  book_data_update,
                  imageUrlToUpdate
                );
                console.log(`Update book response: ${update_book_message}`);
              }

              // Refresh books
              get_books(true);

              // Set as saved
              save_book(book["CatalogNumber"]);
            });
          }

          book_element.appendChild(edit_book_button);
          books_list.appendChild(book_element);
        }
      });
    } else {
      setLoadingMessage(books_list);
    }
  } catch (error) {
    console.error("Error display books:", error);
  }
}

async function display_banners() {
  await get_banners();

  banners_list.innerHTML = "";
  try {
    if (BANNERS) {
      BANNERS.forEach(async (banner) => {
        // Image

        // Span
        let image_span_element = document.createElement("span");
        image_span_element.classList.add("block");
        image_span_element.classList.add("center");

        // Image
        image_element = document.createElement("img");
        image_element.className = "banner_image";
        image_element.src = banner.ImageURL;
        banner.ImageURL = image_element.src;

        // Delete banner on click
        image_element.addEventListener("click", async function () {
          delete_banner(banner.banner_id);
        });

        image_span_element.appendChild(image_element);
        banners_list.appendChild(image_span_element);
      });
    }
  } catch (error) {
    console.error("Error display banners:", error);
  }
}

function setLoadingMessage(element_to_add_message) {
  clearBooksList();

  // Loading
  let loading_element = document.createElement("div");
  loading_element.className = "no_books_message";
  loading_element.textContent = "טוען...";
  element_to_add_message.appendChild(loading_element);
}

function clearBooksList() {
  books_list.innerHTML = "";
}

function hiddenElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.style.display = "block";
}

function openDetailsMark(
  detailsMarkElementId,
  summaryElementId,
  elementDisplayStyle
) {
  let detailsMarkElement = document.getElementById(detailsMarkElementId);
  let summaryElement = document.getElementById(summaryElementId);

  if (
    summaryElement.style.display == "" ||
    summaryElement.style.display == "none"
  ) {
    summaryElement.style.display = elementDisplayStyle;
    detailsMarkElement.innerHTML = "▼";
  } else {
    summaryElement.style.display = "none";
    detailsMarkElement.innerHTML = "◀";
  }
}

function openNewsletterEmail() {
  let emailUrl =
    "https://s435.sgp7.mysecurecloudhost.com:2096/cpsess7947289801/3rdparty/roundcube/index.php";
  window.open(emailUrl, "_blank");
}

async function getAndCopyNewsletterEmails() {
  let newslettersEmails = await get_news_letters_emails_from_db();
  copyToClipboard(newslettersEmails);
  alert(newslettersEmails.length + " אימיילים הועתקו");
}

async function copyToClipboard(copy) {
  navigator.clipboard.writeText(copy);
}
