create table audios(
  id serial primary key,
  name text not null,
  created_at timestamptz default current_timestamp
);