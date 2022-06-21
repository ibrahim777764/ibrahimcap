import TVMazeAPI from "./api_module.js";
import Renderer from "./renderer.js";
import Show from "./show.js";
export default class TVShowApp {
   tvMazeApi = null;
   static uuid = "2a4mtLhtkEObDM35gsBX";
   static allLikes = [];
  
  static async initialize() {
    this.tvMazeApi = new TVMazeAPI();
    let shows = await this.tvMazeApi.getShows(1);
    this.allLikes = await TVShowApp.getAllLikes(this.uuid);

    shows = shows.map((show) => {
        const showlikes = this.allLikes.find(like => like.item_id === show.id) || {likes: 0, item_id: show.id};
        const myShow = new Show(show.id, show.name, show.image.medium, show.summary,show.genres, show.language, showlikes.likes);
        return myShow;
    });
    
    shows = shows.filter((_, i) => i < 25)
    Renderer.displayShows(shows);
  }

  static async getAllLikes(appId) {
    return await this.tvMazeApi.getAllLikes(appId);
  }

  static async like(showId){

    const currentLikes = await this.tvMazeApi.postLike(this.uuid, showId);

    Renderer.updateLike(showId, currentLikes);
  }

  static async getComments(showId) {
      const comments = await this.tvMazeApi.getComments(this.uuid, showId);
      return comments;
  }

  static getCommentCount(comments) {
      return comments.length;
  }

  static getReservationCount(reservations){
      return reservations.length;
  }

  static getShowsCounter(shows) {
    return shows.length;
  }

  static async getReservations(showId) {
    const reservations = await this.tvMazeApi.getReservations(this.uuid, showId);
    return reservations;
  }

  static async postComment(showId, username, comment) {
      const response = await this.tvMazeApi.postComments(this.uuid, showId, username, comment)
  }

  static async postReservation(showId, username, start_date, end_date) {
      const response = await this.tvMazeApi.postReservations(this.uuid, showId, username, start_date, end_date);
  }

  
}