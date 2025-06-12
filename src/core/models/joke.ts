/**
 * Represents a joke with its details.
 */
export interface Joke {
  /**
   * Unique identifier for the joke.
   */
  id: number;

  /**
   * The punchline of the joke.
   */
  punchline: string;

  /**
   * The setup or question part of the joke.
   */
  setup: string;

  /**
   * The category or type of the joke.
   */
  type: string;

  /**
   * The rating of the joke (optional).
   */
  rating?: number;
}