import PhotoModel from '../models/photo_model.js';
import {getPhotoProperties} from '../controllers/photo_properties_controller.js'

/* 
 * Create a photo object
 * Takes in as a parameter a Photo Object
*/
export async function createPhoto(photoFields) {
    try {
        const newPhoto = new PhotoModel();
        newPhoto.imageUrl = photoFields.imageUrl
        newPhoto.photoProperties = await getPhotoProperties(photoFields.photoPropertiesId)
        const photo = await newPhoto.save();
    
        return photo;
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error '});
    }
}

/* 
 * Get all photos
 * Function details:
 *     - gets a list of all the photos
*/
export async function getAllPhotos() {
    try {
        const photos = await PhotoModel.find();
        res.status(200).json(photos);
    } catch {
        res.status(500).json({ error: 'Internal Server Error' });
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
        const deletedPhoto = await PhotoModel.findByIdAndRemove(id);
        if (!deletedPhoto) {
            res.status(404).json({ error: 'Photo not found'});
        } else {
            res.status(204).send(); // no content for a successful delete
        } 
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
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
        const updatedPhoto = await PhotoModel.findByIdAndUpdate(id, updateFields);
        if (!updatedPhoto) {
          res.status(404).json({ error: 'Photo not found' });
        } else {
          res.status(200).json(updatedPhoto);
          return updatedPhoto;
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

/* 
 * Gets a Photo by ID
 * Function details:
 *     - takes the photo id as a parameter
*/
export async function getPhotoById(id) {
    try {
      const photo = await PhotoModel.findById(id);
      if (!photo) {
        res.status(404).json({ error: 'Photo not found' });
      } else {
        res.status(200).json(photo);
        return photo;
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}