import { BadRequestException, Injectable } from '@nestjs/common';
import { log_verbose } from '../../../shared/helper/app-logger';
import CreateTenantDTO from '../dtos/create-tenant.dto';
import Tenant from '../infra/typeorm/entities/tenant.entity';
import TenantsRepository from '../infra/typeorm/repositories/tenants.repository';

@Injectable()
export default class CreateTenantService {
  constructor(private tenantsRepository: TenantsRepository) {}

  public async execute({ name }: CreateTenantDTO): Promise<Tenant> {
    const tenantExists = await this.tenantsRepository.findByName(name);

    if (tenantExists)
      throw new BadRequestException(`User with name "${name}" alredy exists!`);

    const tenant = await this.tenantsRepository.create({ name });

    log_verbose('Tenants Controller', `SYSADMIN: Created tenant ${name}`);

    return tenant;
  }
}