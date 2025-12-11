/**
 * https://dev.to/bybydev/how-to-slugify-a-string-in-javascript-4o9n
 * Simple slugify function to convert a string into a URL-friendly slug
 * @param {*} str 
 * @returns 
 */
function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, '')
  str = str.toLowerCase()
  str = str.replace(/[^a-z0-9 -]/g, '')
           .replace(/\s+/g, '-')
           .replace(/-+/g, '-')
  return str
}

export {
    slugify,
}
