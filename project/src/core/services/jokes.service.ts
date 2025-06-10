class JokesService {
  apiClient: any
  private static instance: JokesService
  private jokes: any[] = []

  private readonly localStorageKey = "favoriteJokes"

  private favoriteJokes: any[] = [] // Store favorite joke objects

  private constructor() {
    this.loadFavorites() // Load favorites from localStorage on initialization
  }

  // Load favorites from localStorage
  private loadFavorites() {
    const storedFavorites = localStorage.getItem(this.localStorageKey)
    if (storedFavorites) {
      this.favoriteJokes = JSON.parse(storedFavorites)
    }
  }

  // Save favorites to localStorage
  private saveFavorites() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.favoriteJokes))
  }

  public static getInstance(): JokesService {
    if (!JokesService.instance) {
      JokesService.instance = new JokesService()
    }
    return JokesService.instance
  }
  public saveJokes(jokesData: any[]) {
    this.jokes = jokesData
  }

  public getJokes(): any[] {
    return this.jokes
  }

  public clearJokes() {
    this.jokes = []
  }

    // Update joke rating
  public updateJokeRating(jokeId: number, rating: number) {
    const jokeIndex = this.jokes.findIndex(joke => joke.id === jokeId);
    if (jokeIndex !== -1) {
      this.jokes[jokeIndex].rating = rating;
    }
  }

  // Favorite Jokes Management
  // Add joke to favorites only if it's not already there
  // Add joke to favorites only if it's not already there
  public addFavorite(joke) {
    const exists = this.favoriteJokes.some((favJoke) => favJoke.id === joke.id)
    if (!exists) {
      this.favoriteJokes.push(joke)
      this.saveFavorites() // Save to localStorage
    }
  }

  public removeFavorite(jokeId: string) {
    this.favoriteJokes = this.favoriteJokes.filter((joke) => joke.id !== jokeId)
    this.saveFavorites() // Save to localStorage
  }

  public isFavorite(jokeId: string): boolean {
    return this.favoriteJokes.some((joke) => joke.id === jokeId)
  }

  public getFavoriteJokes() {
    return this.favoriteJokes
  }
}

const jokesServiceInstance = JokesService.getInstance()
export default jokesServiceInstance
