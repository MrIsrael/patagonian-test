import pc_case from '../assets/images/case.png'
import supply from '../assets/images/power-supply.png'
import motherboard from '../assets/images/motherboard.png'
import processor from '../assets/images/processor.png'
import cooler from '../assets/images/cooler.png'
import ram from '../assets/images/ram.png'
import ssd from '../assets/images/ssd.png'
import gcard from '../assets/images/graphics-card.png'

export const initGalleryPics = (imageNum) => {
  let picToShow

  switch (imageNum) {
    case 0:
      picToShow = pc_case
      break
    case 1:
      picToShow = supply
      break
    case 2:
      picToShow = motherboard
      break
    case 3:
      picToShow = processor
      break
    case 4:
      picToShow = cooler
      break
    case 5:
      picToShow = ram
      break
    case 6:
      picToShow = ssd
      break
    case 7:
      picToShow = gcard
      break
    default: break
  }

  return (picToShow)
}