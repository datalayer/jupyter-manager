import React from 'react';
import clsx from 'clsx';
import styles from './HomepageProducts.module.css';

const ProductList = [
  /*
  {
    title: '100% Compatible with Jupyter',
//    Svg: require('../../static/img/product_2.svg').default,
    description: (
      <>
        If you need more batteries for Jupyter, have a look to our <a href="./docs/tech/editor/index">Jupyter components</a>.
      </>
    ),
  },
  {
    title: 'React.js Components',
//    Svg: require('../../static/img/product_1.svg').default,
    description: (
      <>
        A variety of React.js components from Notebook, Cell, Output and Terminal allow you to get the best of Jupyter, with authentication and authorization.
      </>
    ),
  },
  {
    title: 'Literate Notebook',
//    Svg: require('../../static/img/product_3.svg').default,
    description: (
      <>
        For a truly collaborative and accessible notebook, try <a href="./docs/editor/index">Literate Notebook</a>, a better single-page notebook, with built-in collaboration, accessibility...
      </>
    ),
  },
  */
];

function Product({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
{/*
      <div className="text--center">
        <Svg className={styles.productSvg} alt={title} />
      </div>
*/}
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageProducts() {
  return (
    <section className={styles.Products}>
      <div className="container">
        <div className="row">
          {ProductList.map((props, idx) => (
            <Product key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
