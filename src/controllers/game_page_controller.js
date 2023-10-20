import GamePage from "../models/game_page_model";

// create a new game
export async function createGamePage(pageFields) {
    const game = new GamePage();
    
    game.currentImage = '';
    game.targetImage = '';
    game.exposure = 0;
    game.contrast = 0;
    game.highlights = 0;
    game.shadows = 0;
    game.whites = 0;
    game.blacks = 0;
  
    game.user = await getUser(postFields.userId);
  
    try {
      const savedGame = await game.save();
      return savedGame;
    } catch (error) {
      throw new Error(`create game page error: ${error}`);
    }
  }