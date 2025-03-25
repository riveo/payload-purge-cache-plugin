import { DefaultTemplate } from '@payloadcms/next/templates';
import { Gutter, RenderTitle } from '@payloadcms/ui';
import { notFound, redirect } from 'next/navigation';
import { type AdminViewProps } from 'payload';
import { type PurgeCachePluginServerProps } from '../types';
import PurgeCacheClient from './PurgeCacheClient';

type CloudflareProps = AdminViewProps & PurgeCachePluginServerProps;

const PurgeCache = async ({
  initPageResult,
  purgeCachePlugin,
  payload,
  params,
  searchParams,
}: CloudflareProps) => {
  if (!initPageResult.req?.user) {
    return redirect(
      `${payload.getAdminURL()}/login?redirect=${payload.getAdminURL()}${purgeCachePlugin.path}`,
    );
  }

  const allowAccess = purgeCachePlugin.access
    ? !(await purgeCachePlugin.access({ user: initPageResult.req.user }))
    : true;

  if (!initPageResult.permissions.canAccessAdmin || !allowAccess) {
    return notFound();
  }

  return (
    <DefaultTemplate
      i18n={initPageResult?.req.i18n}
      locale={initPageResult?.locale}
      params={params}
      payload={initPageResult?.req.payload}
      permissions={initPageResult?.permissions}
      searchParams={searchParams}
      user={initPageResult?.req.user}
      visibleEntities={initPageResult.visibleEntities}
    >
      <Gutter>
        <RenderTitle title="Purge Cache" />
        <PurgeCacheClient purgers={purgeCachePlugin.purgers} />
      </Gutter>
    </DefaultTemplate>
  );
};

export default PurgeCache;
