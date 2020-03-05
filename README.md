# Classtime : Class Streaming Service

> A class streaming service for internal use in Kirirom Institute of Technology

**Classtime** is a _class streaming service_ that students, lecturers and staff can use to stream from their webcams as well as devices in **Kirirom Institute of Technology** campuses. This service allows everyone to tune into and streaming classes remotely from anywhere conveniently.

**Classtime** is a joint collaboration between **Zeal** and **FLIb**.

![Classtime Homepage](https://i.imgur.com/dL9FHxF.gif)

## Technologies Used

We used the **MEVN** (**MongoDB**, **Express.js**, **Vue.js**, **Node.js**) stack for developing **Classtime**.

### Frontend

---

- **Vuejs** library is used with the **Vue CLI3** framework along with **Vuetify** plugin
  - We also used **Vuex** for state management and **VueRouter** for route management
- **Axios** and **Socket.IO** is used for requesting data from the backend
- **Jitsi Meet Wrapper** is used to display streams

### Backend

---

- **Nodejs** is used with **Express** for creating the server and handling requests from the frontend
- **Axios** is used to handle request between the backend servers
- **Bcrypt** and **JWT** is used for user authentication
- **Mongoose** is used for database calls between the database and the server

### Database

---

- We use **MongoDB** as the database for the streams, users and devices

## Installation

### Prerequisites

---

We will need to install:

- **Node.js**
- **MongoDB** and **MongoDB Compass** (Compass is totally optional but recommended)
- **Visual Studio Code** or any text editor of your choice

### Next Steps

---

For both the Frontend and Backend, you will need to install necessary dependencies. Those dependencies can be installed with the **npm i** command.

### Frontend

---

Run the command line terminal in the directory of the front end and run the following command

```sh
npm i
npm run serve
```

### Backend:

---

For the backend, it is a different story. **Classtime**'s backend relies on multiple modules so you will need to get into each folder individually and run the following command. Those folders are **Server**, **Chat**, and **Device**.

```sh
npm i
npm start
```

## Users

The streaming service has 3 types of users:

- **Student**
- **Lecturer**
- **Admin**

Each user type has their own level of control in the system.

### Student

---

**Students** are able to:

- Personal profile editing
- Watch streams
- Start streams using their own webcams

### Lecturer

---

**Lecturers** are able to:

- Personal profile editing
- Watch streams
- Start streams using their own webcams as well as devices in the campus
- Basic access to device management

### Admin

---

**Admins** are able to:

- Personal profile editing
- Watch streams
- Start streams using their own webcams as well as devices in the campus
- Complete access to device management
- User management for every user registered
- Stream management for every stream

## Usage

Here are the instructions on how to use this streaming service

### Login

---

![Classtime Homepage](https://i.imgur.com/dL9FHxF.gif)

You can **login** by filling your email and password in the text fields and press login.

**Registering** will register you with a student account.

> _For lecturers and admins, please contact the development team or any admin to give you appropriate roles._

### Streaming

---

![Classtime Streaming](https://imgur.com/9F8UbGT.gif)

You can **start streaming** by pressing the **Start Stream** button on the Navigation Bar. Options can be selected in the dialog popup. You can either stream from your **webcam** or from a dedicated **device** in the campus. You can also **cast the stream to devices in the campus** by ticking on the checkbox dialog.

![Classtime Streaming](https://i.imgur.com/EkPwQA4.gif)

You can **stop streaming** by pressing on the red **Stop Stream** button on the Navigation Bar when you are streaming.

### Profile

---

![Classtime Profile](https://i.imgur.com/gRu4kWx.gif)

You can navigate to the **Profile** section by clicking on the **Navigation Drawer** toggle next to the logo clicking on the **Profile** button.

![Classtime Profile](https://i.imgur.com/KedItGt.gif)

In the **Profile** section, you can:

- Change your password and username
- Change your profile picture
- Change your cover picture

### Admin

---

You gain access to the **User Management** and **Stream Management** sections.

#### User Management

![Classtime Profile](https://i.imgur.com/RjFn3Ut.gif)

As **Admin**, you can change the username of users as well as their roles.

#### Stream Management

![Classtime Profile](https://i.imgur.com/lUbCgd2.gif)

You can end any stream when the stream is on. You can also edit the details of the streams.
