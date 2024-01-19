import { ResponsiveBar } from '@nivo/bar';
import { useMemo } from 'react';
import { GetTermsQuery } from '../generated/graphql';

export default function ResponsiveBarChart({ data }: { data: GetTermsQuery }) {
  const formattedData = useMemo(() => {
    const fd: Map<string, any> = new Map();
    data.terms.forEach((term) => {
      term.dataPoints.forEach((dataPoint) => {
        const listItem = fd.get(`${dataPoint.x}`) ?? { x: dataPoint.x };
        listItem[term.name] = dataPoint.y;
        fd.set(`${dataPoint.x}`, listItem);
      });
    });
    return Array.from(fd.values());
  }, [data]);

  const keys = useMemo(() => data.terms.map((item) => item.name), [data]);

  return (
    <ResponsiveBar
      data={formattedData}
      keys={keys}
      indexBy="x"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'y',
        legendPosition: 'middle',
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'x',
        legendPosition: 'middle',
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      groupMode="grouped"
    />
  );
}
