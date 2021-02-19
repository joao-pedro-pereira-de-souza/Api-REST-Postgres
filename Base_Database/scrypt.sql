create table register (
	
	user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
	user_name varchar(200) not null,
	user_email varchar(200) not null UNIQUE,
	user_password varchar(30) not null,
	user_description varchar(300),
	user_phone varchar(20)
)

create table data_user (
    
	register_id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
	user_id uuid,
	earnings text[],
	losses text[],
	bitcoin varchar(500),
	following text[],
	follower text[],
	FOREIGN KEY (user_id) REFERENCES register (user_id)

)

-- Install generate guide postgresql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";