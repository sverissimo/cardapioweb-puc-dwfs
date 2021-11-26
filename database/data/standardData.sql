INSERT INTO usuarios (id, nome, email, password, perfil) VALUES (1, 'admin', 'admin@newfoods.com', '1234', 'admin') ON CONFLICT DO NOTHING;

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


