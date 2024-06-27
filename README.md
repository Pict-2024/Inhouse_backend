# INHOUSE BACKEND REPOSITORY
---
## How To run Backend locally
### 1.Fork the repository 📌
[LINK] (https://github.com/Pict-2024/Inhouse_backend)
---

---
![Screenshot 2024-06-27 141945  1](https://github.com/Adwait-Borate/Inhouse_backend/assets/136005137/56612fd3-f0dc-4f86-86fb-a2a3a8121d78)

### 2.Clone the repository from your Github "Repositories" section 🖥️
---
![Screenshot 2024-06-27 142239  2](https://github.com/Adwait-Borate/Inhouse_backend/assets/136005137/a42ba08e-ab9e-409c-965a-42c8b8dbf6cd)

---
### 3.Make required changes in Inhouse_backend folder ✏️

### Changes in app.js 
   #### Comment out as per provided in the image
   ---
 ![Screenshot 2024-06-27 142451  3](https://github.com/Adwait-Borate/Inhouse_backend/assets/136005137/e67858fd-6b3e-4747-8e5a-9f803ca5884f)
 
  ---
### Changes in server.js  📄
---
![Screenshot 2024-06-27 142716  4](https://github.com/Adwait-Borate/Inhouse_backend/assets/136005137/ebb94b71-cabe-4506-8b34-e5b476ac0722)

---
### Create a .env file
---
```
MYSQL_USER='<USERNAME>'
MYSQL_PASSWORD='<PASSWORD'
MYSQL_DATABASE='<DB_NAME>'
PORT = 8081
JWT_SECRET = KSDXNADCWIUHNIW232225
APP_URL = "http://localhost:5173/auth"
```
---
### 4.Run the commands in the VScode Terminal 💻
  ```
  npm install
```
### 5.Open Xampp Control Panel 🚀
  #### [1] Start APACHE and MYSQL. ⚡️
  ---
  ![Screenshot 2024-06-27 143559  5](https://github.com/Adwait-Borate/Inhouse_backend/assets/136005137/6205901c-8959-4067-af82-58a3dc2d752b)

  ---
  ##### Incase if the MYSQL server goes down (STOP) then follow these steps to resolve the issue 🔧
  ---
   ###### Go to Task Manager
   ###### Search for mysql3
   ###### Right click mysql and End Task
   ---

![Screenshot 2024-06-27 144054  6](https://github.com/Adwait-Borate/Inhouse_backend/assets/136005137/242a5845-a4e1-469d-8d00-e0d42ffddaae)

---
###### Now close the Xampp Control Panel and restart the APACHE and MYSQL servers again.
---
 #### [2] Go to Admin 🔍
 ---

![Screenshot 2024-06-27 144909  7](https://github.com/Adwait-Borate/Inhouse_backend/assets/136005137/0f9ed32a-e0bc-41a0-a419-6796c2c088c3)

 ---
 #### [3] Import the database. 📥
 ---

 ---![Screenshot 2024-06-27 145113  8](https://github.com/Adwait-Borate/Inhouse_backend/assets/136005137/82a18c57-39a0-4864-b0be-0532deb9dccb)

 ### 6.Run the command ▶️
 ```
npm start
```
---
![Screenshot 2024-06-27 145427  9](https://github.com/Adwait-Borate/Inhouse_backend/assets/136005137/917b5f1b-144d-4883-96cc-70a307fb84fa)
