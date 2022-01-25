INSERT INTO forma_pagamento (id, descricao) VALUES (1, 'Cartão de débito') ON CONFLICT DO NOTHING;
INSERT INTO forma_pagamento (id, descricao) VALUES (2, 'Cartão de crédito') ON CONFLICT DO NOTHING;
INSERT INTO forma_pagamento (id, descricao) VALUES (3, 'PIX') ON CONFLICT DO NOTHING;
INSERT INTO forma_pagamento (id, descricao) VALUES (4, 'Vale refeição') ON CONFLICT DO NOTHING;

INSERT INTO cozinhas (id, nome) VALUES (1, 'Chinesa') ON CONFLICT DO NOTHING;
INSERT INTO cozinhas (id, nome) VALUES (2, 'Italiana') ON CONFLICT DO NOTHING;
INSERT INTO cozinhas (id, nome) VALUES (3, 'Japonesa') ON CONFLICT DO NOTHING;
INSERT INTO cozinhas (id, nome) VALUES (4, 'Mineira') ON CONFLICT DO NOTHING;

INSERT INTO categorias (id, nome) VALUES (1, 'Entradas') ON CONFLICT DO NOTHING;
INSERT INTO categorias (id, nome) VALUES (2, 'Pratos Principais') ON CONFLICT DO NOTHING;
INSERT INTO categorias (id, nome) VALUES (3, 'Bebidas') ON CONFLICT DO NOTHING;
INSERT INTO categorias (id, nome) VALUES (4, 'Sobremesas') ON CONFLICT DO NOTHING;

INSERT INTO estados (nome) VALUES ('MG') ON CONFLICT DO NOTHING;
INSERT INTO estados (nome) VALUES ('RJ') ON CONFLICT DO NOTHING;
INSERT INTO estados (nome) VALUES ('SP') ON CONFLICT DO NOTHING;

INSERT INTO cidades (nome, estado_id) VALUES ('Belo Horizonte', 1) ON CONFLICT DO NOTHING;
INSERT INTO cidades (nome, estado_id) VALUES ('Rio de Janeiro', 2) ON CONFLICT DO NOTHING;
INSERT INTO cidades (nome, estado_id) VALUES ('São Paulo', 3) ON CONFLICT DO NOTHING;



