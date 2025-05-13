import { type AdminViewServerProps } from 'payload';
import { type PurgeCachePluginServerProps } from '../types.js';
import NavLink from './NavLink.js';

type NavLinkProps = AdminViewServerProps & PurgeCachePluginServerProps;

const AfterNavLinks = async ({
  purgeCachePlugin,
  payload,
  user,
}: NavLinkProps) => {
  if (!user) {
    return null;
  }

  if (purgeCachePlugin.access && !(await purgeCachePlugin.access({ user }))) {
    return null;
  }

  const href = `${payload.getAdminURL()}${purgeCachePlugin.path}`;

  return (
    <div className="nav-group">
      <div className="nav-group__content">
        <NavLink href={href} />
      </div>
    </div>
  );
};

export default AfterNavLinks;
