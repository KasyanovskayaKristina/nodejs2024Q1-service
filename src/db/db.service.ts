import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { Artist } from 'src/artist/entity/artist.entity';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Album } from 'src/albums/entity/album.entity';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { Track } from 'src/tracks/entity/track.entity';
import { Fav } from 'src/favourites/entity/fav.entity';
import { User } from 'src/user/entity/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import {
  mockAlbums,
  mockTracks,
  mockUsers,
  mockArtists,
} from 'src/mocks/mock-data';

@Injectable()
export class DbService {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  favs: Fav;
  constructor() {
    this.users = mockUsers;
    this.tracks = mockTracks;
    this.artists = mockArtists;
    this.albums = mockAlbums;
    this.favs = new Fav();
  }
  // Users
  listUsers() {
    return this.users;
  }

  findUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }
  addNewUser(createUserDto: CreateUserDto) {
    const newUser = new User(createUserDto);
    this.users.push(newUser);
    const response = { ...newUser };
    delete response.password;
    return response;
  }
  changeUserPassword(user: User, newPass: string) {
    user.updatePassword(newPass);
    const response = { ...user };
    delete response.password;
    return response;
  }
  removeUserById(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  //Tracks

  listTracks() {
    return this.tracks;
  }
  findTrackById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }
  addNewTrack(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);
    this.tracks.push(track);
    return track;
  }
  modifyTrack(track: Track, updateTrackDto: UpdateTrackDto) {
    track.updateTrack(updateTrackDto);
  }
  removeTrackById(id: string) {
    this.tracks = this.tracks.filter((track) => track.id !== id);
    this.favs.removeTrack(id);
  }

  //Artists

  listArtists() {
    return this.artists;
  }
  findArtistById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }
  addNewArtist(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto);
    this.artists.push(artist);
    return artist;
  }
  modifyArtist(artist: Artist, updateArtistDto: UpdateArtistDto) {
    artist.updateArtist(updateArtistDto);
  }
  removeArtistById(id: string) {
    this.artists = this.artists.filter((artist) => artist.id !== id);
    this.unlinkArtistFromTracks(id);
    this.unlinkArtistFromAlbums(id);
    this.favs.removeArtist(id);
  }
  listAlbums() {
    return this.albums;
  }
  findAlbumById(id: string) {
    return this.albums.find((album) => album.id === id);
  }
  addNewAlbum(createAlbumDto: CreateAlbumDto) {
    const album = new Album(createAlbumDto);
    this.albums.push(album);
    return album;
  }
  modifyAlbum(album: Album, updateAlbumDto: UpdateAlbumDto) {
    album.updateAlbum(updateAlbumDto);
  }
  removeAlbumById(id: string) {
    this.albums = this.albums.filter((album) => album.id !== id);
    this.unlinkAlbumFromTracks(id);
    this.favs.removeAlbum(id);
  }

  //Favorites
  listAllFavourites() {
    const favs = this.favs.getAllFavorites();
    return {
      artists: favs.artists.map((artistId) => this.findArtistById(artistId)),
      albums: favs.albums.map((albumId) => this.findAlbumById(albumId)),
      tracks: favs.tracks.map((trackId) => this.findTrackById(trackId)),
    };
  }

  unlinkAlbumFromTracks(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) track.albumId = null;
    });
  }
  unlinkArtistFromTracks(artistId: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) track.artistId = null;
    });
  }
  unlinkArtistFromAlbums(artistId: string) {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) album.artistId = null;
    });
  }
}
