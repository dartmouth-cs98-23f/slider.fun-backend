import Statistics from '../models/statistics_model.js';


export async function createStats(data) {

  try {
    const means = data.means.map(mean => ({
      name: mean.name,
      value: mean.value
    }));

    const newStat = new Statistics();
    newStat.stage = data.stage;
    newStat.numDataPoints = 1;
    newStat.means = means
    
    const stat = await newStat.save();
    return stat;
  } catch (error) {
    throw new Error(`Create Stat error: ${error}`);
  }
}

export async function getAllStats() {
  try {
    const stats = await Statistics.find({}).sort([['date', -1]]);
    return stats;
  } catch {
    throw new Error(`Get All Stats error: ${error}`);
  }
}

export async function deleteStat(id) {
  try {
    const deletedStat = await Statistics.deleteOne({_id: id});
    return deletedStat.deletedCount;
  } catch (error) {
    throw new Error(`Delete Stat error: ${error}`);
  }
}

export async function updateMeans(id, updateFields) {
    try {
      const statistics = await Statistics.findById(id);
  
      if (!statistics) {
        throw new Error('Statistics not found');
      }
  
      updateFields.means.forEach(async (updateItem) => {
        const { name, value } = updateItem;
  
        const meanToUpdate = statistics.means.find(mean => mean.name === name);
  
        if (meanToUpdate) {
          const { numDataPoints } = statistics;
  
          // Calculate the new mean based on the provided formula
          const newMean = ((numDataPoints * meanToUpdate.value) + value) / (numDataPoints + 1);
  
          // Update the mean's value in the document
          meanToUpdate.value = newMean;
        } else {
          throw new Error(`Mean with name ${name} not found`);
        }
      });
      statistics.numDataPoints += 1;
  
      // Save the updated statistics document
      const updatedStatistics = await statistics.save();
      return updatedStatistics;
    } catch (error) {
      throw new Error(`Update Statistics error: ${error}`);
    }
  }

export async function getStatById(id) {
    try {
      const stat = await Statistics.findById(id);
      return stat;
    } catch (error) {
      throw new Error(`Get Stat by ID error: ${error}`);
    }
  }

export async function getStatByStage(stage) {
  try {
    const statistics = await Statistics.findOne({ stage: stage });
    return statistics;
  } catch (error) {
    throw new Error(`Get Statistics by Stage error: ${error}`);
  }
}

