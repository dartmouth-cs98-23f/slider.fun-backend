import Photo from '../models/photo_model.js';
import {getPhotoProperties} from '../controllers/photo_properties_controller.js'

/* 
 * Create a photo object
 * Takes in as a parameter a Photo Object
*/
export async function createPhoto(photoFields) {
    try {
      const newPhoto = new Photo();
      newPhoto.imageUrl = photoFields.imageUrl
      newPhoto.photoProperties = await getPhotoProperties(photoFields.photoProperties)
      const photo = await newPhoto.save();
      return photo;
    } catch (error) {
      throw new Error(`Create Photo error: ${error}`);
    }
}

/* 
 * Get all photos
 * Function details:
 *     - gets a list of all the photos
*/
export async function getAllPhotos() {
    try {
      const photos = await Photo.find({}).sort([['date', -1]]);
      return photos;
    } catch {
      throw new Error(`Get All Photo error: ${error}`);
    }
}

/* 
 * Delete a Photo by ID
 * Function details:
 *     - deletes a specific photo by its ID 
 *     - takes the photo id as a parameter
*/
export async function deletePhoto(id) {
    try {
      const deletedPhoto = await Photo.deleteOne({_id: id});
      return deletedPhoto.deletedCount;
    } catch (error) {
      throw new Error(`Delete Photo error: ${error}`);
    }
}

/* 
 * Update a Photo by ID
 * Function details:
 *     - updates a specific photo by its ID 
 *     - takes the photo id as a parameter
*/
export async function updatePhoto(id, updateFields) {
    try {
        const updatedPhoto = await Photo.findByIdAndUpdate(id, updateFields);
        return updatedPhoto;
      } catch (error) {
        throw new Error(`Update Photo error: ${error}`);
      }
}

/* 
 * Gets a Photo by ID
 * Function details:
 *     - takes the photo id as a parameter
*/
export async function getPhotoById(id) {
    try {
      const photo = await Photo.findById(id);
      return photo;
    } catch (error) {
      throw new Error(`Get Photo by ID error: ${error}`);
    }
}


export async function getImageUrlByPhotoId(id) {
  try {
    const photo = await Photo.findById(id);
    console.log(photo);
    console.log(photo.imageUrl);
    return photo.imageUrl;
 
  } catch (error) {
    throw new Error(`Get Image URL by Photo ID error: ${error}`);
  }
}