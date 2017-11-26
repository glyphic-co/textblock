var substrate = (function () {
  'use strict'

  // CHECK FOR jQuery
  if (!$) {
    throw new Error('Substrate needs jQuery — ($ is undefined)')
  }

  // SET OUR SETTINGS
  var maxWidth = 9999

  var substrateContainers = [
    '#content'
  ]

  // DEFINE OUR API

  /**
   * Gets the current width of the window
   * @return {Number} The current width of the window
   */
  function getWinWidth () {
    return window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth
  }

  /**
   * Calculate margin based on current width of the window
   * @param  {Number} winWidth The current width of the window
   * @return {Number}          Amount of margin
   */
  function calcSubstrate (winWidth) {
    if (winWidth > maxWidth) {
      return 0
    }

    // Return our secret formula
    return (winWidth / 36) / 2
  }

  /**
   * Apply our margin to the elements
   * Make sure the max-width of our elements is right
   * @param  {Number} substrate Amount of margin
   * @return {Void}
   */
  function render (substrate) {
    // Apply the margin to every element
    substrateContainers.forEach(function (container) {
      $(container).css({ 'margin-left': substrate + 'vw' })
      $(container).css({ 'margin-right': substrate + 'vw' })
      $(container).children().css({
        // 'margin-left': 'auto',
        // 'margin-right': 'auto',
        'max-width': '800px'
      })
    })
  }

  /**
   * Execute our substrate
   * @return {Void}
   */
  function execute () {
    var winWidth = getWinWidth()
    var substrate = calcSubstrate(winWidth)
    render(substrate)

    // console.log('window width: ' + winWidth)
    // console.log('substrate: ' + substrate)
  }

  // BIND EVENT LISTENERS
  $(document).ready(function () {
    execute()
  })
  $(window).resize(function () {
    execute()
  })

  // RETURN OUR EXECUTION FUNCITON AS A GLOBAL
  return execute
}).call(this)
