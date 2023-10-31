# Slider.Fun Routes
### routes module
#### User Routes
| Route | HTTP Request | Module | Description |
| -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/users/new | post | userRoutes | create a new user |
|https://slider-fun.onrender.com/api/users/all | get | userRoutes | get all users
|https://slider-fun.onrender.com/api/users/:id | get | userRoutes | get user by id
|https://slider-fun.onrender.com/api/users/:id | put| userRoutes | update user by id |
|https://slider-fun.onrender.com/api/users/:id | delete | userRoutes | delete user by id
#### Photo Routes
| Route | HTTP Request | Module | Description |
| -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/photo/all | get | photoRoutes | get all photos
| https://slider-fun.onrender.com/api/photo/new | post | photoRoutes | create photo
|https://slider-fun.onrender.com/api/photo/:id | put | photoRoutes | update photo by id
|https://slider-fun.onrender.com/api/photo/:id | get | photoRoutes | get photo by id |
|https://slider-fun.onrender.com/api/photo/:id | delete | photoRoutes | delete photo by id
#### Photo Property Routes
| Route | HTTP Request | Module | Description |
| -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/photoProperties/new | post | photoPropertiesRoutes | create new photo properties
|https://slider-fun.onrender.com/api/photoProperties/all | get | photoPropertiesRoutes | get all photo properties
|https://slider-fun.onrender.com/api/photoProperties/:id | put | photoPropertiesRoutes | update photo properties by id |
|https://slider-fun.onrender.com/api/photoProperties/:id | get | photoPropertiesRoutes | update photo properties by id |
|https://slider-fun.onrender.com/api/photoProperties/:id | delete | photoPropertiesRoutes | delete photo properties
#### Level Routes
| Route | HTTP Request | Module | Description |
| -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/levels/new | post | levelRoutes | create new level
|https://slider-fun.onrender.com/api/levels/all | get | levelRoutes | get all levels
|https://slider-fun.onrender.com/api/levelByNumber/:number | get | levelRoutes | get level by level number |
|https://slider-fun.onrender.com/api/levels/:id | put | levelRoutes | update level by id
|https://slider-fun.onrender.com/api/levels/:id | get | levelRoutes | get level by id |
|https://slider-fun.onrender.com/api/levels/:id | delete | levelRoutes | delete level by id
#### Property Routes
| Route | HTTP Request | Module | Description |
| -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/property/new | post | propertyRoutes | create new property |
|https://slider-fun.onrender.com/api/property/all | get | propertyRoutes | get all properties |
|https://slider-fun.onrender.com/api/property/:id | put | propertyRoutes | update property | 
|https://slider-fun.onrender.com/api/property/:id | get | propertyRoutes | get property info | 
|https://slider-fun.onrender.com/api/property/:id | delete | propertyRoutes | delete property by id |
