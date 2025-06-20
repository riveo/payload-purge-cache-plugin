import { RichText } from '@payloadcms/richtext-lexical/react';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@payload-config';

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

export const revalidate = 3600;

const getPageBySlug = unstable_cache(async (slug?: string[]) => {
  const slugToFetch = slug?.join('/') ?? '';

  console.info(`fetching: ${slugToFetch}`);

  const payload = await getPayload({ config: await config });

  const pages = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      or: [
        {
          slug: {
            equals: slugToFetch,
          },
        },
        {
          slug: {
            equals: `/${slugToFetch}`,
          },
        },
      ],
    },
  });

  return pages.docs?.[0];
});

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return notFound();
  }

  return (
    <>
      <h1>{page.title}</h1>
      {page.content && <RichText data={page.content} />}
    </>
  );
};

export default Page;
