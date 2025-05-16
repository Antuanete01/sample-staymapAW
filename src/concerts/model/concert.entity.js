export class Concert {
    constructor({
                    id = '',
                    artist = [],
                    date = '',
                    venue = {},
                    description = '',
                    genre = '',
                    image = '',
                    status = ''
                }) {
        this.id = id;
        this.artistName = artist.length > 0 ? artist[0].name : '';
        this.date = date;
        this.venueName = venue.name || '';
        this.venueLat = venue.location?.lat || 0;
        this.venueLng = venue.location?.lng || 0;
        this.venueAddress = venue.address || '';
        this.description = description;
        this.genre = artist.length > 0 ? artist[0].genre : genre;
        this.image = image;
        this.status=status;
    }
}