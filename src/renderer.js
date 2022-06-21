import TVShowApp from './App.js';
import commentModal from './modules/commentModal.js';
import reservationModal from './modules/reservationModal.js';
export default class Renderer{

    static displayShows (shows) {
      const movieList = document.querySelector('.show-list');
      movieList.innerHTML = "";

      for(let i = 0;i < shows.length;i++) {
        movieList.innerHTML += `<li class='show-item'>
            <figure>
                <img src='${shows[i].image}'>
                <figcaption><div class = "my-title">${shows[i].title}</div>
                  <img class='likebutton' src='https://img.icons8.com/ios-filled/50/000000/hearts.png'>
                  <span id='likes_${shows[i].id}'>${shows[i].likes} ${shows[i].likes <= 1 ? 'Like':'Likes'}</span>
                </figcaption>
                <button id='comment_${shows[i].id}' class='btn btn-primary btn-md card-comment-btn comments'>Comments</button>
                <button id='reservation_${shows[i].id}' class='btn btn-primary btn-md card-comment-btn reservations'>Reservations</button>
            </figure>
        </li>`
      }

      document.querySelector('.show-count').innerHTML = `Number of Shows: ${shows.length}`;
      document.querySelectorAll('.comments').forEach((commentBtn, i) => commentBtn.addEventListener('click', (ev) => {
        commentModal(ev.target.id.split('_')[1], shows);    
      }));

      document.querySelectorAll('.reservations').forEach((reservationBtn, i) => reservationBtn.addEventListener('click', (ev) => {
        reservationModal(ev.target.id.split('_')[1], shows);
      }));

      document.querySelectorAll('.likebutton').forEach((likeBtn, i) => likeBtn.addEventListener('click', (ev) => {
        TVShowApp.like(shows[i].id);
      }));

    document.querySelector('#post-comment-form').addEventListener('submit', async (ev) => {
        ev.preventDefault();
        
        let username = ev.target.elements.username.value.trim();
        let comment = ev.target.elements.comment.value.trim();
        let showID = ev.target.elements.show_id.value.trim();
        
        if (username === "" || comment === "") return;
        
        await TVShowApp.postComment(parseInt(showID), username, comment);

        ev.target.elements.username.value = "";
        ev.target.elements.comment.value = "";

        const comments = await TVShowApp.getComments(parseInt(showID));
        Renderer.updateCommentList(comments);

    });

    document.querySelector('#post-reservation-form').addEventListener('submit', async (ev) => { 
        ev.preventDefault();
        let username = ev.target.elements.username.value.trim();
        let start_date = ev.target.elements.state_date.value.trim();
        let end_date = ev.target.elements.end_date.value.trim();
        let showID = ev.target.elements.show_id.value.trim();

        if (username === "" || start_date === "" || end_date === "") return;

        await TVShowApp.postReservation(parseInt(showID), username, start_date, end_date);

        ev.target.elements.username.value = "";
        ev.target.elements.state_date.value = "";
        ev.target.elements.end_date.value = "";

        const reservations = await TVShowApp.getReservations(parseInt(showID));
        Renderer.updateReservationList(reservations);

    });

    }

    static updateLike(showId, currentLikes) {
        const likeSpan = document.querySelector(`#likes_${showId}`);
        likeSpan.textContent = `${currentLikes} ${currentLikes <= 1?'Like':'Likes'}`;
    }

    static updateCommentList(comments){
        const commentsListEl = document.querySelector(`#comment-list`);
        
        commentsListEl.innerHTML = "";
        comments.forEach(comment => {
            commentsListEl.innerHTML += `<li>Date: ${comment.creation_date}:<p> ${comment.comment}</p> - By: ${comment.username}</li>`
        });

        const commentModalView = document.getElementById('comment-modal');
        const commentCounter = commentModalView.querySelector('.comments #comment-counter');
        commentCounter.textContent = comments.length;
    }

    static updateReservationList(reservations){
        const reservationListEl = document.querySelector(`#reservation-list`);
        
        reservationListEl.innerHTML = "";
        reservations.forEach(reservation => {
            reservationListEl.innerHTML += `<li>Date: ${reservation.username}:<p>From: ${reservation.date_start} To: ${reservation.date_end}</p></li>`
        });

        const reservationModalView = document.getElementById('reservation-modal');
        const reservationCounter = reservationModalView.querySelector('.reservations #reservation-counter');
        reservationCounter.textContent = reservations.length;   
    }

    

}
