'use client';

import {
  MoreIcon,
  LineIcon,
  ErrorIcon,
  SuccessIcon,
  Button,
  RenderTitle,
  useWindowInfo,
} from '@payloadcms/ui';
import { useState, useTransition } from 'react';
import { type Purger } from '../types';

type PurgeCacheButtonProps = {
  purgers: Purger[];
};

const PurgerStatus = ({
  isLoading,
  result,
}: {
  isLoading: boolean;
  result?: { error?: string };
}) => {
  if (isLoading) {
    return <MoreIcon />;
  }

  if (!result) {
    return <LineIcon />;
  }

  if (result?.error) {
    return <ErrorIcon />;
  }

  return <SuccessIcon />;
};

const PurgeCacheClient = ({ purgers }: PurgeCacheButtonProps) => {
  const [isLoading, startTransition] = useTransition();
  const [results, setResults] = useState<{ error?: string }[]>([]);

  const { breakpoints } = useWindowInfo();
  console.log({ breakpoints });
  const errors = results.filter((value) => !!value && !!value?.error);

  const onClick = () => {
    startTransition(async () => {
      const results = await Promise.all(
        purgers.map((purger) => purger.action()),
      );

      setResults(results);
    });
  };

  return (
    <div className="riveo-purge-cache-plugin-container">
      <div className="riveo-purge-cache-plugin-container__button-row">
        <Button onClick={() => onClick()} disabled={isLoading}>
          Purge cache
        </Button>
      </div>

      <div className="riveo-purge-cache-plugin-container__purgers">
        <RenderTitle title="Cache purgers" element="h2" />

        <ul>
          {purgers.map(({ label }, i) => (
            <li key={i}>
              <div>
                {label}
                <PurgerStatus isLoading={isLoading} result={results?.[i]} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {errors.length > 0 && (
        <div className="riveo-purge-cache-plugin-container__errors">
          <RenderTitle title="Purge errors" element="h2" />
          {errors.map(({ error }, i) => {
            return (
              <ul key={i}>
                <li>
                  <RenderTitle title={purgers?.[i]?.label} element="h3" />
                  <pre>{JSON.stringify(error)}</pre>
                </li>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PurgeCacheClient;
