# Data Management API

Ini adalah aplikasi API sederhana yang digunakan untuk mengelola data menggunakan `TypeScript`, `Express.js`, dan `TypeORM` dengan koneksi ke database SQLite. Aplikasi ini mendukung operasi CRUD (Create, Read, Update, Delete) serta memungkinkan Anda untuk mengambil data dari API eksternal.

## Fitur

- **GET** `/fetch-data`: Mengambil data dari `https://jsonplaceholder.typicode.com/posts` dan menyimpannya ke dalam database.
- **GET** `/data`: Mengambil semua data yang ada di database.
- **POST** `/data`: Menambahkan data baru ke database.
- **PUT** `/data/:id`: Memperbarui data yang ada berdasarkan `id`.
- **PATCH** `/data/:id`: Memperbarui sebagian data yang ada berdasarkan `id`.
- **DELETE** `/data/:id`: Menghapus data berdasarkan `id`.

## Prasyarat

- Node.js (versi 14.x atau lebih tinggi)
- NPM atau Yarn
- Git

## Cara Install

Ikuti langkah-langkah di bawah ini untuk menginstal dan menjalankan aplikasi:

1. **Clone repositori ini**:

   ```bash
   git clone https://github.com/farihulrouf/dot
   cd dot
   npm i
   npm start
