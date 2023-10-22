import GamePage from "../models/game_page_model.js";

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

// Updating game page
export async function updateGamePage(id, pageFields) {
    try {
      const update = await GamePage.findByIdAndUpdate(id, pageFields);
      return update;
    } catch (error) {
      throw new Error(`Update game page error: ${error}`);
    }
}

// Get game page data
export async function getGamePageData(id) {
    try {
      const returnPost = await GamePage.findById(id);
      return returnPost;
    } catch (error) {
      throw new Error(`Get game page data error: ${error}`);
    }
}

// Delete game page data
export async function deleteGameInfo(id) {
    try {
      const removePost = await GamePage.deleteOne({ _id: id });
      return removePost.deletedCount;
    } catch (error) {
      throw new Error(`Remove post error: ${error}`);
    }
}
  