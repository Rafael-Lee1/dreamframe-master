import React, { Suspense } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import LoadingState from './components/LoadingState';
import './index.css'
import Hero from './components/Hero';
import Introduce from './components/Introduce';
import Testimonial from './components/Testimonial';
import SliderDrag from './components/SliderDrag';

const App = () => {
  return (
    <Layout>
      <Suspense fallback={<LoadingState />}>
        <Header />
        <div id="content" className="pt-[80px]">
          <Hero />
          <Introduce />
          <Testimonial />
          <SliderDrag />
        </div>
      </Suspense>
    </Layout>
  );
};

export default App;
