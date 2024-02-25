import Photo from '../models/photo_model.js';
import {getUser} from './user_controller.js';

// Create Photo
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
    newPhoto.imageUrl = photoFields.imageUrl;
    newPhoto.photoProperties = photoProperties;
    newPhoto.likes = 0;
    newPhoto.authorId = photoFields.authorId;
    
    const photo = await newPhoto.save();
    return photo;
  } catch (error) {
    throw new Error(`Create Photo error: ${error}`);
  }
}

// Get all photos
export async function getAllPhotos() {
  try {
    const photos = await Photo.find({}).sort([['date', -1]]);
    return photos;
  } catch {
    throw new Error(`Get All Photo error: ${error}`);
  }
}

// Delete a Photo by ID
export async function deletePhoto(id) {
  try {
    const deletedPhoto = await Photo.deleteOne({_id: id});
    return deletedPhoto.deletedCount;
  } catch (error) {
    throw new Error(`Delete Photo error: ${error}`);
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

// Remove a property from Photo Properties1
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


// Gets a Photo by ID
export async function getPhotoById(id) {
  try {
    const photo = await Photo.findById(id);
    return photo;
  } catch (error) {
    throw new Error(`Get Photo by ID error: ${error}`);
  }
}
