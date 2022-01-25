import { EntityRepository, Repository } from "typeorm";
import { FormaPagamento } from "../domain/models/FormaPagamento";


@EntityRepository(FormaPagamento)
export class FormaPagamentoRepository extends Repository<FormaPagamento>{

}