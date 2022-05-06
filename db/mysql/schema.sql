-- connect to cleardb server: 
-- mysql -ub24ded93e7567d -p76b468d4 -h us-cdbr-east-05.cleardb.net

CREATE TABLE IF NOT EXISTS app_users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    terms BOOLEAN DEFAULT true,
    isLoggedIn BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB;

ALTER TABLE `app_users`
ADD CONSTRAINT password_unique UNIQUE (password);

ALTER TABLE `app_users`
ADD CONSTRAINT email_unique UNIQUE (email);

/* Will delete all rows from your table. Next insert will take next auto increment id. */
DELETE from app_users;

-- SHOW INDEX 
SHOW INDEX FROM app_users;
-- 

mysql> show index from app_users;
+-----------+------------+--------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| Table     | Non_unique | Key_name     | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment |
+-----------+------------+--------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| app_users |          0 | PRIMARY      |            1 | user_id     | A         |           0 |     NULL | NULL   |      | BTREE      |         |               |
| app_users |          0 | email_unique |            1 | email       | A         |           0 |     NULL | NULL   |      | BTREE      |         |               |

ALTER TABLE app_users
  DROP INDEX email_unique;

mysql> DESCRIBE app_users;
+------------+--------------+------+-----+-------------------+----------------+
| Field      | Type         | Null | Key | Default           | Extra          |
+------------+--------------+------+-----+-------------------+----------------+
| user_id    | int(11)      | NO   | PRI | NULL              | auto_increment |
| name       | varchar(255) | NO   |     | NULL              |                |
| email      | varchar(255) | NO   | UNI | NULL              |                |
| password   | varchar(255) | NO   | UNI | NULL              |                |
| terms      | tinyint(1)   | YES  |     | 1                 |                |
| isLoggedIn | tinyint(1)   | YES  |     | 1                 |                |
| created_at | timestamp    | NO   |     | CURRENT_TIMESTAMP |                |
+------------+--------------+------+-----+-------------------+----------------+


