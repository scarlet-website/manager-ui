async function get_books_from_db() {
  try {
    const response = await fetch("http://127.0.0.1:5000/get_books");

    if (response.ok) {
      const data = await response.json();
      return data["books"];
    } else {
      throw new Error("Error fetching books");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
