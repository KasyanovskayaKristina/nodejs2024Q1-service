export class Fav {
  artists: string[];
  albums: string[];
  tracks: string[];
  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }

  getAllFavorites() {
    return {
      artists: this.artists,
      albums: this.albums,
      tracks: this.tracks,
    };
  }

  getArtistById(artistId: string) {
    return this.artists.find((_artistId) => _artistId === artistId);
  }

  addArtist(artistId: string) {
    this.artists.push(artistId);
  }

  removeArtist(artistId: string) {
    this.artists = this.artists.filter((_artistId) => _artistId !== artistId);
  }

  getAlbumById(albumId: string) {
    return this.albums.find((_albumId) => _albumId === albumId);
  }

  addAlbum(albumId: string) {
    this.albums.push(albumId);
  }

  removeAlbum(albumId: string) {
    this.albums = this.albums.filter((_albumId) => _albumId !== albumId);
  }

  getTrackById(trackId: string) {
    return this.tracks.find((_trackId) => _trackId === trackId);
  }

  addTrack(trackId: string) {
    this.tracks.push(trackId);
  }

  removeTrack(trackId: string) {
    this.tracks = this.tracks.filter((_trackId) => _trackId !== trackId);
  }
}
