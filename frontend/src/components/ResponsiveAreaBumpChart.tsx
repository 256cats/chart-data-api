import { ResponsiveAreaBump } from '@nivo/bump';
import { useMemo } from 'react';
import { GetTermsQuery } from '../generated/graphql';

export default function ResponsiveAreaBumpChart({ data }: { data: GetTermsQuery }) {
  const formattedData = useMemo(
    () =>
      data?.terms.map((item) => ({
        ...item,
        id: item.name,
        data: item.dataPoints,
      })),
    [data],
  );

  return (
    <ResponsiveAreaBump
      data={formattedData}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      spacing={8}
      colors={{ scheme: 'nivo' }}
      blendMode="multiply"
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -36,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
    />
  );
}
