// concert.entity.js
export class Concert {
  constructor(data = {}) {
    this.id = data.id;
    this.artist = data.artist || [];
    this.artistName = data.artist?.[0]?.name || "Sin nombre";
    this.genre = data.artist?.[0]?.genre || "Desconocido";
    this.image = data.image;
    this.date = data.date;
    this.status = data.status;
    this.description = data.description;
    this.venue = data.venue || {};
    this.venueName = data.venue?.name || "Sin venue";
    this.venueAddress = data.venue?.address || "";
  }
}
