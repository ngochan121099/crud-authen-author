import { newEnforcer, Enforcer, Adapter } from 'casbin';
import { MongooseAdapter } from 'casbin-mongoose-adapter';
import path from 'path';

class Casbin {
  static instance: Casbin;
  static addPolicy: any;
  static enforce: any;

  async initializeCasbin() {
    const model = path.resolve(__dirname, './casbin_model.conf');
    const adapter: Adapter = await MongooseAdapter.newAdapter(
      `${process.env.MONGODB_URI}`
    );
    const enforcer: Enforcer = await newEnforcer(model, adapter);
    return enforcer;
  }

  async enforce(sub: string, obj: string, role: string) {
    const enforcer: Enforcer = await this.initializeCasbin();
    return await enforcer.enforce(sub, obj, role);
  }

  async addPolicy(sub: string, obj: string, role: string) {
    const enforcer: Enforcer = await this.initializeCasbin();
    return await enforcer.addPolicy(sub, obj, role);
  }
}

export default Casbin;
