import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';
import { PanelDataErrorView } from '@grafana/runtime';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    content: css`
      position: relative;
      padding: 12px;
    `,
    title: css`
      margin: 0;
    `,
    meta: css`
      margin-top: 8px;
      opacity: 0.85;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <svg
        className={styles.svg}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
      >
        <g>
          <circle data-testid="simple-panel-circle" style={{ fill: theme.colors.primary.main }} r={100} />
        </g>
      </svg>

      <div className={styles.content}>
        <h3 className={styles.title}>{options.panelTitle || 'MIS233 Final Panel'}</h3>

        {options.showAuthor && (
          <div className={styles.meta}>{options.authorText || 'Developed by Alyaa Al-Rubaye'}</div>
        )}
      </div>
    </div>
  );
};
