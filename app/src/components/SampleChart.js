import React from 'react'
import G2 from '@antv/g2'

class SampleChart extends React.Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
    this.state = {
      data: {
        result: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 1150 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ]
      }
    }
  }

  componentDidMount() {
    this.chart = new G2.Chart({
      container: this.containerRef.current,
      width: 450,
      height: 300
    })
    this.refreshChart()
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy()
    }
  }

  refreshChart = () => {
    this.chart.source(this.state.data)
    this.chart.interval().position('genre*sold').color('genre')
    this.chart.render()
  }

  render() {
    return (
      <div ref={this.containerRef}/>
    )
  }
}

export default SampleChart
