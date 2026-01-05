import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, Button } from '@grafana/ui';
import { PanelDataErrorView } from '@grafana/runtime';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    content: css`
      padding: 12px;
    `,
    title: css`
      margin: 0;
    `,
    meta: css`
      margin-top: 6px;
      opacity: 0.85;
    `,
    controls: css`
      margin-top: 10px;
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    `,
    badge: css`
      display: inline-block;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.08);
    `,
    summary: css`
      margin-top: 12px;
      padding: 10px;
      border-radius: 6px;
      background: rgba(0, 0, 0, 0.04);
    `,
    row: css`
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding: 4px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    `,
    rowLeft: css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
    `,
    rowRight: css`
      flex-shrink: 0;
      opacity: 0.9;
    `,
  };
};

type Trend = 'Increasing' | 'Decreasing' | 'Stable' | 'N/A';

function computeTrend(values: ArrayLike<unknown>, lookback = 12): Trend {
  const len = (values as any)?.length ?? 0;
  if (len < 3) return 'N/A';

  const nums: number[] = [];
  for (let i = Math.max(0, len - lookback); i < len; i++) {
    const v = Number((values as any)[i]);
    if (Number.isFinite(v)) nums.push(v);
  }

  if (nums.length < 3) return 'N/A';

  const first = nums[0];
  const last = nums[nums.length - 1];
  const range = Math.max(...nums) - Math.min(...nums);
  const eps = range === 0 ? 1e-9 : range * 0.05;

  if (last > first + eps) return 'Increasing';
  if (last < first - eps) return 'Decreasing';
  return 'Stable';
}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const styles = useStyles2(getStyles);
  const [showDetails, setShowDetails] = React.useState(false);

  const compact = width < 360 || height < 220;

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  const seriesCount = data.series.length;
  const fieldCount = data.series.reduce((acc, s) => acc + (s.fields?.length ?? 0), 0);

  const summaries = data.series.slice(0, 5).map((s) => {
    const numeric = (s.fields ?? []).filter((f) => f.type === 'number');
    const field = numeric[0];

    const values = field?.values as any;
    const lastValue =
      values && values.length
        ? values.get
          ? values.get(values.length - 1)
          : values[values.length - 1]
        : null;

    return {
      series: s.name ?? '(unnamed)',
      field: field?.name ?? '(no numeric field)',
      lastValue,
      trend: field?.values ? computeTrend(field.values as any) : 'N/A',
    };
  });

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
          font-size: ${compact ? 12 : 14}px;
        `
      )}
    >
      <div className={styles.content}>
        <h3 className={styles.title}>{options.panelTitle || 'MIS233 Final Panel'}</h3>

        {options.showAuthor && (
          <div className={styles.meta}>
            {options.authorText || 'Developed by Alyaa Al-Rubaye'}
          </div>
        )}

        <div className={styles.controls}>
          <span className={styles.badge}>
            Series: {seriesCount} | Fields: {fieldCount}
          </span>

          <Button size="sm" variant="secondary" onClick={() => setShowDetails((v) => !v)}>
            {showDetails ? 'Hide details' : 'Show details'}
          </Button>
        </div>

        {showDetails && (
          <div className={styles.summary}>
            <strong>Query summary (first 5 series)</strong>

            {summaries.map((x, i) => (
              <div key={i} className={styles.row}>
                <div className={styles.rowLeft}>
                  {x.series} — {x.field}
                </div>
                <div className={styles.rowRight}>
                  {x.lastValue ?? 'n/a'} · {x.trend}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
