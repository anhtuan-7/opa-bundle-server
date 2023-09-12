- Track/Watch thay đổi của database (MySQL/PostgreSQL) dùng socket (socket.io?)
- Database của Access Management Service

  - Role/Custom Role
  - Client owner, Service owner
  - Users - Roles

- Các cách track thay đổi
  - Trigger mỗi khi có thay đổi --> ảnh hưởng performance
  - Viết log (bằng trigger) rồi track log\* --> ảnh hưởng performance
  - **MySQL binlog**
  - **POSTGRESQL notify()**
