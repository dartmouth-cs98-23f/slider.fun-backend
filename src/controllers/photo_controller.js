import Photo from '../models/photo_model.js';
import {getUser} from './user_controller.js';

// Create new Photo
export async function createPhoto(photoFields) {
  try {
    const photoProperties = photoFields.photoProperties.map(property => ({
      name: property.name,
      property: property.property,
      value: property.value,
      range: {
        min: property.range.min,
        max: property.range.max
      },
      unit: property.unit,
      status: property.status
    }));

    const author = await getUser(photoFields.authorId);
    if (!author) {
      throw new Error(`User with ID ${photoFields.authorId} was not found`);
    }

    const newPhoto = new Photo();
    if (photoFields.title){
      newPhoto.title = photoFields.title;
    } else{
      newPhoto.title = "";
    }
    
    newPhoto.imageUrl = photoFields.imageUrl;
    newPhoto.photoProperties = photoProperties;
    newPhoto.likedBy = [];
    newPhoto.authorId = photoFields.authorId;
    newPhoto.validated = true;
    
    const photo = await newPhoto.save();
    return photo;
  } catch (error) {
    throw new Error(`Create Photo error: ${error}`);
  }
}

// Get all photos
export async function getAllPhotos() {
  try {
    const photos = await Photo.find({ validated: true }).sort([['date', -1]]);
    return photos;
  } catch {
    throw new Error(`Get All Photo error: ${error}`);
  }
}

// Get all photos sorted by the number of likes they have
export async function getAllPhotosSorted() {
  try {
    const photos = await Photo.aggregate([
      {
        $match: { validated: true } 
      },
      {
        $addFields: {
          likedByLength: { $size: "$likedBy" }
        }
      },
      {
        $sort: { likedByLength: -1 }
      }
    ]);
    return photos;
  } catch {
    throw new Error(`Get All Photo error: ${error}`);
  }
}

// Delete a Photo with given ID
export async function deletePhoto(id) {
  try {
    const deletedPhoto = await Photo.deleteOne({_id: id});
    return deletedPhoto.deletedCount;
  } catch (error) {
    throw new Error(`Delete Photo error: ${error}`);
  }
}

// Validate a photo if the user has enough "clout"
export async function validatePhoto(id, userId) {
  try {
    const user = await getUser(userId);
    if (!user) {
      throw new Error(`User with ID: ${userId} does not exist`);
    }
    
    if (user.clout !== 5){
      throw new Error(`User with ID: ${userId} does not have enough cloud to validate photo`);
    }
    const photo = await getPhotoById(id);
    photo.reported = [];
    photo.validated = true;
    const updatedPhoto = await photo.save();
    return updatedPhoto;
  } catch (error) {
    throw new Error(`Validate Photo error: ${error}`);
  }
}

// Update a Photo field by ID
export async function updatePhoto(id, updateFields) {
  try {
    const updatedPhoto = await Photo.findByIdAndUpdate(id, updateFields);
    return updatedPhoto;
  } catch (error) {
    throw new Error(`Update Photo error: ${error}`);
  }
}

// Add a user to the "likedBy" list for photo with given id
export async function addLike(id, userId) {
  try {
    const photo = await getPhotoById(id);
    if (!photo) {
      throw new Error(`Photo with ID: ${id} does not exist`);
    }

    const user = await getUser(userId);
    if (!user) {
      throw new Error(`User with ID: ${userId} does not exist`);
    }

    const userAlreadyLiked = photo.likedBy.some(u => u.toString() === userId);
    if (!userAlreadyLiked) {
      photo.likedBy.push(user);
    } else {
      throw new Error(`User with ID: ${userId} has already liked the photo`);
    }
    
    const updatedPhoto = await photo.save();
    return updatedPhoto;
  } catch (error) {
    throw new Error(`Add like error: ${error}`);
  }
}

// remove user from the "likedBy" list for current photo
export async function removeLike(id, userId) {
  try {
    const photo = await getPhotoById(id);
    if (!photo) {
      throw new Error(`Photo with ID: ${id} does not exist`);
    }

    const user = await getUser(userId);
    if (!user) {
      throw new Error(`User with ID: ${userId} does not exist`);
    }

    photo.likedBy = photo.likedBy.filter(u => u.toString() !== userId);

    const updatedPhoto = await photo.save();
    return updatedPhoto;
  } catch (error) {
    throw new Error(`Delete like error: ${error}`);
  }
}

// returns the number of likes for the given photo
export async function numLikes(id) {
  try {
    const photo = await getPhotoById(id);
    if (!photo) {
      throw new Error(`Photo with ID: ${id} does not exist`);
    }

    return photo.likedBy.length;
  } catch (error) {
    throw new Error(`Get Num likes error: ${error}`);
  }
}

// Add a property to Photo Properties
export async function addProperty(id, updateFields) {
  try {
    const photo = await Photo.findById(id);
    const newProperty = {
      name: updateFields.name,
      property: updateFields.property,
      value: updateFields.value,
      range: {
        min: updateFields.range.min,
        max: updateFields.range.max
      },
      unit: updateFields.unit
    };
    photo.photoProperties.push(newProperty);
    const updatedPhoto = await photo.save();
    return updatedPhoto;
  } catch (error) {
    throw new Error(`Get Photo by ID error: ${error}`);
  }
}

// Remove a property from Photo Properties
export async function removeProperty(id, updateFields) {
  try {
    const photo = await Photo.findById(id);
    const propertyToRemove = updateFields.property;
    
    photo.photoProperties = photo.photoProperties.filter(property => property.name !== propertyToRemove);

    const updatedPhoto = await photo.save();
    return updatedPhoto;
  } catch (error) {
    throw new Error(`Get Photo by ID error: ${error}`);
  }
}

// Add a user to the "reported" list for photo with given id
export async function reportPhoto(id, userId) {
  try {
    const photo = await getPhotoById(id);
    if (!photo) {
      throw new Error(`Photo with ID: ${id} does not exist`);
    }

    const user = await getUser(userId);
    if (!user) {
      throw new Error(`User with ID: ${userId} does not exist`);
    }

    if (!photo.reported){
      photo.reported = []
    } 
    
    const userAlreadyReported = photo.reported.some(u => u.toString() === userId);
    if (userAlreadyReported) {
      throw new Error(`User with ID: ${userId} has already reported the photo`);
    }
    photo.reported.push(user);

    if (photo.reported.length >= 3){
      photo.validated = false;
    }
    
    const updatedPhoto = await photo.save();
    return updatedPhoto;
  } catch (error) {
    throw new Error(`Report Photo error: ${error}`);
  }
}

// Gets a Photo by ID
export async function getPhotoById(id) {
  try {
    const photo = await Photo.findById(id);
    return photo;
  } catch (error) {
    throw new Error(`Get Photo by ID error: ${error}`);
  }
}