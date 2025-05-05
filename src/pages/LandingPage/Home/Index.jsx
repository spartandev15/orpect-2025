import React from 'react'
import LayoutOrpect from '../Index'
import BlogSlider from './BlogSlider'
import Easytouse from './Easytouse'
import Hero from './Hero'
import Howitwork from './Howitwork'
import Orpectunique from './Orpectunique'
import TestimonialSlide from './TestimonialSlide'
import WhyOrpect from './WhyOrpect'
import GdpCcca from './GdpCcca'
 

const HomePage = () => {
  return (
   <LayoutOrpect>
   <Hero />
   <WhyOrpect />
   <Howitwork />
   <Easytouse />
   < Orpectunique />
<TestimonialSlide />
<BlogSlider/>

<GdpCcca/>
  </LayoutOrpect>
    
  )
}

export default HomePage