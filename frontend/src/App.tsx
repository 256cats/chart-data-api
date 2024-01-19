import { useState, MouseEvent } from 'react';
import { Container, Grid } from '@mui/material';
import './App.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useQuery } from '@apollo/client';
import { gql } from './generated/gql';
import ResponsiveBarChart from './components/ResponsiveBarChart';
import ResponsiveAreaBumpChart from './components/ResponsiveAreaBumpChart';
import ResponsiveLineChart from './components/ResponsiveLineChart';

const GET_TERMS = gql(/* GraphQL */ `
  query GetTerms($useRandomData: Boolean) {
    terms {
      id
      name
      dataPoints(useRandomData: $useRandomData) {
        id
        x
        y
      }
    }
  }
`);

enum CHART_TYPE {
  LINE,
  BAR,
  AREA_BUMP,
}

const chartTypeMapper = {
  [CHART_TYPE.LINE]: ResponsiveLineChart,
  [CHART_TYPE.BAR]: ResponsiveBarChart,
  [CHART_TYPE.AREA_BUMP]: ResponsiveAreaBumpChart,
} as const;

enum DATA_TYPE {
  REAL,
  RANDOM,
}

function App() {
  const [chartType, setChartType] = useState(CHART_TYPE.LINE);
  const [dataType, setDataType] = useState(DATA_TYPE.REAL);
  const { loading, data } = useQuery(GET_TERMS, {
    variables: {
      useRandomData: dataType === DATA_TYPE.RANDOM,
    },
    fetchPolicy: 'network-only',
  });

  const SelectedChart = chartTypeMapper[chartType];

  const handleChartTypeChange = (event: MouseEvent<HTMLElement>, newChartType: CHART_TYPE) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  const handleDataTypeChange = (event: MouseEvent<HTMLElement>, newDataType: DATA_TYPE) => {
    if (newDataType !== null) {
      setDataType(newDataType);
    }
  };

  return (
    <div className="App">
      <Container>
        <ToggleButtonGroup
          color="primary"
          value={chartType}
          exclusive
          onChange={handleChartTypeChange}
          aria-label="Chart type"
        >
          <ToggleButton value={CHART_TYPE.LINE}>line</ToggleButton>
          <ToggleButton value={CHART_TYPE.BAR}>bar</ToggleButton>
          <ToggleButton value={CHART_TYPE.AREA_BUMP}>area bump</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          color="primary"
          value={dataType}
          exclusive
          onChange={handleDataTypeChange}
          aria-label="Use random data"
        >
          <ToggleButton value={DATA_TYPE.REAL}>Real data</ToggleButton>
          <ToggleButton value={DATA_TYPE.RANDOM}>Random data</ToggleButton>
        </ToggleButtonGroup>
      </Container>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid item xs={12} sm={12} md={12} sx={{ maxHeight: '400px' }}>
          {loading || !data ? 'loading' : <SelectedChart data={data} />}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
