import TVShowApp from "../App";

const commentModal = async (showId, shows) => {
  
  const show = shows.find(t => t.id === parseInt(showId));
  
  const commentModalView = document.getElementById('comment-modal');
  commentModalView.style.display = 'block';
  
  const imgEl = commentModalView.querySelector('#show-image');
  const showTitleEl = commentModalView.querySelector('.movie-info #title');
  const showSummaryEl = commentModalView.querySelector('.movie-info #movie-summary');
  const commentCounter = commentModalView.querySelector('.comments #comment-counter');
  const commentList = commentModalView.querySelector('.comments #comment-list');
  const closeEl = commentModalView.querySelector('.close');
  const showIdEl = commentModalView.querySelector('form #show_id');
  showIdEl.value = showId;

  closeEl.addEventListener('click', (ev) => {commentModalView.style.display = 'none';})
  
  imgEl.src = show.image;
  showTitleEl.textContent = show.title;
  showSummaryEl.innerHTML = show.summary;

  const response = await TVShowApp.getComments(showId);
  commentCounter.textContent = `(${typeof response.length === 'undefined' ? 0 : response.length})`;

  if (response.length > 0){
  commentList.innerHTML = "";
    response.forEach(comment => {
      commentList.innerHTML += `<li>Date: ${comment.creation_date}:<p> ${comment.comment}</p> - By: ${comment.username}</li>`;
    });
  }else{
    commentList.innerHTML = "There are no Comments for this show!";
  }
}

export default commentModal;
