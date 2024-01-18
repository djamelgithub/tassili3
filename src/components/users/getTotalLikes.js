 

const getTotalLikes = (user) => {
  // Obtener los posts del usuario
  const userAutomobiles= user.posts || [];
  
  // Obtener el total de likes en los posts del usuario
  const totalLikes = userAutomobiles.reduce((total, post) => {
    return total + post.likes.length;
  }, 0);

  return totalLikes;
};

 
export default getTotalLikes