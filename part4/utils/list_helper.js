const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0;
  for (const blog of blogs) {
    total += blog.likes;
  }
  return total;
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  let favorite = blogs[0];
  for (const blog of blogs) {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  }
  return favorite;
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  let authors = {};
  for (const blog of blogs) {
    if (!(blog.author in authors)) {
      authors[blog.author] = 1;
    } else {
      authors[blog.author]++;
    }
  }
  let mostBlogs = { author: "", blogs: 0 };
  for (const author in authors) {
    if (authors[author] > mostBlogs.blogs) {
      mostBlogs.author = author;
      mostBlogs.blogs = authors[author];
    }
  }
  return mostBlogs
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}