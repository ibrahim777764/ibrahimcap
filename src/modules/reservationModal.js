import TVShowApp from "../App";

const reservationModal = async (showId, shows) => {

  const show = shows.find(t => t.id === parseInt(showId));

  const reservationModalView = document.getElementById('reservation-modal');
  reservationModalView.style.display = 'block';

  const imgEl = reservationModalView.querySelector('#reservation-show-image');
  const showTitleEl = reservationModalView.querySelector('.movie-info #reservation-title');
  const showSummaryEl = reservationModalView.querySelector('.movie-info #reservation-movie-summary');
  const reservationCounter = reservationModalView.querySelector('.reservations #reservation-counter');
  const reservationList = reservationModalView.querySelector('.reservations #reservation-list');
  const closeEl = reservationModalView.querySelector('.close');
  const showIdEl = reservationModalView.querySelector('form #show_id-resrv');

  showIdEl.value = showId;

  closeEl.addEventListener('click', () => {reservationModalView.style.display = 'none';});

  imgEl.src = show.image;
  showTitleEl.textContent = show.title;
  showSummaryEl.innerHTML = show.summary;

  const response = await TVShowApp.getReservations(showId);
  reservationCounter.textContent = `(${typeof response.length === 'undefined' ? 0 : response.length})`;

  if (response.length > 0){
    reservationList.innerHTML = "";
      response.forEach(reservation => {
        reservationList.innerHTML += `<li> Name: ${reservation.username}:<p>From: ${reservation.date_start} To: ${reservation.date_end}</p></li>`;
      });
  } else {
    reservationList.innerHTML = "There are no Reservations for this show!";
  }
}
export default reservationModal;