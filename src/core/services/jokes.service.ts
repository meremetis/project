import type { Joke } from '../models/joke';

/**
 * A singleton service for managing jokes and favorites.
 */
class JokesService {
  /** Singleton instance of JokesService */
  private static instance: JokesService;

  /** Array to store jokes */
  private jokes: Joke[] = [];

  /** Local storage key for favorite jokes */
  private readonly localStorageKey = 'favoriteJokes';

  /** Array to store favorite joke objects */
  private favoriteJokes: Joke[] = [];

  /**
   * Private constructor to enforce singleton pattern.
   * Loads favorite jokes from localStorage on initialization.
   */
  private constructor() {
    this.loadFavorites();
  }

  /**
   * Loads favorite jokes from localStorage.
   */
  private loadFavorites(): void {
    const storedFavorites = localStorage.getItem(this.localStorageKey);
    if (storedFavorites) {
      this.favoriteJokes = JSON.parse(storedFavorites);
    }
  }

  /**
   * Saves favorite jokes to localStorage.
   */
  private saveFavorites(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.favoriteJokes));
  }

  /**
   * Returns the singleton instance of JokesService.
   * @returns {JokesService} The singleton instance.
   */
  public static getInstance(): JokesService {
    if (!JokesService.instance) {
      JokesService.instance = new JokesService();
    }
    return JokesService.instance;
  }

  /**
   * Saves jokes to the service.
   * @param {Joke[]} jokesData - Array of jokes to save.
   */
  public saveJokes(jokesData: Joke[]): void {
    this.jokes = jokesData;
  }

  /**
   * Retrieves all jokes.
   * @returns {Joke[]} Array of jokes.
   */
  public getJokes(): Joke[] {
    return this.jokes;
  }

  /**
   * Clears all stored jokes.
   */
  public clearJokes(): void {
    this.jokes = [];
  }

  /**
   * Updates the rating of a joke.
   * @param {number} jokeId - The ID of the joke to update.
   * @param {number} rating - The new rating value.
   */
  public updateJokeRating(jokeId: number, rating: number): void {
    const jokeIndex = this.jokes.findIndex((joke) => joke.id === jokeId);
    if (jokeIndex !== -1) {
      this.jokes[jokeIndex].rating = rating;
    }
  }

  /**
   * Adds a joke to the favorites list.
   * @param {Joke} joke - The joke to add to favorites.
   */
  public addFavorite(joke: Joke): void {
    const exists = this.favoriteJokes.some((favJoke) => favJoke.id === joke.id);
    if (!exists) {
      this.favoriteJokes.push(joke);
      this.saveFavorites();
    }
  }

  /**
   * Removes a joke from the favorites list.
   * @param {number} jokeId - The ID of the joke to remove.
   */
  public removeFavorite(jokeId: number): void {
    this.favoriteJokes = this.favoriteJokes.filter((joke) => joke.id !== jokeId);
    this.saveFavorites();
  }

  /**
   * Checks if a joke is marked as a favorite.
   * @param {number} jokeId - The ID of the joke to check.
   * @returns {boolean} True if the joke is a favorite, false otherwise.
   */
  public isFavorite(jokeId: number): boolean {
    return this.favoriteJokes.some((joke) => joke.id === jokeId);
  }

  /**
   * Retrieves all favorite jokes.
   * @returns {Joke[]} Array of favorite jokes.
   */
  public getFavoriteJokes(): Joke[] {
    return this.favoriteJokes;
  }
}

/** Singleton instance of JokesService */
const jokesServiceInstance = JokesService.getInstance();
export default jokesServiceInstance;
