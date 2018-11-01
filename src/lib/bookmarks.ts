async function getAll() {
    return await browser.bookmarks.getTree();
}

export { getAll };
