const getUserFollowPosts = (state) => (following) => {
  console.log(following);
  return state.posts.filter(post => post.author in following);
}

export default { getUserFollowPosts };