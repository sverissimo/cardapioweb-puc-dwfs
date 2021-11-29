import { EntityRepository, Repository } from "typeorm";
import { FormaPagamento } from "../entities/FormaPagamento";


@EntityRepository(FormaPagamento)
export class FormaPagamentoRepository extends Repository<FormaPagamento>{

}