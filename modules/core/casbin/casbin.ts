import { newEnforcer, Enforcer, Adapter } from 'casbin';
import { MongooseAdapter } from 'casbin-mongoose-adapter';
import path from 'path';

const model = path.resolve(__dirname, './casbin_model.conf');

export const initializeCasbin = async () => {
  const adapter: Adapter = await MongooseAdapter.newAdapter(
    `${process.env.MONGODB_URI}`
  );

  const enforcer: Enforcer = await newEnforcer(model, adapter);
  return enforcer;
};

export const enforce = async (sub: string, obj: string, role: string) => {
  const enforcer: Enforcer = await initializeCasbin();
  return await enforcer.enforce(sub, obj, role);
};

export const addPolicy = async (sub: string, obj: string, role: string) => {
  const enforcer: Enforcer = await initializeCasbin();

  return await enforcer.addPolicy(sub, obj, role);
};