
/* delete from usuarios;
ALTER SEQUENCE restaurantes_id_seq RESTART WITH 1; */

delete from restaurantes;
ALTER SEQUENCE restaurantes_id_seq RESTART WITH 1;

delete from enderecos;
ALTER SEQUENCE enderecos_id_seq RESTART WITH 1;

delete from produtos;
ALTER SEQUENCE produtos_id_seq RESTART WITH 1;

delete from migrations
where name like 'PopulateRestaurants%' or name like 'PopulateEnderecos%' or name like 'PopulateEnderecos%' 