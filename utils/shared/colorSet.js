export const colorTransform = ( color ) => {
  const colorPairs = [
    {
      hex: '#F44336',
      color: 'red'
    },
    {
      hex: '#E91E63',
      color: 'pink'
    },
    {
      hex: '#9C27B0',
      color: 'purple'
    },
    {
      hex: '#673AB7',
      color: 'deep-purple'
    },
    {
      hex: '#3F51B5',
      color: 'indigo'
    },
    {
      hex: '#2196F3',
      color: 'blue'
    },
    {
      hex: '#03A9F4',
      color: 'light-blue'
    },
    {
      hex: '#00BCD4',
      color: 'cyan'
    },
    {
      hex: '#009688',
      color: 'teal'
    },
    {
      hex: '#4CAF50',
      color: 'green'
    },
    {
      hex: '#8BC34A',
      color: 'light-green'
    },
    {
      hex: '#CDDC39',
      color: 'lime'
    },
    {
      hex: '#FFEB3B',
      color: 'yellow'
    },
    {
      hex: '#FFC107',
      color: 'amber'
    },
    {
      hex: '#FF9800',
      color: 'orange'
    },
  ]

  let activeColor = colorPairs.filter(pair => pair.hex === color)

  return activeColor[0].color
}
