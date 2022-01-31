import { Restaurante } from '../../domain/models/Restaurante';
import { Usuario } from '../../domain/models/Usuario';
import { RestauranteService } from '../../domain/services/RestauranteService';
import { UsuarioDTO } from '../../types/usuarioDTO.type';
import IEntityAssembler from './IEntityAssembler';


export class UsuarioAssembler implements IEntityAssembler {

    async toDTO(usuario: Usuario): Promise<UsuarioDTO> {
        const
            { restaurante, password, restaurante_id, ...usuarioDTOProps } = usuario
            , usuarioDTO: UsuarioDTO = usuarioDTOProps

        if (restaurante_id) {
            const restauranteObject: Restaurante = await new RestauranteService().getRestaurante(restaurante_id)
            usuarioDTO.restaurante = restauranteObject.nome
        }

        usuarioDTO.perfil = usuarioDTO.perfil === 'admin' ? 'Administrador' : 'Parceiro'
        //console.log("🚀 ~ file: UsuarioAssembler.ts ~ line 21 ~ UsuarioAssembler ~ toDTO ~ usuarioDTO", usuarioDTO)

        return usuarioDTO
    }

    async toModel(usuarioDTO: UsuarioDTO) {
        const
            { restaurante, ...usuarioModelProps } = usuarioDTO
            , usuarioModel: Usuario = usuarioModelProps
            , restauranteObject: Restaurante = await new RestauranteService().findByName(restaurante)

        if (restauranteObject)
            usuarioModel.restaurante = restauranteObject

        usuarioModel.perfil = usuarioModel.perfil === 'Administrador' ? 'admin' : 'parceiro'

        return usuarioModel
    }
}
